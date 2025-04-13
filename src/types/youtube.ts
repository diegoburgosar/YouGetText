export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  transcript: string;
}

export interface YouTubeApiResponse {
  video: YouTubeVideo;
  error?: string;
} 