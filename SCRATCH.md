Start from Scratch
==================

Build your own fluxex application from scratch!

Prepare the project
-------------------

```
npm init
npm install --save fluxex react babel express routr request body-parser
npm install --save-dev browser-request aliasify browserify watchify babelify envify eslint eslint-plugin-react babel-eslint nodemon browser-sync gulp gulp-babel gulp-cached gulp-jsx-coverage gulp-eslint gulp-util gulp-uglify vinyl-source-stream vinyl-buffer babel-polyfill babel-preset-es2015 babel-preset-react babel-plugin-transform-runtime
mkdir actions
mkdir components
mkdir stores
```

Create Action
-------------
edit `actions/page.js` - Define an action.

```javascript
module.exports = function () {
    return this.dispatch('UPDATE_PRODUCT', {
        title: 'sample product',
        price: 12345,
        sold: 0
    });
};
```

Create Store
------------
edit `stores/product.js` - Define your store interface and handle the action.

```javascript
module.exports = {
    handle_UPDATE_PRODUCT: function (payload) {
        this._set('data', payload);
        this.emitChange();
    },
    getData: function () {
        return this._get('data');
    }
};
```

Create HTML
-----------
edit `components/Html.jsx` - Define your page as react component.

```jsx
var React = require('react');
var Fluxex = require('fluxex');
var Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['product']}
    ],

    getStateFromStores: function () {
        return this.getStore('product').getData();
    },

    handleClick: function () {
        var product = this.state;
        product.sold++;
        this.executeAction(function () {
            return this.dispatch('UPDATE_PRODUCT', product);
        });
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
         </head>
         <body onClick={this.handleClick}>
          <ul>
           <li>Product: {this.state.title}</li>
           <li>Price: {this.state.price}</li>
           <li>Sold: {this.state.sold}</li>
          </ul>
         <Fluxex.InitScript />
         </body>
        </html>
        );
    }
});

module.exports = Html;
```

Create Your App
---------------
edit `fluxexapp.js` - Provide store `{name: implementation}` pairs and Html.jsx.

```javascript
require('babel-polyfill');

module.exports = require('fluxex').createApp({
    product: require('./stores/product')
}, require('./components/Html.jsx'));
```

The Server
----------
edit `index.js` - Create an express server.

```javascript
// Init ES2015 + .jsx environments for .require()
require('babel-register');

var express = require('express');
var fluxexapp = require('./fluxexapp');
var pageAction = require('./actions/page');
var fluxexServerExtra = require('fluxex/extra/server');
var app = express();

// Provide /static/js/main.js
fluxexServerExtra.initStatic(app);

// Mount test page at /test
app.use('/test', fluxexServerExtra.createMiddlewareByAction(fluxexapp, pageAction));

// Start server
app.listen(3000);
console.log('Fluxex started on port 3000');
```

Create gulp task
----------------
edit `gulpfile.js` - Use the fluxex gulpfile extra.

```javascript
require('fluxex/extra/gulpfile');
```

copy a default eslint configs from fluxex.

```sh
cp node_modules/fluxex/.eslintrc .
```

**Start the server**

`gulp develop` then browse http://localhost:3001/test , click on the page to see React rendering!
