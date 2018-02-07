#!/bin/bash
# abort execution if any of below commands fail
set -e
npm install

echo "Building iGROW"
ionic cordova build android --prod --release
echo "Signing ..."
jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore scripts/certs/IGOW.jks platforms/android/build/outputs/apk/android-release-unsigned.apk IGOW -storepass:file scripts/certs/keystore-pass

# get current version
version=`cat package.json | grep -Po '(?<="version": ")[^"]*'`
toolsVersion="25.0.0"

echo "Optimizing and renaming"
$ANDROID_HOME/build-tools/${toolsVersion}/zipalign -vf 4 platforms/android/build/outputs/apk/android-release-unsigned.apk platforms/android/build/outputs/apk/iGROW_${version}.apk

echo "Bumping version"
# increase version number eg.: 1.5.X
#gulp bump --patch
npm version 
