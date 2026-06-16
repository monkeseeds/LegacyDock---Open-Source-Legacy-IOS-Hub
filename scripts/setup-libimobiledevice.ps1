param(
  [string]$ReleaseTag = "v1.3.17",
  [string]$InstallRoot = "tools/libimobiledevice/win-x64"
)

$ErrorActionPreference = "Stop"

$assetName = "libimobiledevice.1.2.1-r1122-win-x64.zip"
$downloadUrl = "https://github.com/libimobiledevice-win32/imobiledevice-net/releases/download/$ReleaseTag/$assetName"
$repoRoot = Split-Path -Parent $PSScriptRoot
$installDir = Join-Path $repoRoot $InstallRoot
$downloadDir = Join-Path $repoRoot "tools/libimobiledevice/downloads"
$zipPath = Join-Path $downloadDir $assetName

New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null
Invoke-WebRequest $downloadUrl -OutFile $zipPath

if (Test-Path $installDir) {
  Remove-Item -LiteralPath $installDir -Recurse -Force
}

Expand-Archive -LiteralPath $zipPath -DestinationPath $installDir
Write-Host "libimobiledevice extracted to $installDir"
