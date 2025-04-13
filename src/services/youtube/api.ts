import axios from 'axios';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  transcript: string;
}

interface YouTubeApiResponse {
  video: YouTubeVideo;
  error?: string;
}

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';

export const getVideoTranscript = async (videoId: string): Promise<YouTubeApiResponse> => {
  try {
    // 1. Obtener transcripción usando nuestro endpoint local
    const response = await axios.post(`/api/youtube/transcript?videoId=${videoId}`);
    
    if (!response.data.transcript) {
      throw new Error('No se pudo obtener la transcripción');
    }

    const transcript = response.data.transcript.map((item: any) => item.text).join(' ');

    // 2. Obtener información del video
    const videoResponse = await axios.get(`${YOUTUBE_API_URL}/videos`, {
      params: {
        part: 'snippet',
        id: videoId,
        key: YOUTUBE_API_KEY
      }
    });

    if (!videoResponse.data.items || videoResponse.data.items.length === 0) {
      throw new Error('Video no encontrado');
    }

    const videoData = videoResponse.data.items[0].snippet;

    return {
      video: {
        id: videoId,
        title: videoData.title,
        description: videoData.description,
        transcript: transcript
      }
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      video: {
        id: videoId,
        title: '',
        description: '',
        transcript: ''
      },
      error: error instanceof Error ? error.message : 'Error al obtener el texto del video'
    };
  }
}; 