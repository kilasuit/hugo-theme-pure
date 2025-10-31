+++
author = "Hugo Authors"
title = "Timezone Only Example"
date = "2024-01-15"
timezone = "UTC"
description = "Example post showing timezone parameter with world icon"
tags = [
    "example",
    "timezone",
]
+++

This post demonstrates the use of the **timezone** parameter alone.

<!--more-->

When you set the `timezone` parameter in the front matter, the post will display a world/map icon (🗺️) along with the timezone abbreviation.

## Front Matter

```toml
timezone = "UTC"
```

This is useful when you want to indicate the timezone context for content without specifying a specific datetime.
