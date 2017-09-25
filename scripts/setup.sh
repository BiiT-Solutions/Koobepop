#!/bin/bash
echo "Installing dependencies"
npm install
echo "Configuring Infographic-JS"
gulp setup-i-js
echo "Setting up tracker"
mkdir -p www
cp -rf tracker-dist www
