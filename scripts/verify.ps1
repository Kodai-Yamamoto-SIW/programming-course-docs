# scripts/verify.ps1

Write-Host "Running Prettier check..." -ForegroundColor Cyan
npx prettier --check .
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nRunning markdownlint check..." -ForegroundColor Cyan
# markdownlint-cli doesn't have a default config if not present, so we'll use npx to run it.
# We ignore AGENTS.md, node_modules, and agent-rules-private (submodule).
npx markdownlint-cli "**/*.mdx" "**/*.md" --ignore "AGENTS.md" --ignore "node_modules/**" --ignore "agent-rules-private/**" --fix
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nRunning qspec verification..." -ForegroundColor Cyan
powershell -File scripts/verify-qspec.ps1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "`nVerification complete!" -ForegroundColor Green
