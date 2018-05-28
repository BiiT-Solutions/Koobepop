#!/bin/bash

# This script builds and signs iGROW for Android, it also automatically changes the app version and commits it.

# Abort execution if any of below commands fail
set -e
npm install

gulp setup-i-js

echo "Building iGROW"
ionic cordova build android --prod --release
echo "Signing ..."
jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore scripts/certs/IGOW.jks platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk IGOW -storepass:file scripts/certs/keystore-pass

# get current version
version=`cat package.json | grep -Po '(?<="version": ")[^"]*'`
sdkToolsVersion="25.0.0"

echo "Optimizing and renaming"
$ANDROID_HOME/build-tools/${sdkToolsVersion}/zipalign -vf 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk iGROW_${version}.apk

echo "Bumping version"
# increase version number eg.: 1.5.X
gulp bump --patch
git add --all
git commit -m "Built version ${version}"
# npm version patch
