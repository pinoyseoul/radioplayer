# Pinoy Seoul Radio Player Widget

A sticky footer radio player widget for Pinoy Seoul Radio with live status, visualizer, and offline detection.

## Features

- **Live Status**: Shows "ON AIR" (green) when streaming, "OFF AIR" (grey) when offline
- **Dynamic Bitrate**: Displays actual bitrate from API (e.g., "128k")
- **Visualizer**: Animated bar visualizer when playing
- **Media Session**: Lock screen metadata on mobile
- **Auto-recovery**: Reconnects automatically on stream drop
- **WebView Detection**: Hides in native app browsers to prevent duplicate audio
- **Offline State**: All UI elements turn grey when station is offline

## Usage

Embed the widget in your page:

```html
<!-- Copy entire index.html content -->
```

Or iframe:

```html
<iframe src="https://pinoyseoul.github.io/radioplayer/" width="100%" height="80" frameborder="0"></iframe>
```

## How It Works

1. Fetches nowplaying data from `https://radio.pinoyseoul.com/api/nowplaying/live`
2. Checks `station.is_online` for online/offline status
3. Gets bitrate from `station.bitrate`
4. Updates metadata every 10 seconds
5. On offline:
   - Badge changes to grey "OFF AIR"
   - Visualizer bars turn grey
   - Play button becomes grey
   - Shows static station logo

## API Response Expected

```json
{
  "station": { 
    "is_online": true,
    "bitrate": 128,
    "listen_url": "https://stream-url"
  },
  "is_online": true,
  "live": { "is_live": true, "streamer_name": "DJ Name" },
  "now_playing": { 
    "song": { "title": "Song", "artist": "Artist", "art": "url" },
    "playlist": "Rotation",
    "duration": 180,
    "elapsed": 90
  },
  "listeners": { "current": 42 }
}
```

## License

MIT
