fluxex
======

An extended flux implement to do react HTML component server/client side rendering.

[![npm version](https://img.shields.io/npm/v/fluxex.svg)](https://www.npmjs.org/package/fluxex) [![Dependency Status](https://david-dm.org/zordius/fluxex.png)](https://david-dm.org/zordius/fluxex)  [![Build Status](https://travis-ci.org/zordius/fluxex.svg?branch=master)](https://travis-ci.org/zordius/fluxex) [![Test Coverage](https://codeclimate.com/github/zordius/fluxex/badges/coverage.svg)](https://codeclimate.com/github/zordius/fluxex) [![Code Climate](https://codeclimate.com/github/zordius/fluxex/badges/gpa.svg)](https://codeclimate.com/github/zordius/fluxex) [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

Features
--------

* [CORE] Super lightweight, less than 300 lines of code.
* [CORE] Context based flux system.
* [CORE] React Server side rendering + client mount.
* [CORE] render HTML as top level react component, do not need container.
* [EXTRA] express middleware helper functions.
* [EXTRA] full integrated gulp task for development.
* [EXTRA] pjax support.

See the Fluxex Magic
--------------------

Check <a href="examples">example projects</a> you can see how fluxex do server side rendering + context deliver + Full HTML react rendering!

So far we do not include these in the example, but ....coming soon!

* extra for service middleware.
* example to cache the service.
* example to cancel previous service call.

Difference with Flux
--------------------

Fluxex is context based flux implemention. Server side react rendering can be done easy when the flux is scoped under a request based context. Store and dispatcher are singletons in <a href="https://github.com/facebook/flux">Facebook flux</a>, but in fluxex they are not.

**Fluxex**
* Fluxex is an instance, it is constructed by provided context.
* Fluxex can be serialized by `.toString()` and reconstructed by the serialized string. All server side store status can be transfered to client side by this way.

**Action**
* An action creator should return a promise.
* An action creator function can be executed with `.executeAction()` method under a Fluxex instance.
* When the action be `.executeAction()`, the Fluxex instance can be referenced by `this`.
* `.executeAction()` will return a promise, so you can manage asynchronous actions in promise way.

**Dispatcher**
* the Fluxex instance itself is a dispatcher with `.dispatch()` method.
* the dispatched `FOOBAR` action will trigger all stores with `handleFOOBAR` method under the Fluxex instance.

**Store**
* Store is an instance, it is constructed by serialized status.
* Store is created by a Fluxex object automatically.
* Store naming and prototype information are provided by the `.stores` property of Fluxex instance.
* Use `.getStore(name)` to get the store by name from an Fluxex instance.

Quick Start!
------------

**Prepare the project**

`npm install fluxex`

**Create Action**
[actions/page.js] Define your action

```javascript
'use strict';

module.exports = function () {
    return this.dispatch('UPDATE_TITLE', 'HELLO!');
};
```

**Create Store**

[stores/product.js] Define your store API

```javascript
'use strict';

module.exports = {
    getData: function () {
        return {
            title: 'sample product',
            price: 12345
        };
    }
};
```

**Define your app**

[fluxexapp.js] Provide store `{name: implementation}` pairs and Html.jsx location
```javascript
'use strict';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    product: require('./stores/product'),                                                
    page: commonStores.page
}, process.cwd() + '/components/Html.jsx');
```

**Create HTML**

[components/Html.jsx] Define your page as react component

```
'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),

Html = React.createClass({
    mixins: [ Fluxex.mixin ],

    getInitialState: function () {
        return {
            title: this.getStore('page').get('title'),
            product: this.getStore('product').getData(),
            count: 0
        };
    },
    handleClick: function () {
        this.setState({count: this.state.count + 1});
    },
    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.state.title}</title>
         </head>
         <body onClick={this.handleClick}>
          <h1>Hello!! {this.state.count}</h1>
          <ul>
           <li>Product: {this.state.product.title}</li>
           <li>Price: {this.state.product.price}</li>
          </ul>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this.getInitScript()}}></script>
         </body>
        </html>
        );
    }
});

module.exports = Html;
```
