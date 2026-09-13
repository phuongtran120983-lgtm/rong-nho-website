#!/usr/bin/env pwsh

# Set working directory
cd "c:\Users\DELL\Desktop\my-brain\website"

# Initialize git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..."
    git init
    git config user.name "Phuong Tran"
    git config user.email "phuong@gmail.com"
}

# Check status
Write-Host "Current git status:"
git status

# Add all files
Write-Host "`nAdding all files..."
git add .

# Check if there are changes
$status = git status --porcelain
if ($status) {
    Write-Host "Committing changes..."
    git commit -m "Initial commit: Umibudo website with chatbot widget"
} else {
    Write-Host "No changes to commit"
}

# Configure remote
Write-Host "`nConfiguring remote..."
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote already configured, removing old one..."
    git remote remove origin
}

git remote add origin "https://github.com/phuongtran120983-lgtm/rong-nho-website.git"
git remote -v

# Rename branch to main
Write-Host "`nRenaming branch to main..."
git branch -M main

# Push to GitHub
Write-Host "`nPushing to GitHub (this may prompt for authentication)..."
Write-Host "If prompted, use your GitHub Personal Access Token as password"
Write-Host "Token should have 'repo' scope"
Write-Host ""
git push -u origin main -v

Write-Host "`n✅ Done!"
