import { Track } from '../types/track';
import { API_BASE_URL } from '../constants/config';

export const playbackService = {
 
  getTrackStreamUrl(track: Track): string {
    let finalUrl = track.stream_url || `${API_BASE_URL}/tracks/${track.id}/stream/`;
    
    if (finalUrl.startsWith('http://') && finalUrl.includes('musicapp-production-bcd8.up.railway.app')) {
      finalUrl = finalUrl.replace('http://', 'https://');
    }
    
    return finalUrl;
  },

  
  getAudioSource(track: Track, token: string) {
    return {
      uri: this.getTrackStreamUrl(track),
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };
  }
};
