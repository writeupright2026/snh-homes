param(
    [string]$DumpPath = (Join-Path $PSScriptRoot "..\..\20260720_094842 (1).sql.gz"),
    [string]$Database = $(if ($env:DB_DATABASE) { $env:DB_DATABASE } else { "snh_homes" }),
    [string]$HostName = $(if ($env:DB_HOST) { $env:DB_HOST } else { "127.0.0.1" }),
    [int]$Port = $(if ($env:DB_PORT) { [int]$env:DB_PORT } else { 3306 }),
    [string]$Username = $(if ($env:DB_USERNAME) { $env:DB_USERNAME } else { "root" })
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command mysql -ErrorAction SilentlyContinue)) {
    throw "The mysql client is not installed or is not on PATH."
}

if (-not (Test-Path -LiteralPath $DumpPath)) {
    throw "Database dump not found: $DumpPath"
}

$password = if ($env:DB_PASSWORD) { $env:DB_PASSWORD } else { "" }
$tempSql = Join-Path ([System.IO.Path]::GetTempPath()) "snh-homes-import.sql"

try {
    $input = [System.IO.File]::OpenRead((Resolve-Path -LiteralPath $DumpPath))
    $gzip = New-Object System.IO.Compression.GZipStream(
        $input,
        [System.IO.Compression.CompressionMode]::Decompress
    )
    $output = [System.IO.File]::Create($tempSql)
    $gzip.CopyTo($output)
    $output.Dispose()
    $gzip.Dispose()
    $input.Dispose()

    $mysqlArgs = @(
        "--host=$HostName",
        "--port=$Port",
        "--user=$Username",
        "--protocol=tcp"
    )

    if ($password) {
        $mysqlArgs += "--password=$password"
    }

    & mysql @mysqlArgs -e "CREATE DATABASE IF NOT EXISTS ``$Database`` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    if ($LASTEXITCODE -ne 0) {
        throw "Could not create the MySQL database."
    }

    Get-Content -LiteralPath $tempSql -Raw | & mysql @mysqlArgs $Database
    if ($LASTEXITCODE -ne 0) {
        throw "The SQL dump import failed."
    }

    Write-Host "Imported $DumpPath into $Database."
}
finally {
    Remove-Item -LiteralPath $tempSql -Force -ErrorAction SilentlyContinue
}
