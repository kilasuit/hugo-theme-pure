+++
author = "Hugo Authors"
title = "Audio Content with Spotify and SoundCloud"
date = "2024-11-01"
description = "Examples of embedded audio content using Spotify and SoundCloud shortcodes"
tags = [
    "shortcodes",
    "audio",
    "spotify",
    "soundcloud",
]
+++

This post demonstrates how to embed audio content from Spotify and SoundCloud using custom shortcodes.
<!--more-->

---

## Spotify Shortcodes

### Spotify Track

Embed a single track with compact player:

{{< spotify track 3n3Ppam7vgaVa1iaRUc9Lp >}}

<br>

---

### Spotify Album

Embed an album:

{{< spotify album 1DFixLWuPkv3KT3TnV35m3 >}}

<br>

---

### Spotify Playlist

Embed a playlist:

{{< spotify playlist 37i9dQZF1DXcBWIGoYBM5M >}}

<br>

---

### Spotify Artist

Embed an artist profile:

{{< spotify artist 0TnOYISbd1XYRBk9myaseg >}}

<br>

---

### Spotify Show (Podcast)

Embed a podcast show:

{{< spotify show 4rOoJ6Egrf8K2IrywzwOMk >}}

<br>

---

## SoundCloud Shortcodes

### SoundCloud Track (Visual)

Embed a track with visual artwork:

{{< soundcloud id="1880476033" visual="true" >}}

<br>

---

### SoundCloud Track (Compact)

Embed a track with compact player:

{{< soundcloud id="1880476033" visual="false" >}}

<br>

---

## Usage

### Spotify Shortcode

The Spotify shortcode accepts the following parameters:

- **Type** (positional, required): The type of content - `track`, `album`, `playlist`, `artist`, or `show`
- **ID** (positional, required): The Spotify ID from the share URL
- **width** (named, optional): Width of the player (default: 100%)
- **height** (named, optional): Height of the player (default: 380px for most types, 80px for tracks)

Example:
```
{{</* spotify track 3n3Ppam7vgaVa1iaRUc9Lp */>}}
{{</* spotify playlist 37i9dQZF1DXcBWIGoYBM5M height="380" */>}}
```

### SoundCloud Shortcode

The SoundCloud shortcode accepts the following parameters:

- **id** (named or positional, required): The SoundCloud track ID
- **visual** (named, optional): Show visual artwork - `true` or `false` (default: true)
- **width** (named, optional): Width of the player (default: 100%)
- **height** (named, optional): Height of the player (default: 450px for visual, 166px for compact)

Example:
```
{{</* soundcloud id="1880476033" */>}}
{{</* soundcloud id="1880476033" visual="false" */>}}
{{</* soundcloud 1880476033 */>}}
```

### How to Find IDs

**Spotify:**
1. Open Spotify and find the content you want to share
2. Click Share → Copy link
3. The ID is the string after the last slash: `https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp`
   - In this example, the ID is: `3n3Ppam7vgaVa1iaRUc9Lp`

**SoundCloud:**
1. Open the track on SoundCloud
2. Click Share → Embed
3. In the embed code, find the track ID in the URL parameter: `tracks/1880476033`
   - In this example, the ID is: `1880476033`
