#!/bin/sh
npm install --save react babel express routr request body-parser babel-runtime
npm install --save-dev browser-request aliasify browserify watchify babelify envify eslint eslint-plugin-react  nodemon browser-sync gulp gulp-babel gulp-cached gulp-jsx-coverage gulp-eslint gulp-util gulp-uglify vinyl-source-stream vinyl-buffer
mkdir actions
mkdir components
mkdir stores
BASE=node_modules/fluxex/examples/04-infinite-scroll
cp $BASE/actions/* actions
cp $BASE/components/* components
cp $BASE/stores/* stores
cp $BASE/server.js index.js
cp $BASE/fluxexapp.js fluxexapp.js
echo "require('fluxex/extra/gulpfile');" > gulpfile.js
cp $BASE/.eslintrc .

echo '==================== THE STARTER PROJECT IS READY ===================='
echo '= + index.js                    Your Server, add api URL here        ='
echo '= + fluxexapp.js                Your APP, add store defination here  ='
echo '= |                                                                  ='
echo '= + actions/ +                  Add your actions here                ='
echo '= |          + routing.js       Add routes here                      ='
echo '= |          + page.js          Add page actions here                ='
echo '= |          + api.js           Add api actions here                 ='
echo '= |                                                                  ='
echo '= + stores/                     Add your store here                  ='
echo '= |                                                                  ='
echo '= + components/ +               Add your components here             ='
echo '= |             + Html.jsx      Use your components here             ='
echo '======================================================================'
echo ' * Run this to start the server:'
echo
echo '       node_modules/.bin/gulp develop'
echo
