How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/main
5. click on any link of product

What's in this example
----------------------
* <a href="components/Html.jsx">Html.jsx</a> is the top level ract component with fluxex + history API magic.
* <a href="actions/server.js">A server action</a> contains a start action to render the page.
* <a href="fluxexapp.js">fluxexapp.js</a> defined used stores and the top level react component.
* <a href="server.js">server.js</a> start an express server and use fluxex middleware to serve the sample page at /product.

Used fluxex extra
-----------------
* <a href="fluxexapp.js">fluxexapp.js</a> use the `page` store from <a href="../../extra/commonStores.js">commonStores</a> , this store handled page loacion and title.
* <a href="components/Product.jsx">Product.jsx</a> use the `storechange` mixin from <a href="../../extra/storechange.js">storechange.js</a> , this mixin implements default `onStoreChange()` and `getInitialState()` behaviors rely on `getStateFromStores()` .
