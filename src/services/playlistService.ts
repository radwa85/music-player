import { homeService } from './homeService';
import { Track } from '../types/track';

export interface PlaylistGroup {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  tracks: Track[];
}

export const playlistService = {
  async getPlaylists(token: string): Promise<PlaylistGroup[]> {
    const tracks = await homeService.getRecommendations(token);
    const byGenre = new Map<string, Track[]>();

    tracks.forEach((track) => {
      const genreKey = (track.genre || 'mixed').trim().toLowerCase();
      const list = byGenre.get(genreKey) || [];
      list.push(track);
      byGenre.set(genreKey, list);
    });

    const playlists: PlaylistGroup[] = [];

    if (tracks.length > 0) {
      playlists.push({
        id: 'recommended-mix',
        title: 'Recommended Mix',
        description: 'A quick-start playlist from your latest picks',
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
        id: 'all-tracks',
        title: 'All Tracks',
        description: 'Everything available right now',
        cover_url: tracks[0].cover_url,
        tracks,
      });
    }

    return playlists;
  },
};