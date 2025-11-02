# Git Commit Information Feature

This theme supports displaying Git commit information in two places:

1. **Site-wide in the footer** - Shows the latest commit information for the entire site
2. **Per-post in the copyright section** - Shows the commit information for each individual post (optional)

## Prerequisites

Hugo must have access to Git information for your site. This requires:

1. Your site must be in a Git repository
2. Hugo's `enableGitInfo` must be set to `true` in your configuration

## Configuration

### Enable Git Info

Add the following to your `config.yml`:

```yaml
enableGitInfo: true
```

### Configure Theme Parameters

Add these parameters to your `config.yml` under the `params` section:

```yaml
params:
  # Git repository URL for commit links (required)
  gitRepo: https://github.com/yourusername/your-repo
  
  # Show Git commit info in footer (optional, default: false)
  showGitInfo: true
  
  # Show Git commit info on each post (optional, default: false)
  showPostGitInfo: true
```

## Features

### Footer Git Info

When `showGitInfo` is enabled, the site footer will display:
- Git icon
- "Commit:" label (localized)
- Abbreviated commit hash (linked to the full commit on GitHub)
- Commit date

Example: `Commit: 9e8654a (2025-11-02)`

### Post Git Info

When `showPostGitInfo` is enabled, each post's copyright section will display:
- "Commit:" label (localized)
- Abbreviated commit hash (linked to the full commit on GitHub)
- Commit date

This appears alongside the post permalink and license information.

## Localization

The feature includes translations for:
- English (en)
- Chinese (zh)

Translation keys:
- `git_commit` - "Commit" label
- `git_commit_hash` - "Hash" label (for future use)
- `git_commit_date` - "Date" label (for future use)

## How It Works

Hugo's `enableGitInfo` feature provides Git metadata for each content file, including:
- `.GitInfo.Hash` - Full commit hash
- `.GitInfo.AbbreviatedHash` - Short commit hash (7 characters)
- `.GitInfo.AuthorDate` - Commit date
- `.GitInfo.Subject` - Commit message

The theme uses this information to create links to your Git repository and display commit information.

## Notes

- Git info is only available for content pages (posts, pages), not for list pages or the homepage
- The commit shown is the last commit that modified the content file
- Links point to the repository specified in `params.gitRepo`
- Both features are optional and can be enabled/disabled independently
