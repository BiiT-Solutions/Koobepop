#!/bin/bash

plugins=`ionic cordova plugin ls | awk '{ print $1 }'`

echo "$plugins"
for i in $plugins
do
  if [ -n $i ];  then
    echo "Updating '$i'"
    ionic cordova plugin remove $i
    #ionic cordova plugin add $i
  fi
done
