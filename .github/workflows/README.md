# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the hugo-theme-pure repository.

## Build and Deploy Example Site

**Workflow File:** `build-example-site.yml`

This workflow automatically builds and deploys the example site to demonstrate the theme's capabilities.

### Triggers

The workflow runs on:
- **Pull Requests** to `main` or `master` branches (opened, synchronized, reopened)
- **Pushes** to `main` or `master` branches

### What It Does

1. **Build Job**
   - Checks out the repository with submodules
   - Sets up Hugo (extended version, latest)
   - Creates a symbolic link to use the theme from the parent directory
   - Builds the example site with minification
   - Uploads the built site as a Pages artifact

2. **Deploy Job** (only on push to main/master)
   - Deploys the built site to GitHub Pages
   - Makes the example site available at: `https://{owner}.github.io/{repo}/`

3. **Comment Preview Job** (only on pull requests)
   - Posts a comment on the PR with build status
   - Provides information about where the site will be deployed once merged
   - Updates the comment if it already exists

### Setup Requirements

To use this workflow, ensure:
- GitHub Pages is enabled in repository settings
- The repository has the necessary permissions for GitHub Pages deployment
- The `exampleSite` directory contains a valid Hugo site configuration

### Permissions

The workflow requires the following permissions:
- `contents: read` - to checkout the repository
- `pages: write` - to deploy to GitHub Pages
- `id-token: write` - for GitHub Pages deployment
- `pull-requests: write` - to comment on PRs

### Example Site Preview

Once this workflow is running:
- Every PR will trigger a build to ensure the example site builds correctly
- Merges to main/master will automatically deploy the example site
- PR comments will provide visibility into build status and deployment URLs
