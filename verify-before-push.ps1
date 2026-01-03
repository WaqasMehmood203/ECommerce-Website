# Pre-Push Security Verification Script
# Run this before pushing to GitHub to ensure no sensitive data is exposed

Write-Host "`n🔒 GitHub Security Pre-Push Verification`n" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray

# Check 1: Verify .env files are not tracked
Write-Host "`n[1/6] Checking if .env files are protected..." -ForegroundColor Yellow
$envFiles = git ls-files | Select-String -Pattern '\.env$'
if ($envFiles) {
    Write-Host "❌ DANGER: .env files are being tracked!" -ForegroundColor Red
    Write-Host "   Files found: $envFiles" -ForegroundColor Red
    Write-Host "   Run: git rm --cached .env server/.env" -ForegroundColor Yellow
    $hasErrors = $true
} else {
    Write-Host "✅ .env files are protected" -ForegroundColor Green
}

# Check 2: Verify .env.example files exist
Write-Host "`n[2/6] Checking if .env.example files exist..." -ForegroundColor Yellow
if ((Test-Path ".env.example") -and (Test-Path "server\.env.example")) {
    Write-Host "✅ .env.example files exist" -ForegroundColor Green
} else {
    Write-Host "❌ WARNING: .env.example files missing!" -ForegroundColor Red
    $hasWarnings = $true
}

# Check 3: Verify log files are not tracked
Write-Host "`n[3/6] Checking if log files are protected..." -ForegroundColor Yellow
$logFiles = git ls-files | Select-String -Pattern '\.log$' | Select-String -NotMatch -Pattern 'migration'
if ($logFiles) {
    Write-Host "❌ WARNING: Log files are being tracked!" -ForegroundColor Red
    Write-Host "   Files found: $logFiles" -ForegroundColor Red
    $hasWarnings = $true
} else {
    Write-Host "✅ Log files are protected" -ForegroundColor Green
}

# Check 4: Verify test output files are not tracked
Write-Host "`n[4/6] Checking if test output files are protected..." -ForegroundColor Yellow
$testFiles = git ls-files | Select-String -Pattern 'test-output'
if ($testFiles) {
    Write-Host "❌ WARNING: Test output files are being tracked!" -ForegroundColor Red
    Write-Host "   Files found: $testFiles" -ForegroundColor Red
    $hasWarnings = $true
} else {
    Write-Host "✅ Test output files are protected" -ForegroundColor Green
}

# Check 5: Verify actual .env files exist locally
Write-Host "`n[5/6] Checking if local .env files exist..." -ForegroundColor Yellow
if ((Test-Path ".env") -and (Test-Path "server\.env")) {
    Write-Host "✅ Local .env files exist" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: Local .env files not found!" -ForegroundColor Yellow
    Write-Host "   Make sure you have .env files for local development" -ForegroundColor Yellow
}

# Check 6: Search for potential secrets in staged files
Write-Host "`n[6/6] Scanning for potential secrets in documentation..." -ForegroundColor Yellow
$suspiciousPatterns = @(
    "postgresql://.*:.*@",
    "mysql://.*:.*@",
    "mongodb://.*:.*@",
    "NEXTAUTH_SECRET=[A-Za-z0-9]{20,}",
    "API_KEY=[A-Za-z0-9]{20,}",
    "SECRET_KEY=[A-Za-z0-9]{20,}"
)

$foundSecrets = $false
foreach ($pattern in $suspiciousPatterns) {
    $matches = git diff --cached | Select-String -Pattern $pattern
    if ($matches) {
        Write-Host "❌ DANGER: Potential secret found in staged files!" -ForegroundColor Red
        Write-Host "   Pattern: $pattern" -ForegroundColor Red
        $foundSecrets = $true
        $hasErrors = $true
    }
}

if (-not $foundSecrets) {
    Write-Host "✅ No obvious secrets found in staged files" -ForegroundColor Green
}

# Final Summary
Write-Host "`n" + ("=" * 60) -ForegroundColor Gray
Write-Host "`n📊 VERIFICATION SUMMARY`n" -ForegroundColor Cyan

if ($hasErrors) {
    Write-Host "❌ CRITICAL ISSUES FOUND - DO NOT PUSH!" -ForegroundColor Red
    Write-Host "   Fix the errors above before pushing to GitHub" -ForegroundColor Red
    exit 1
} elseif ($hasWarnings) {
    Write-Host "⚠️  WARNINGS FOUND - Review before pushing" -ForegroundColor Yellow
    Write-Host "   Check the warnings above" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "✅ ALL CHECKS PASSED - SAFE TO PUSH!" -ForegroundColor Green
    Write-Host "`n   Your project is ready for GitHub!" -ForegroundColor Green
    Write-Host "   Run: git push origin main`n" -ForegroundColor Cyan
    exit 0
}
