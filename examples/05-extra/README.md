<img src="badge.png" />

How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/search?q=pizza
5. click the inputbox and search anything, enjoy the pjax!
6. scroll down, enjoy infinite scroll!

What's in this example
----------------------
* <a href="components/Html.jsx">Html.jsx</a> is the top level ract component with fluxex magic.
* <a href="components/Results.jsx">Results.jsx</a> showed search results, and handle infinite scroll.
* <a href="fluxexapp.js">fluxexapp.js</a> defined used stores and the top level react component. And, it defined routing config.
* <a href="server.js">server.js</a> start an express server and use fluxex middleware to serve sample pages with a routing action. And, it use an extra to handle api requests.
* <a href="actions/page.js">page.js</a> contains all page actions. There are 2 pages be defined in this example.

Used fluxex extra
-----------------
* <a href="fluxexapp.js">fluxexapp.js</a> use the `page` store from <a href="../../extra/commonStores.js">commonStores</a> , this store maintains page location, title, and routing information. And it used the <a href="../../extra/routing.js">routing</a> extra function to handle routing by configs.
* <A href="components/Html.jsx">Html.jsx</a> use the `pjax` mixin from <a href="../../extra/pjax.js">pjax.js</a> , this mixin implements default `componentDidMount()` and `handleClickLink()` to provide pjax behaviors.
* <a href="components/SearchBox.jsx">SearchBox.jsx</a> and <a href="components/Results.jsx">Results.jsx</a> use the `storechange` mixin from <a href="../../extra/storechange.js">storechange.js</a> , this mixin implements default `onStoreChange()` and `getInitialState()` behaviors rely on `getStateFromStores()` .
* <a href="server.js">server.js</a> use the `fetch` extra function to create fetch services.
* <a href="actions/yql.js">yql.js</a> use the `fetch` extra function to make request by service name.
