#!/bin/bash

for i in *.png;
do
mkdir "${i%-screen.png}"
mv "$i" "${i%-screen.png}/screen.png"
done
