import { Track } from "./track";

export interface PlaylistGroup {
  id: string;
  title: string;
  description?: string;
  cover_url?: string;
  tracks?: Track[];
}

export interface PlaylistSummary {
  id: string;
  title: string;
  cover_url?: string;
  trackCount: number;
}

export default PlaylistGroup;
