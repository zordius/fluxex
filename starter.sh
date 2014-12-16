#!/bin/sh
npm install fluxex react node-jsx express browserify watchify reactify uglifyify jshint-stylish nodemon browser-sync gulp gulp-jshint gulp-react gulp-cached gulp-util vinyl-source-stream
mkdir actions
mkdir components
mkdir stores
BASE=node_modules/fluxex/examples/04-infinite-scroll
cp $BASE/actions/* actions
cp $BASE/components/* components
cp $BASE/stores/* stores
