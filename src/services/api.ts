import { API_BASE_URL, AUTH_TOKEN } from '../constants/config';
import { Track } from '../types/track';

export const musicApi = {
  async getRecommendations(): Promise<Track[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/recommendations/`, {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },
};
