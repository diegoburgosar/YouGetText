import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId');

    console.log('[DEBUG] VideoId recibido:', videoId);

    if (!videoId) {
      console.error('[ERROR] VideoId no proporcionado');
      return NextResponse.json({ error: 'Video ID es requerido' }, { status: 400 });
    }

    try {
      console.log('[DEBUG] Intentando obtener transcripción con youtube-transcript');
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      console.log('[DEBUG] Transcripción obtenida correctamente');

      return NextResponse.json({ transcript });
    } catch (transcriptError: any) {
      console.error('[ERROR] Error al obtener la transcripción:', transcriptError);
      throw new Error(`Error al obtener la transcripción: ${transcriptError?.message || 'Error desconocido'}`);
    }
  } catch (error: any) {
    console.error('[ERROR] Error general:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });

    return NextResponse.json(
      { 
        error: error?.message || 'Error al obtener la transcripción del video',
        details: error?.stack
      },
      { status: 500 }
    );
  }
} 