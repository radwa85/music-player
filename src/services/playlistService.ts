import { API_BASE_URL } from "../constants/config";
import { Track } from "../types/track";
import { homeService } from "./homeService";

export interface PlaylistGroup {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  tracks: Track[];
}

const jsonHeaders = (token?: string) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const playlistService = {
  // Legacy local-generator fallback used by some screens
  async getPlaylists(token: string): Promise<PlaylistGroup[]> {
    try {
      // Prefer server-backed endpoint when available
      const res = await fetch(`${API_BASE_URL}/playlists/`, {
        headers: jsonHeaders(token),
      });
      if (res.ok) {
        const raw = await res.json();
        // Normalize server response (some APIs return `name` instead of `title`)
        let playlists = (raw || []).map((p: any) => normalizePlaylist(p));

        // If the server returns playlists without track lists or cover_url,
        // try fetching detailed playlist info for those items so we can
        // use the first track's cover as the playlist cover in the UI.
        const needsDetails = playlists.filter(
          (pl) =>
            !pl.tracks ||
            pl.tracks.length === 0 ||
            !pl.cover_url ||
            pl.cover_url.trim() === "",
        );

        if (needsDetails.length > 0) {
          try {
            const detailed = await Promise.all(
              needsDetails.map(async (pl) => {
                try {
                  const r = await fetch(`${API_BASE_URL}/playlists/${pl.id}/`, {
                    headers: jsonHeaders(token),
                  });
                  if (!r.ok) return null;
                  const json = await r.json();
                  return normalizePlaylist(json);
                } catch (e) {
                  return null;
                }
              }),
            );

            playlists = playlists.map((pl) => {
              const det = detailed.find((d) => d && d.id === pl.id);
              return det || pl;
            });
          } catch (e) {
            console.warn("Failed to fetch playlist details:", e);
          }
        }

        return playlists;
      }
    } catch (err) {
      console.warn(
        "Playlists fetch failed, falling back to local generator",
        err,
      );
    }

    // Fallback: generate playlists from recommendations
    const tracks = await homeService.getRecommendations(token);
    const byGenre = new Map<string, Track[]>();

    tracks.forEach((track) => {
      const genreKey = (track.genre || "mixed").trim().toLowerCase();
      const list = byGenre.get(genreKey) || [];
      list.push(track);
      byGenre.set(genreKey, list);
    });

    const playlists: PlaylistGroup[] = [];

    if (tracks.length > 0) {
      playlists.push({
        id: "recommended-mix",
        title: "Recommended Mixes",
        description: "A quick-start playlist from your latest picks",
        cover_url: tracks[0].cover_url,
        tracks: tracks.slice(0, Math.min(8, tracks.length)),
      });
    }

    Array.from(byGenre.entries()).forEach(([genre, genreTracks]) => {
      if (genreTracks.length < 2) return;

      playlists.push({
        id: `genre-${genre}`,
        title: genre.charAt(0).toUpperCase() + genre.slice(1),
        description: `${genreTracks.length} tracks in this collection`,
        cover_url: genreTracks[0].cover_url,
        tracks: genreTracks,
      });
    });

    if (playlists.length === 0 && tracks.length > 0) {
      playlists.push({
        id: "all-tracks",
        title: "All Tracks",
        description: "Everything available right now",
        cover_url: tracks[0].cover_url,
        tracks,
      });
    }

    return playlists;
  },

  // Server-backed CRUD methods
  async createPlaylist(
    token: string,
    payload: { title: string; description?: string },
  ) {
    const res = await fetch(`${API_BASE_URL}/playlists/`, {
      method: "POST",
      headers: jsonHeaders(token),
      // API expects 'name' field instead of 'title'
      body: JSON.stringify({
        name: payload.title,
        description: payload.description,
      }),
    });
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to create playlist (${res.status}): ${text}`);
    try {
      return normalizePlaylist(JSON.parse(text));
    } catch {
      return text as any;
    }
  },

  async getPlaylist(token: string, playlistId: string) {
    // Special-case the client-generated "recommended-mix" id: build a
    // lightweight playlist from the recommendations so PlaylistDetail can
    // render even when the server does not expose a matching playlist.
    if (playlistId === "recommended-mix") {
      try {
        const recs = await homeService.getRecommendations(token);
        const tracks = recs || [];
        return {
          id: "recommended-mix",
          title: "Recommended Mixes",
          description: "A quick-start playlist from your latest picks",
          cover_url: tracks.length > 0 ? tracks[0].cover_url : "",
          tracks,
        } as PlaylistGroup;
      } catch (e) {
        throw new Error("Failed to load recommended mix");
      }
    }

    const res = await fetch(`${API_BASE_URL}/playlists/${playlistId}/`, {
      headers: jsonHeaders(token),
    });
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to fetch playlist (${res.status}): ${text}`);
    try {
      return normalizePlaylist(JSON.parse(text));
    } catch {
      return text as any;
    }
  },

  async updatePlaylist(
    token: string,
    playlistId: string,
    payload: { title?: string; description?: string },
  ) {
    const res = await fetch(`${API_BASE_URL}/playlists/${playlistId}/`, {
      method: "PUT",
      headers: jsonHeaders(token),
      // API expects 'name' field instead of 'title'
      body: JSON.stringify({
        ...(payload.title ? { name: payload.title } : {}),
        description: payload.description,
      }),
    });
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to update playlist (${res.status}): ${text}`);
    try {
      return normalizePlaylist(JSON.parse(text));
    } catch {
      return text as any;
    }
  },

  async deletePlaylist(token: string, playlistId: string) {
    const res = await fetch(`${API_BASE_URL}/playlists/${playlistId}/`, {
      method: "DELETE",
      headers: jsonHeaders(token),
    });
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to delete playlist (${res.status}): ${text}`);
    return true;
  },

  async addTrack(token: string, playlistId: string, trackId: string | number) {
    const res = await fetch(
      `${API_BASE_URL}/playlists/${playlistId}/add_track/`,
      {
        method: "POST",
        headers: jsonHeaders(token),
        body: JSON.stringify({ track_id: trackId }),
      },
    );
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to add track (${res.status}): ${text}`);
    try {
      return normalizePlaylist(JSON.parse(text));
    } catch {
      return text as any;
    }
  },

  async removeTrack(
    token: string,
    playlistId: string,
    trackId: string | number,
  ) {
    const res = await fetch(
      `${API_BASE_URL}/playlists/${playlistId}/remove_track/`,
      {
        method: "POST",
        headers: jsonHeaders(token),
        body: JSON.stringify({ track_id: trackId }),
      },
    );
    const text = await res.text();
    if (!res.ok)
      throw new Error(`Failed to remove track (${res.status}): ${text}`);
    try {
      return normalizePlaylist(JSON.parse(text));
    } catch {
      return text as any;
    }
  },
};

function normalizePlaylist(p: any): PlaylistGroup {
  if (!p)
    return {
      id: "",
      title: "",
      description: "",
      cover_url: "",
      tracks: [],
    } as PlaylistGroup;
  const tracks = p.tracks || [];
  const cover = p.cover_url || (tracks.length > 0 ? tracks[0].cover_url : "");
  return {
    id: String(p.id ?? p.playlist_id ?? ""),
    title: p.title || p.name || "",
    description: p.description || p.desc || "",
    cover_url: cover,
    tracks,
  } as PlaylistGroup;
}
