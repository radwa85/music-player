export interface Track {
  id: number;
  title: string;
  artist: string;
  source: string;
  external_id: string;
  is_preview_only: boolean;
  genre: string;
  duration: number;
  audio_url?: string;
  stream_url?: string;
  cover_url: string;
  created_at: string;
}
