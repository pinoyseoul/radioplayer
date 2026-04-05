# Pinoy Seoul Radio Player Widget

A lightweight, self-contained HTML/JS widget that displays Pinoy Seoul Radio's live status and embed player. Designed to be embedded in any website.

## Features

- **Live Status**: Shows "ON AIR" when streaming, "OFF AIR" when station is offline
- **Auto-detection**: Automatically loads the player when user interacts with the page
- **Watchdog**: Polls the AzuraCast API every 30 seconds to detect online/offline status
- **Mobile-friendly**: Works on all devices including in-app browsers (WebView)

## Usage

Simply include the HTML and JavaScript in your page:

```html
<div id="radio-card">
  <!-- Copy the contents of index.html here -->
</div>
```

Or embed via iframe:

```html
<iframe src="https://pinoyseoul.github.io/radioplayer/" width="100%" height="150" frameborder="0"></iframe>
```

## How It Works

1. The widget is hidden by default (`display: none`)
2. On first click/keypress anywhere on the page, it reveals itself
3. Fetches nowplaying data from `https://radio.pinoyseoul.com/api/nowplaying/live`
4. If station is online: shows red "ON AIR" badge + live player
5. If station is offline: shows grey "OFF AIR" badge + static station logo
6. Polls API every 30 seconds to update status

## API Response Expected

```json
{
  "station": { "is_online": true },
  "is_online": true,
  "live": { "is_live": true, "streamer_name": "DJ Name" },
  "now_playing": { "playlist": "Song Title" }
}
```

## License

MIT
