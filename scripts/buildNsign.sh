#!/bin/bash

# This script builds and signs iGROW for Android, it also automatically changes the app version and commits it.


# Abort execution if any of below commands fail
set -e

#This sets up the project
scripts/setup.sh

echo "Building iGROW"
ionic cordova build android --prod --release -- -- --packageType=bundle --type=ionic-angular

echo "Signing ..."
jarsigner -sigalg SHA512withRSA -digestalg SHA-512 -keystore scripts/certs/iGROW.jks /data/workspace/Koobepop/platforms/android/app/build/outputs/bundle/release/app.aab IGROW -storepass:file scripts/certs/keystore-pass
#jarsigner -sigalg SHA512withRSA -digestalg SHA-512 -keystore scripts/certs/IGOW.jks /data/workspace/Koobepop/platforms/android/app/build/outputs/bundle/release/app.aab IGOW -storepass:file scripts/certs/keystore-pass
#jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore scripts/certs/IGOW.jks /data/workspace/Koobepop/platforms/android/app/build/outputs/bundle/release/app.aab IGOW -storepass:file scripts/certs/keystore-pass
#java -jar /opt/android-sdk/bundletool-all-1.13.1.jar build-apks --bundle=./platforms/android/app/build/outputs/bundle/release/app.aab --output=iGROW_0.3.3.apks --ks=scripts/certs/IGOW.jks --ks-pass=file:scripts/certs/keystore.pwd --ks-key-alias=IGOW --key-pass=file:scripts/certs/keystore.pwd

# get current version
version=`cat package.json | grep -Po '(?<="version": ")[^"]*'`
sdkToolsVersion="33.0.0"

echo "Optimizing and renaming"
#$ANDROID_HOME/build-tools/${sdkToolsVersion}/zipalign -vf 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk iGROW_${version}.apk
mv /data/workspace/Koobepop/platforms/android/app/build/outputs/bundle/release/app.aab iGROW_${version}.aab

#echo "Bumping version"
#
increase version number eg.: 1.5.X
gulp bump --patch
git add --all
git commit -m "Built version ${version}"


#Registrar firma:
- Ir a Integridad de la aplicacion en Google Play Console
- Bajar pepk
- Ejececutar el comando similar a usando Java 11:
/usr/lib/jvm/java-11-openjdk-amd64/bin/java -jar pepk.jar --keystore=scripts/certs/iGROW.jks --alias=IGROW --output=./priv.key --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a

keytool -export -rfc -keystore scripts/certs/iGROW.jks -alias IGROW -file priv.key

# Notes

##Error  You uploaded an APK or Android App Bundle which has an activity, activity alias, service or broadcast receiver with intent filter, but without 'android:exported' property set. This file can't be installed on Android 12 or higher. See: developer.android.com/about/versions/12/behavior-changes-12#exported
#On 'platform/android/app/src/main' add 'android:exported="true" ' to the activity con intent-filter
