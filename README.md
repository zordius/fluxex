FluxEx
======

An extended Flux implement to build isomorphic javascript React app.

[![npm version](https://img.shields.io/npm/v/fluxex.svg)](https://www.npmjs.org/package/fluxex) [![Dependency Status](https://david-dm.org/zordius/fluxex.png)](https://david-dm.org/zordius/fluxex)  [![Build Status](https://travis-ci.org/zordius/fluxex.svg?branch=master)](https://travis-ci.org/zordius/fluxex) [![Test Coverage](https://codeclimate.com/github/zordius/fluxex/badges/coverage.svg)](https://codeclimate.com/github/zordius/fluxex) [![Code Climate](https://codeclimate.com/github/zordius/fluxex/badges/gpa.svg)](https://codeclimate.com/github/zordius/fluxex) [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE.txt)

Features
--------

**All in one Starter**

<a href="https://github.com/zordius/fluxex/blob/master/extra/gulpfile.js"><img src="https://raw.githubusercontent.com/zordius/fluxex/master/gulp_starter.jpg" /></a>

**Everything in React**

<a href="https://github.com/zordius/fluxex/blob/master/examples/04-infinite-scroll/components/Html.jsx"><img src="https://raw.githubusercontent.com/zordius/fluxex/master/start_from_html.jpg" /></a>

* [CORE] Super lightweight, less than 250 lines of code.
* [CORE] Context based flux system.
* [CORE] React Server side rendering + client mount.
* [CORE] HTML as top level react component, no need container.
* [EXTRA] express middleware helper functions.
* [EXTRA] full integrated gulp task for development.
* [EXTRA] pjax support.

See the Fluxex Magic
--------------------

* Check <a href="https://github.com/zordius/fluxex/tree/master/examples">example projects</a> you can see how fluxex do server side rendering + context deliver + Full HTML react rendering!

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
* the dispatched `FOOBAR` action will trigger all stores with `handle_FOOBAR` method under the Fluxex instance.

**Store**
* Store is an instance, it is constructed by serialized status.
* Store is created by a Fluxex object automatically.
* Store naming and prototype information are provided by the `.stores` property of Fluxex instance.
* Use `.getStore(name)` to get the store by name from an Fluxex instance.

Start from Scratch
------------------

Read <a href="https://github.com/zordius/fluxex/blob/master/SCRATCH.md">Start from Scratch</a> to know how to create a fluxex application!

Quick Start
-----------

**Prepare your project**
```sh
npm init
npm install fluxex
```

**Use the Starter template**
```sh
node_modules/.bin/fluxex_starter
```

**Start the Server**
```sh
node_modules/.bin/gulp develop
```

* Connect to http://localhost:3001/search?q=pizza
* You can start your development now, gulp handled everything (lint, bundle, restart, browsersync).
