How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/search?q=pizza
5. click the inputbox and search anything!

What's in this example
----------------------
* <a href="components/Html.jsx">Html.jsx</a> is the top level ract component with fluxex magic. A switch here to pick children components.
* <a href="fluxexapp.js">fluxexapp.js</a> defined used stores and the top level react component.
* <a href="server.js">server.js</a> start an express server and use fluxex middleware to serve sample pages with a routing action.
* <a href="actions/routing.js">routing.js</a> uses the <a href="https://github.com/aaronblohowiak/routes.js">npm:routes.js</a> to pick correct page action.
* <a href="actions/page.js">page.js</a> contains all page actions.

Used fluxex extra
-----------------
* <a href="fluxexapp.js">fluxexapp.js</a> use the `page` store from <a href="../../extra/commonStores.js">commonStores</a> , this store maintains page location, title, and routing information.
* <a href="components/Product.jsx">Product.jsx</a> use the `storechange` mixin from <a href="../../extra/storechange.js">storechange.js</a> , this mixin implements default `onStoreChange()` and `getInitialState()` behaviors rely on `getStateFromStores()` .
