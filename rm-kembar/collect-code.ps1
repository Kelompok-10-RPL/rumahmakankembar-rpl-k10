# Script: collect-code.ps1
# Deskripsi: Kumpulkan semua file kode ke dalam satu file Markdown
# Cara pakai: .\collect-code.ps1
#             .\collect-code.ps1 -Output "dump.txt"
#             .\collect-code.ps1 -Extensions @("php","jsx")  <- filter ekstensi tertentu

param(
    [string]$Output = "CODEBASE_DUMP.md",
    [string[]]$Extensions = @("php", "jsx", "js", "vue", "ts", "tsx", "css", "blade.php")
)

$excludeDirs = @(
    'vendor',
    'node_modules',
    '.git',
    'storage\framework',
    'storage\logs',
    'public\build',
    'bootstrap\cache'
)

$root = (Get-Location).Path + "\"

# Kumpulkan semua file yang cocok
$files = Get-ChildItem -Recurse -File | Where-Object {
    $path = $_.FullName
    $skip = $false

    # Cek apakah file ada di folder yang dikecualikan
    foreach ($d in $excludeDirs) {
        if ($path -match [regex]::Escape($d)) {
            $skip = $true
            break
        }
    }

    # Cek ekstensi: cocokkan dengan list ekstensi yang diizinkan
    if (-not $skip) {
        $matched = $false
        foreach ($ext in $Extensions) {
            if ($_.Name -like "*.$ext") {
                $matched = $true
                break
            }
        }
        if (-not $matched) { $skip = $true }
    }

    -not $skip
} | Sort-Object FullName

Write-Host ("Ditemukan " + $files.Count + " file. Sedang mengumpulkan...") -ForegroundColor Cyan

# Mulai tulis output
$lines = New-Object System.Collections.Generic.List[string]
$lines.Add("# Codebase Dump - RM Kembar")
$lines.Add("")
$lines.Add(("Generated: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")))
$lines.Add(("Total Files: " + $files.Count))
$lines.Add("")
$lines.Add("---")
$lines.Add("")

# Daftar isi
$lines.Add("## Daftar File")
$lines.Add("")
$i = 1
foreach ($file in $files) {
    $rel = $file.FullName -replace [regex]::Escape($root), ""
    $lines.Add(($i.ToString() + ". " + $rel))
    $i++
}

$lines.Add("")
$lines.Add("---")
$lines.Add("")

# Isi setiap file
foreach ($file in $files) {
    $rel = $file.FullName -replace [regex]::Escape($root), ""
    $ext = $file.Extension.TrimStart(".")

    # Tentukan syntax highlighting
    $lang = switch ($ext) {
        "php"  { "php" }
        "jsx"  { "jsx" }
        "tsx"  { "tsx" }
        "js"   { "javascript" }
        "ts"   { "typescript" }
        "css"  { "css" }
        "vue"  { "vue" }
        default { "" }
    }

    $lines.Add(("## " + $rel))
    $lines.Add("")
    $lines.Add(("``````" + $lang))

    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        if ($content) {
            $lines.Add($content.TrimEnd())
        } else {
            $lines.Add("(file kosong)")
        }
    } catch {
        $lines.Add("(gagal membaca file: " + $_.Exception.Message + ")")
    }

    $lines.Add("``````")
    $lines.Add("")
    $lines.Add("---")
    $lines.Add("")

    Write-Host ("  + " + $rel) -ForegroundColor DarkGray
}

# Simpan output
$lines | Out-File -FilePath $Output -Encoding UTF8

$size = [math]::Round((Get-Item $Output).Length / 1KB, 1)
Write-Host ""
Write-Host ("Selesai! File disimpan ke: " + $Output) -ForegroundColor Green
Write-Host ("Ukuran file: " + $size + " KB") -ForegroundColor Green
