#!/bin/sh
npm install --save react node-jsx express routes
npm install --save-dev browserify watchify reactify uglifyify jshint-stylish nodemon browser-sync gulp gulp-jshint gulp-react gulp-cached gulp-util vinyl-source-stream
mkdir actions
mkdir components
mkdir stores
BASE=node_modules/fluxex/examples/04-infinite-scroll
cp $BASE/actions/* actions
cp $BASE/components/* components
cp $BASE/stores/* stores
cp $BASE/server.js index.js
cp $BASE/fluxexapp.js fluxexapp.js
cp $BASE/gulpfile.js gulpfile.js
