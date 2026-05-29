# scripts/verify.ps1

$ErrorActionPreference = 'Stop'

Write-Host 'Running local verification via npm...' -ForegroundColor Cyan
npm run verify
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "`nVerification complete!" -ForegroundColor Green
