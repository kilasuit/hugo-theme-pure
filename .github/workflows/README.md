# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the hugo-theme-pure repository.

## Build and Deploy Example Site

**Workflow File:** `build-example-site.yml`

This workflow automatically builds and deploys the example site to demonstrate the theme's capabilities, with support for PR preview deployments.

### Triggers

The workflow runs on:
- **Pull Requests** to `main` or `master` branches (opened, synchronized, reopened, closed)
- **Pushes** to `main` or `master` branches

### What It Does

1. **Build Job**
   - Checks out the repository with submodules
   - Sets up Hugo (extended version 0.135.0)
   - Creates a symbolic link to use the theme from the parent directory
   - Builds the example site with minification
   - For PRs: builds with baseURL set to the PR-specific preview path
   - For main/master: builds with the standard baseURL
   - Uploads the built site as an artifact

2. **Deploy Main Job** (only on push to main/master)
   - Deploys the built site to GitHub Pages root
   - Makes the example site available at: `https://{owner}.github.io/{repo}/`

3. **Deploy PR Preview Job** (only on pull requests)
   - Checks out the `gh-pages` branch
   - Extracts the build artifact
   - Deploys the preview to a branch-specific directory
   - Makes the preview available at: `https://{owner}.github.io/{repo}/{branch-name}/`
   - Allows side-by-side comparison of different PRs

4. **Cleanup PR Preview Job** (when PR is closed/merged)
   - Automatically removes the PR preview directory from gh-pages
   - Keeps the gh-pages branch clean

5. **Comment Preview Job** (only on pull requests)
   - Posts a comment on the PR with the preview URL
   - Provides information about build status and deployment
   - Updates the comment if it already exists

### Setup Requirements

To use this workflow, ensure:
- GitHub Pages is enabled in repository settings
- GitHub Pages is configured to deploy from the `gh-pages` branch
- The repository has the necessary permissions for GitHub Pages deployment
- The `exampleSite` directory contains a valid Hugo site configuration

### Permissions

The workflow requires the following permissions:
- `contents: write` - to push PR previews to gh-pages branch
- `pages: write` - to deploy to GitHub Pages
- `id-token: write` - for GitHub Pages deployment
- `pull-requests: write` - to comment on PRs

### PR Preview Feature

Each pull request gets its own preview deployment:
- **Preview URL Pattern:** `https://{owner}.github.io/{repo}/{branch-name}/`
- Branch names are sanitized (special characters replaced with hyphens)
- Previews are automatically updated when the PR is updated
- Previews are automatically removed when the PR is closed or merged
- Multiple PRs can be compared side-by-side

### Example URLs

- **Main site:** `https://kilasuit.github.io/hugo-theme-pure/`
- **PR preview (feature-branch):** `https://kilasuit.github.io/hugo-theme-pure/feature-branch/`
- **PR preview (fix/issue-123):** `https://kilasuit.github.io/hugo-theme-pure/fix-issue-123/`
