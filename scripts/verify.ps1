# scripts/verify.ps1

$ErrorActionPreference = 'Stop'

Write-Host 'Running Prettier check...' -ForegroundColor Cyan
npx prettier@3.6.2 --check .
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "`nRunning Exercise heading check..." -ForegroundColor Cyan
node scripts/verify-exercise-headings.mjs
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "`nRunning markdownlint check..." -ForegroundColor Cyan
# markdownlint-cli doesn't have a default config if not present, so we'll use npx to run it.
# We ignore AGENTS.md, node_modules, and agent-rules-private (submodule).
npx markdownlint-cli "**/*.mdx" "**/*.md" --ignore "AGENTS.md" --ignore "node_modules/**" --ignore "agent-rules-private/**" --fix
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "`nVerification complete!" -ForegroundColor Green
