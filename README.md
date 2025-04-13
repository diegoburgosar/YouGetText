# YouGetText

Una aplicación web que te permite obtener transcripciones de videos de YouTube de manera fácil y rápida.

## Características

- Obtención de transcripciones de videos de YouTube
- Interfaz de usuario moderna y fácil de usar
- Soporte para múltiples idiomas (si están disponibles en el video)

## Tecnologías

- Next.js 14
- React
- TypeScript
- youtube-transcript (para obtener las transcripciones)

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env.local` y agrega tu API key de YouTube:
```
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_api_key_aqui
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso

1. Pega la URL del video de YouTube o el ID del video
2. Haz clic en "Obtener Transcripción"
3. La transcripción se mostrará en la pantalla

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)
