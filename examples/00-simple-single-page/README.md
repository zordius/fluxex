<img src="https://github.com/zordius/fluxex-examples/blob/master/00-simple-single-page/badge.png" />

How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/test?id=123
5. type these commands in console, enjoy!
  * change page title: `FluxexApp.dispatch('UPDATE_TITLE', 'this is another test');`
  * update product: `FluxexApp.dispatch('UPDATE_PRODUCT', {title: 'next', description: 'OK?!', price: 12345});`
  * the dark side: `FluxexApp.getStore('productStore').set('data.title', 'yes! you change the product title and it re-rendered!').emitChange();`

What's in this example
----------------------
* <a href="components/Html.jsx">Html.jsx</a> is the top level ract component with fluxex magic.
* <a href="actions/server.js">A server action</a> contains a start action to render the page.
* <a href="fluxexapp.js">fluxexapp.js</a> defined used stores and the top level react component.
* <a href="server.js">server.js</a> start an express server and use fluxex middleware to serve the sample page at /test.

IMPROVEMENTS
------------

* actions: check <a href="../02-routing/actions/">another example</a> to see well organized actions.
