# Audio Shortcodes: Spotify and SoundCloud Support

This theme includes shortcodes for embedding audio content from Spotify and SoundCloud.

## Spotify Shortcode

The Spotify shortcode allows you to embed various types of Spotify content: tracks, albums, playlists, artists, and podcast shows.

### Syntax

```
{{</* spotify <type> <id> [width="100%"] [height="380"] */>}}
```

### Parameters

- **type** (positional, required): The type of Spotify content
  - `track` - A single track
  - `album` - An album
  - `playlist` - A playlist
  - `artist` - An artist profile
  - `show` - A podcast show
  
- **id** (positional, required): The Spotify ID from the share URL

- **width** (named, optional): Width of the player
  - Default: `100%`
  
- **height** (named, optional): Height of the player
  - Default for tracks: `80` (compact player)
  - Default for other types: `380`

### Examples

#### Spotify Track
```
{{</* spotify track 3n3Ppam7vgaVa1iaRUc9Lp */>}}
```

#### Spotify Album
```
{{</* spotify album 1DFixLWuPkv3KT3TnV35m3 */>}}
```

#### Spotify Playlist
```
{{</* spotify playlist 37i9dQZF1DXcBWIGoYBM5M */>}}
```

#### Spotify Artist
```
{{</* spotify artist 0TnOYISbd1XYRBk9myaseg */>}}
```

#### Spotify Podcast Show
```
{{</* spotify show 4rOoJ6Egrf8K2IrywzwOMk */>}}
```

#### Custom Size
```
{{</* spotify track 3n3Ppam7vgaVa1iaRUc9Lp height="152" */>}}
```

### How to Find Spotify IDs

1. Open Spotify and navigate to the content you want to embed
2. Click Share → Copy link
3. The ID is the string after the last slash in the URL

Example URL: `https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp`
- ID: `3n3Ppam7vgaVa1iaRUc9Lp`

---

## SoundCloud Shortcode

The SoundCloud shortcode allows you to embed SoundCloud tracks with optional visual artwork display.

### Syntax

```
{{</* soundcloud <id> [visual="true"] [width="100%"] [height="450"] */>}}
```

Or using named parameters:

```
{{</* soundcloud id="<id>" [visual="true"] [width="100%"] [height="450"] */>}}
```

### Parameters

- **id** (positional or named, required): The SoundCloud track ID

- **visual** (named, optional): Display mode
  - `true` - Show visual artwork (default)
  - `false` - Compact player without artwork
  
- **width** (named, optional): Width of the player
  - Default: `100%`
  
- **height** (named, optional): Height of the player
  - Default when `visual="true"`: `450`
  - Default when `visual="false"`: `166`

### Examples

#### SoundCloud Track with Visual
```
{{</* soundcloud 1880476033 */>}}
```

Or with named parameter:
```
{{</* soundcloud id="1880476033" */>}}
```

#### SoundCloud Track Compact (No Visual)
```
{{</* soundcloud id="1880476033" visual="false" */>}}
```

#### Custom Size
```
{{</* soundcloud id="1880476033" height="300" */>}}
```

### How to Find SoundCloud Track IDs

1. Open the track on SoundCloud in your browser
2. Click Share → Embed
3. Look at the embed code for the track ID in the URL

The embed code will contain something like:
```html
<iframe src="https://w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/1880476033&...">
```

The ID is the number after `/tracks/`: `1880476033`

---

## Live Example

See `/exampleSite/content/posts/audio-embeds.md` for a working demonstration of both shortcodes with various configurations.

## Technical Details

- Both shortcodes generate responsive iframe embeds
- Spotify embeds use rounded corners (12px border-radius) matching Spotify's design guidelines
- SoundCloud embeds include autoplay permission but autoplay is disabled by default
- All embeds support lazy loading for better page performance
- Iframes include appropriate security and feature policies

## Browser Compatibility

These shortcodes work in all modern browsers that support:
- HTML5 iframes
- Spotify Web Playback SDK (for Spotify embeds)
- SoundCloud Widget API (for SoundCloud embeds)

## Privacy & GDPR

Both Spotify and SoundCloud embeds may set cookies and track user data. Consider:
- Adding a cookie consent banner if required by your jurisdiction
- Disclosing the use of third-party embeds in your privacy policy
- Using Hugo's Privacy Config if you need additional control
