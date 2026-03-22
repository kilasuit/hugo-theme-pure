# Supported Social Networks

This file lists all social network profiles that can be displayed in the
footer, author box, sponsor section, and any other location where the
`social.html` partial is rendered.

## Configuration

Social links are configured in `config.yml` (or `config.toml`) under
`params.profile.social`:

```yaml
params:
  profile:
    social:
      # Set colored: true to show icons in their official brand colours.
      # Set colored: false (default) for monochrome icons that match the theme colour.
      colored: false
      links:
        github: https://github.com/yourhandle
        bluesky: https://bsky.app/profile/yourhandle
        # … add more entries below
      link_tooltip: false
```

Each key in `links` must match one of the network keys listed below.
The value is the full URL to your profile on that network.

---

## Network Reference

### Social Media / Communications

| Key | Service | Example URL |
|-----|---------|-------------|
| `bluesky` | [Bluesky](https://bsky.app) | `https://bsky.app/profile/yourhandle` |
| `discord` | [Discord](https://discord.com) | `https://discord.gg/yourinvite` |
| `facebook` | [Facebook](https://facebook.com) | `https://facebook.com/yourpage` |
| `irc` | IRC | `irc://irc.libera.chat/yourchannel` |
| `learnmicrosoft` | [Microsoft Learn](https://learn.microsoft.com) | `https://learn.microsoft.com/en-us/users/yourprofile` |
| `linkedin` | [LinkedIn](https://linkedin.com) | `https://linkedin.com/in/yourprofile` |
| `mastodon` | [Mastodon](https://joinmastodon.org) | `https://mastodon.social/@yourhandle` |
| `microsofttechcommunity` | [Microsoft Tech Community](https://techcommunity.microsoft.com) | `https://techcommunity.microsoft.com/users/yourprofile` |
| `slack` | [Slack](https://slack.com) | `https://yourworkspace.slack.com` |
| `twitter` | [X / Twitter](https://x.com) | `https://twitter.com/yourhandle` |
| `github` | [GitHub](https://github.com) | `https://github.com/yourhandle` |
| `gitlab` | [GitLab](https://gitlab.com) | `https://gitlab.com/yourhandle` |

### Video Sharing

| Key | Service | Example URL |
|-----|---------|-------------|
| `twitch` | [Twitch](https://twitch.tv) | `https://twitch.tv/yourchannel` |
| `youtube` | [YouTube](https://youtube.com) | `https://youtube.com/@yourchannel` |
| `soundcloud` | [SoundCloud](https://soundcloud.com) | `https://soundcloud.com/yourprofile` |
| `spotify` | [Spotify](https://spotify.com) | `https://open.spotify.com/user/yourprofile` |

### Gaming

| Key | Service | Example URL |
|-----|---------|-------------|
| `psn` | [PlayStation Network](https://playstation.com) | `https://psnprofiles.com/yourprofile` |
| `steam` | [Steam](https://store.steampowered.com) | `https://steamcommunity.com/id/yourprofile` |
| `xbox` | [Xbox](https://xbox.com) | `https://account.xbox.com/en-US/profile?gamertag=yourtag` |

### Other

| Key | Service | Example URL |
|-----|---------|-------------|
| `reddit` | [Reddit](https://reddit.com) | `https://reddit.com/user/yourprofile` |
| `orcid` | [ORCID](https://orcid.org) | `https://orcid.org/0000-0000-0000-0000` |

### Legacy / Additional (via built-in iconfont)

The following networks are supported through the existing icon font and will
continue to work as before:

| Key | Service |
|-----|---------|
| `weibo` | Sina Weibo |
| `qq` | QQ |
| `wechat` | WeChat |
| `qzone` | QZone |
| `tencent-weibo` | Tencent Weibo |
| `douban` | Douban |
| `pinterest` | Pinterest |
| `skype` | Skype |
| `bitbucket` | Bitbucket |
| `behance` | Behance |
| `dribble` | Dribbble |
| `stackexchange` | Stack Exchange |
| `stackoverflow` | Stack Overflow |
| `coding` | Coding.net |
| `gitee` | Gitee |
| `zhihu` | Zhihu |
| `juejin` | Juejin |
| `segmentfault` | SegmentFault |
| `youdao-note` | Youdao Note |
| `alipay` | Alipay |
| `wepay` | WePay |
| `rss` | RSS feed |
| `email` | E-mail |
| `phone` | Phone |

---

## Icon Colours

SVG icons (all networks in the tables above) support two display modes:

* **Monochrome** (`colored: false`, default): icons inherit the current text/theme
  colour and change to their brand colour on hover.
* **Coloured** (`colored: true`): icons always display their official brand colour.

The feature is toggled site-wide via `params.profile.social.colored` in your
`config.yml`.

---

## Adding a New Network

1. Add an entry in `layouts/partials/social-icon.html` inside the `$svgIcons` dict:

   ```go-html-template
   "mynetwork" (dict
       "path"  "<SVG path data>"
       "color" "#hexcolour")
   ```

   SVG paths should use a `0 0 24 24` viewBox.  
   [Simple Icons](https://simpleicons.org) is the recommended source for brand SVGs.

2. Add the network to this document's reference table.

3. Add a commented example to `exampleSite/config.yml`.
