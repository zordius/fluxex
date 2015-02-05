<img src="https://github.com/zordius/fluxex-examples/blob/master/03-service/badge.png" />

How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/search?q=pizza
5. click the inputbox and search anything, enjoy the pjax! You can also click on sample search links to see the pjax.

What's in this example
----------------------
* <a href="components/Html.jsx">Html.jsx</a> is the top level ract component with fluxex magic.
* <a href="fluxexapp.js">fluxexapp.js</a> defined used stores and the top level react component. And, it extends 2 methods for routing.
* <a href="server.js">server.js</a> start an express server and use fluxex middleware to serve sample pages with a routing action. And, it add a middleware to handle service request.
* <a href="actions/routing.js">routing.js</a> uses the <a href="https://github.com/aaronblohowiak/routes.js">npm:routes.js</a> to pick correct page action. There is only 1 page be defined in this example.
* <a href="actions/page.js">page.js</a> contains all page actions. There is only 1 page be defined in this example.
* <a href="services/fetch.js">fetch.js</a> wraps <a href="https://github.com/request/request">npm:request</a> call url, it use a trick to prevent api server name be exposed to client side.

Used fluxex extra
-----------------
* <a href="fluxexapp.js">fluxexapp.js</a> use the `page` store from <a href="../../extra/commonStores.js">commonStores</a> , this store maintains page location, title, and routing information. And it used the <a href="../../extra/routeToURL.js">routeToURL()</a> extra function to handle pjax.
* <A href="components/Html.jsx">Html.jsx</a> use the `pjax` mixin from <a href="../../extra/pjax.js">pjax.js</a> , this mixin implements default `componentDidMount()` and `handleClickLink()` to provide pjax behaviors.
* <a href="components/SearchBox.jsx">SearchBox.jsx</a> and <a href="components/Results.jsx">Results.jsx</a> use the `storechange` mixin from <a href="../../extra/storechange.js">storechange.js</a> , this mixin implements default `onStoreChange()` and `getInitialState()` behaviors rely on `getStateFromStores()` .
