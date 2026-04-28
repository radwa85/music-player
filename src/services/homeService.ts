import { API_BASE_URL } from '../constants/config';
import { Track } from '../types/track';

export const homeService = {
  async getRecommendations(token: string): Promise<Track[]> {
    try {
      if (!token) {
        throw new Error('Authentication token is missing. Please login again.');
      }

      const response = await fetch(`${API_BASE_URL}/recommendations/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return Array.isArray(data) ? data : data.results || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  },
};
