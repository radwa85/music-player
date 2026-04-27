import { API_BASE_URL, AUTH_TOKEN } from "../constants/config";
import { Track } from "../types/track";

export const likedApi = {
  async getLikedSongs(): Promise<Track[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/liked/`, {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching liked songs:", error);
      throw error;
    }
  },

  async toggleLike(trackId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/liked/${trackId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  },
};
