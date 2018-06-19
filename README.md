This is an application developed by Biit Sourcing Solutions.

To build and sign the app these are the steps:



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



flags:
  patch   _._.X
  minor   _.X._
  major   X._._

#iOS