+++
author = "Hugo Authors"
title = "DateTime Example (No Timezone)"
date = "2024-01-15"
datetime = "2024-01-15T14:30:00"
description = "Example post showing datetime parameter without timezone"
tags = [
    "example",
    "datetime",
]
+++

This post demonstrates the use of the **datetime** parameter without a timezone.

<!--more-->

When you set the `datetime` parameter in the front matter without a timezone, the post will display both a calendar icon (📅) and a clock icon (⏰).

## Front Matter

```toml
datetime = "2024-01-15T14:30:00"
```

This is useful when you want to show both date and time information but don't need to specify a timezone.

## Schema.org Support

The datetime value is properly formatted for accessibility tools and content scanning using the `datePublished` itemprop.
