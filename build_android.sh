#!/bin/bash
ng build --prod --aot --base-href "file:///android_asset/"
rm -rf ./android/app/src/main/assets/*
cp -R ./dist/ ./android/app/src/main/assets/
mkdir ./android/app/src/main/assets/fwupdate/
cp -R  ./src/assets/fwupdate/ ./android/app/src/main/assets/fwupdate/