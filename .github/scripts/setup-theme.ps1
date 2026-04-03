param(
    [string]$GithubRepository = $env:GITHUB_REPOSITORY
)

if ([string]::IsNullOrEmpty($GithubRepository)) {
    $GithubRepository = Split-Path (Get-Location).Path -Leaf
}

$ThemeName = (Split-Path $GithubRepository -Leaf) -replace '^hugo-theme-', ''
$ThemesDir = "exampleSite/themes"

New-Item -ItemType Directory -Force -Path $ThemesDir | Out-Null

$LinkPath = Join-Path $ThemesDir $ThemeName
$TargetPath = (Get-Location).Path

if (Test-Path $LinkPath) {
    Remove-Item $LinkPath -Force -Recurse
}

New-Item -ItemType SymbolicLink -Path $LinkPath -Target $TargetPath | Out-Null
Write-Host "Created theme link: $LinkPath -> $TargetPath"
