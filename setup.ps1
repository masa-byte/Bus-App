# Checking if npm is installed
$npmVersion = npm -v 
# Checking if nest is installed
$nestVersion = nest -v
# Checking if angular is installed
$ngVersion = ng version
# Checking if docker is running
$dockerRunning = docker ps

if (-not $npmVersion) {
    Write-Host "npm is not installed. Link provided below"
    Write-Host "https://nodejs.org/en/download"
}
else {
    Write-Host "npm is already installed. Proceeding..."
    if (-not $nestVersion) {
        Write-Host "Nest is not installed. Downloading Nest..."

        # Installing Nest
        npm install -g @nestjs/cli
    }

    if (-not $ngVersion) {
        Write-Host "Angular is not installed. Downloading Angular..."

        # Installing Angular CLI
        npm install -g @angular/cli
    }
}
if (-not $dockerRunning) {
    Write-Host "Docker deamon is not running. Please start Docker and run this script again."
}
else {
    Write-Host "Docker deamon is running. Proceeding..."
}

if ($npmVersion -and $nestVersion -and $ngVersion -and $dockerRunning) {
    Write-Host "Eveything is already installed. Starting..."

    # Installing dependencies
    npm run install:all

    # Starting server and clients
    npm run start:all
}