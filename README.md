fluxex
======

An extended flux implement for both server/client side.

[![npm version](https://img.shields.io/npm/v/fluxex.svg)](https://www.npmjs.org/package/fluxex) [![Dependency Status](https://david-dm.org/zordius/fluxex.png)](https://david-dm.org/zordius/fluxex)  [![Build Status](https://travis-ci.org/zordius/fluxex.svg?branch=master)](https://travis-ci.org/zordius/fluxex) [![Test Coverage](https://codeclimate.com/github/zordius/fluxex/badges/coverage.svg)](https://codeclimate.com/github/zordius/fluxex) [![Code Climate](https://codeclimate.com/github/zordius/fluxex/badges/gpa.svg)](https://codeclimate.com/github/zordius/fluxex) [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

See the Fluxex Magic
--------------------

Check <a href="examples">example projects</a> you can see how fluxex do server side rendering + context deliver + Full HTML react rendering!

So far we do not include these in the example, but ....coming soon!

* extra for service middleware
* example to cache the service
* example to cancel previous service call

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

Usage
-----

**Define your app**

Provide store `{name: implementation}` pairs and Html.jsx location (<a href="https://github.com/zordius/fluxex/blob/master/examples/02-routing/fluxexapp.js">example</a>):
```javascript
'use strict';

var commonStores = require('fluxex/extra/commonStores');

module.exports = require('fluxex').createApp({
    page: commonStores.page,
    productStore: require('./stores/product')
}, process.cwd() + '/components/Html.jsx');
```

.... to be continue ...
