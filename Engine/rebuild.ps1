#This script is used for solving errors with linking projects
Write-Host "Strarting rebuild" -ForegroundColor green
Write-Host "Removing build folder" -ForegroundColor green
try {
    Remove-Item build -Recurse -Force -Confirm:$false -ErrorAction Stop
} catch {
    Write-Host "Removing build folder failed." -ForegroundColor red
}
Write-Host "Configuring project" -ForegroundColor green
node-gyp configure
Write-Host "Building project" -ForegroundColor green
node-gyp build
Write-Host "Rebuild Finished" -ForegroundColor green