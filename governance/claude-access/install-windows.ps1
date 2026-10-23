# Installs the FYNXT Claude Code login lock on Windows. Run in an elevated PowerShell by IT/admin.
# Prefer Intune/GPO: HKLM\SOFTWARE\Policies\ClaudeCode, value "Settings" (REG_SZ) = contents of managed-settings.json.
$ErrorActionPreference = "Stop"
$src = Join-Path $PSScriptRoot "managed-settings.json"
$json = Get-Content $src -Raw
if ($json -match "REPLACE-WITH-FYNXT-ORG-UUID") { throw "Edit managed-settings.json first: set the FYNXT org UUID." }
$dir = "C:\Program Files\ClaudeCode"
New-Item -ItemType Directory -Force -Path $dir | Out-Null
Copy-Item $src (Join-Path $dir "managed-settings.json") -Force
Write-Host "Installed $dir\managed-settings.json - restart VS Code / Claude Code, then run /status to confirm."
