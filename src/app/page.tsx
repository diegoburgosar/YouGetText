'use client';

import { useState } from 'react';
import { getVideoTranscript } from '../services/youtube/api';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Extraer el ID del video de la URL
      const videoId = videoUrl.split('v=')[1]?.split('&')[0];
      if (!videoId) {
        throw new Error('URL de video no válida');
      }

      const response = await getVideoTranscript(videoId);
      if (response.error) {
        throw new Error(response.error);
      }

      setTranscript(response.video.transcript);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">YouGetText</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Pega la URL del video de YouTube"
            className="flex-1 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 shadow-sm transition-colors"
          >
            {loading ? 'Procesando...' : 'Obtener Texto'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {transcript && (
        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Texto del Video</h2>
          <p className="whitespace-pre-wrap text-gray-600">{transcript}</p>
        </div>
      )}
    </main>
  );
}
