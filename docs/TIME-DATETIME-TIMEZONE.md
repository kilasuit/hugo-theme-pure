# Time, DateTime, and Timezone Support

This theme now supports flexible date and time display options for posts, allowing you to show:
- Date only (existing behavior)
- Time only
- DateTime (date + time)
- DateTime with timezone
- Timezone only

## Front Matter Parameters

### `time`
Display time with a clock icon (⏰).

```toml
time = "14:30"
```

### `datetime`
Display date and time with calendar (📅) and clock (⏰) icons.

```toml
datetime = "2024-01-15T14:30:00"
```

### `timezone`
Display timezone with a world/map icon (🗺️).

When used alone:
```toml
timezone = "EST"
```

When used with `datetime`:
```toml
datetime = "2024-01-15T14:30:00-05:00"
timezone = "EST"
```

This will show calendar, clock, AND world icons.

## Icon Reference

- **Calendar** (`icon-calendar-check`): Shown for `date` and `datetime` parameters
- **Clock** (`icon-clock`): Shown for `time` and `datetime` parameters
- **World/Map** (`icon-map-marker`): Shown for `timezone` parameter

## Examples

See the following example posts for demonstrations:
- `/exampleSite/content/posts/time-example.md` - Time only
- `/exampleSite/content/posts/datetime-example.md` - DateTime without timezone
- `/exampleSite/content/posts/datetime-timezone-example.md` - DateTime with timezone
- `/exampleSite/content/posts/timezone-example.md` - Timezone only

## Accessibility & SEO

All time-related parameters use proper semantic HTML with:
- `<time>` elements with `datetime` attributes
- `itemprop` attributes for Schema.org compatibility
- Proper formatting for content scanning tools

## Partials

Three new partials have been added:
- `/layouts/partials/post/time.html` - Handles time display
- `/layouts/partials/post/datetime.html` - Handles datetime display with conditional timezone icon
- `/layouts/partials/post/timezone.html` - Handles timezone display

These partials are automatically included in:
- `layouts/partials/article.html` (full post view)
- `layouts/partials/card-post.html` (card view)
- `layouts/partials/item-post.html` (list view)
