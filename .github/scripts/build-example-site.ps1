param(
    [string]$RepoOwner = $env:GITHUB_REPOSITORY_OWNER,
    [string]$RepoName = ($env:GITHUB_REPOSITORY -replace '^[^/]+/', ''),
    [string]$EventName = $env:GITHUB_EVENT_NAME,
    [string]$BranchName = $env:GITHUB_HEAD_REF
)

if ($EventName -eq "pull_request" -and -not [string]::IsNullOrEmpty($BranchName)) {
    $SafeBranch = $BranchName -replace '[^a-zA-Z0-9-]', '-'
    $BaseUrl = "https://$RepoOwner.github.io/$RepoName/$SafeBranch/"
} else {
    $BaseUrl = "https://$RepoOwner.github.io/$RepoName/"
}

Write-Host "Building with BaseURL: $BaseUrl"

Set-Location -Path "exampleSite"
hugo --minify --baseURL "$BaseUrl"
