+++
author = "Hugo Authors"
title = "DateTime with Timezone Example"
date = "2024-01-15"
datetime = "2024-01-15T14:30:00-05:00"
timezone = "EST"
description = "Example post showing datetime parameter with timezone"
tags = [
    "example",
    "datetime",
    "timezone",
]
series = ["Time and Date Examples"]
+++

This post demonstrates the use of the **datetime** parameter with a **timezone**.

<!--more-->

When you set both the `datetime` and `timezone` parameters in the front matter, the post will display a calendar icon (📅), a clock icon (⏰), and a world/map icon (🗺️) to indicate timezone awareness.

## Front Matter

```toml
datetime = "2024-01-15T14:30:00-05:00"
timezone = "EST"
```

This is useful when you want to show complete temporal information including the timezone, which is particularly important for:

- Global audiences
- Event scheduling
- Time-sensitive content
- International collaboration

## Schema.org Support

Both the datetime and timezone values are properly formatted for accessibility tools and content scanning using appropriate semantic markup.
