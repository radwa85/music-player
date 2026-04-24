import { API_BASE_URL, AUTH_TOKEN } from '../constants/config';
import { Track } from '../types/track';

export const searchService = {
  async searchTracks(query: string, limit: number = 10): Promise<Track[]> {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(`${API_BASE_URL}/tracks/search/?q=${encodeURIComponent(query)}&limit=${limit}`, {
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
      console.error('Error fetching search results:', error);
      throw error;
    }
  },
};
