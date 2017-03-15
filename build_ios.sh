#!/bin/bash
ng build --prod --aot 
rm -rf ./ios/www/*
cp -R ./dist/ ./ios/www/