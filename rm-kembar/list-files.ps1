# Script: list-files.ps1
# Cara pakai: .\list-files.ps1           -> list biasa
#             .\list-files.ps1 -Tree     -> tampilan per folder

param(
    [switch]$Tree,
    [string]$Ext = ""
)

$excludeDirs = @('vendor', 'node_modules', '.git', 'storage\framework\views', 'storage\framework\cache', 'storage\framework\sessions')

$files = Get-ChildItem -Recurse -File | Where-Object {
    $path = $_.FullName
    $skip = $false
    foreach ($d in $excludeDirs) {
        if ($path -match [regex]::Escape($d)) { $skip = $true; break }
    }
    if ($Ext -ne "" -and $_.Extension -ne ".$Ext") { $skip = $true }
    -not $skip
}

$root = (Get-Location).Path + "\"

if ($Tree) {
    $grouped = $files | Group-Object { $_.DirectoryName -replace [regex]::Escape($root), "" }
    foreach ($group in ($grouped | Sort-Object Name)) {
        Write-Host ""
        Write-Host ("[" + $group.Name + "]") -ForegroundColor Cyan
        foreach ($f in ($group.Group | Sort-Object Name)) {
            Write-Host ("   " + $f.Name)
        }
    }
} else {
    $files | ForEach-Object { $_.FullName -replace [regex]::Escape($root), "" } | Sort-Object
}

Write-Host ""
Write-Host ("Total: " + $files.Count + " file(s)") -ForegroundColor Green
