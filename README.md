This is an application developed by Biit Sourcing Solutions.

# First time, you must:

sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
sudo apt install gradle

#Node 10 max!!
nvm install lts/dubnium
npm install -g @ionic/cli
apt install python2
npm rebuild node-sass
npm install -g gulp gulp-cli

Needs Java and javac 8!

And install Android SDK

#Not compiling.
Try:
ionic cordova platform rm android
ionic cordova platform add android@8
export ANDROID_SDK_ROOT=/opt/android-sdk
cordova build android --prod --release -- --packageType=bundle

#Install aab on android emulator
Download https://github.com/google/bundletool/releases/tag/1.13.1 on /opt/android-sdk
java -jar /opt/android-sdk/bundletool-all-1.13.1.jar build-apks --bundle=/data/workspace/Koobepop/platforms/android/app/build/outputs/bundle/release/app.aab --output=./my_app.apks --mode=universal
java -jar /opt/android-sdk/bundletool-all-1.13.1.jar install-apks --apks=./my_app.apks


#Registrar firma:
- Ir a Integridad de la aplicacion en Google Play Console
- Bajar pepk
- Ejececutar el comando similar a usando Java 11:
/usr/lib/jvm/java-11-openjdk-amd64/bin/java -jar pepk.jar --keystore=scripts/certs/iGROW.jks --alias=IGROW --output=./priv.key --encryptionkey=eb10fe8f7c7c9df715022017b00c6471f8ba8170b13049a11e6c09ffe3056a104a3bbe4ac5a955f4ba4fe93fc8cef27558a3eb9d2a529a2092761fb833b656cd48b9de6a

keytool -export -rfc -keystore scripts/certs/iGROW.jks -alias IGROW -file priv.key

#Note
Ensure you are using the node v10 max. 

To build and sign the app these are the steps:

##  Error: Could not find an "NgModule" decorator in /data/workspace/Koobepop/src/app/app.module.ts
Remove node_modules and compile again

##Error  You uploaded an APK or Android App Bundle which has an activity, activity alias, service or broadcast receiver with intent filter, but without 'android:exported' property set. This file can't be installed on Android 12 or higher. See: developer.android.com/about/versions/12/behavior-changes-12#exported

On platform/android/app/src/main

Add 'android:exported="true" ' to the activity con intent-filter


# ANDROID
# There's an script 'scripts/buildNsign.sh' which builds and signs the application if all the dependencies are installed (android studio, SDKs, etc)

  0- If there's not a generated keystore (This would be necessary for new apps)
  `$ keytool -genkey -v -keystore <my_release_key>.jks -alias <alias_name> -keyalg RSA -keysize 2048 -validity 10000`
  Provide the necessary data for the key generation.

  # The script 'scripts/buildNSign.sh' does this steps:
  1- Generate the application .apk (From the project's folder)
  `$ ionic cordova build android --prod --release`

  2- Sign the application (From platforms/android/build/outputs/apk)
  `$ jarsigner -sigalg SHA1withRSA -digestalg SHA1 -keystore <my_release_key>.jks <unsigned_release>.apk <alias_name>`

  3- Optimize the apk (the zipalign tool can be found on Android/Sdk/build-tools/VERSION/zipalign)
  `$ zipalign -v 4 <unsigned_release>.apk <release_name>.apk`


  To bump the application version run:
  `$ gulp bump --<flag>`
  
# Change target SDK
Change on config.xml to :
<preference name="android-targetSdkVersion" value="28" />
ionic cordova prepare android



flags:
  patch   _._.X
  minor   _.X._
  major   X._._

#iOS