# scripts/verify-qspec.ps1

$files = Get-ChildItem -Path "content/**/*.qspec.md" -Recurse
$exitCode = 0

foreach ($file in $files) {
    # Use -Encoding utf8 to handle files correctly
    $content = Get-Content $file.FullName -Raw -Encoding utf8
    $errors = @()

    # Check for required headings (using (?m) for multiline)
    if ($content -notmatch "(?m)^# ") { $errors += "Missing Title (# Title)" }
    if ($content -notmatch "(?m)^## Type") { $errors += "Missing ## Type" }
    if ($content -notmatch "(?m)^## Prompt") { $errors += "Missing ## Prompt" }
    if ($content -notmatch "(?m)^## Explanation") { $errors += "Missing ## Explanation" }

    # Check for corrupted artifacts
    if ($content -match "` ext") { $errors += "Found corrupted artifact '` ext'" }

    if ($errors.Count -gt 0) {
        Write-Host "FAIL: $($file.FullName)" -ForegroundColor Red
        foreach ($err in $errors) {
            Write-Host "  - $err" -ForegroundColor Yellow
        }
        $exitCode = 1
    }
}

if ($exitCode -ne 0) {
    Write-Host "`nqspec verification failed!" -ForegroundColor Red
    exit 1
} else {
    Write-Host "`nqspec verification passed!" -ForegroundColor Green
    exit 0
}
