+++
title = "Bluesky Interactions Demo"
date = 2025-11-01
time - 18:00
draft = false
description = "An example post demonstrating the Bluesky interactions feature — likes, threaded replies, and quote-posts pulled live from the Bluesky public API."
tags = [
    "bluesky",
    "demo",
    "social",
]
categories = [
    "demos",
]
authors = ["Hugo Authors"]
bskyPostURLs = [
    "https://bsky.app/profile/whitep4nth3r.com/post/3lbk6kboymk25",
]
+++

This post demonstrates the Bluesky interactions feature built into this theme.

When `socialInteractions` is enabled in your site config and a post includes one or more `bskyPostURLs` in its frontmatter, the theme will automatically load and display:

- ❤️ **Likes** — shown as a strip of profile avatars below the post
- 💬 **Replies** — displayed in a threaded view under the Replies tab
- 🔁 **Quotes** — shown under the Quotes tab

<!--more-->

## How to enable

In your `config.yml` (or `config.toml`), add:

```yaml
params:
  socialInteractions:
    enable: true
    platforms:
      - bluesky
    bluesky:
      showLikes: true
      showReplies: true
      showQuotes: true
      condensedView: false
```

Then in any post's frontmatter, add the Bluesky post URL(s):

```toml
bskyPostURLs = [
    "https://bsky.app/profile/yourhandle.bsky.social/post/RKEY",
]
```

You can include multiple URLs for multi-author posts — the theme will load interactions from each URL and combine them into a single view, with a per-author breakdown shown below.

## Sharing

A **Share on Bluesky** button appears at the top of the interactions section. Clicking it opens Bluesky's compose intent with your post title and permalink pre-filled, so readers can easily share your content.

## Privacy

All data is fetched from the [Bluesky public API](https://public.api.bsky.app) — no authentication is required and **no cookies are stored**.
