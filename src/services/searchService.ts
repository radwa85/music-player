import { API_BASE_URL } from '../constants/config';
import { Track } from '../types/track';

export const searchService = {
  async searchTracks(query: string, token: string, limit: number = 10): Promise<Track[]> {
    if (!query.trim()) return [];
    
    try {
      if (!token) {
        throw new Error('Authentication token is missing. Please login again.');
      }

      const url = `${API_BASE_URL}/tracks/search/?q=${encodeURIComponent(query)}&limit=${limit}`;
      console.log('Search URL:', url);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('Search response status:', response.status);

      if (response.status === 401) {
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        const responseText = await response.text();
        console.error('Search error response:', responseText);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Search results:', data);
      return Array.isArray(data) ? data : data.results || [];
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  },
};
