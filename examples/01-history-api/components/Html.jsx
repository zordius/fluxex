'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),
    sampleActions = require('../actions/sample'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['page']}
    ],

    shouldComponentUpdate: function () {
        return true; //false;
    },

    getStateFromStores: function () {
        return {};
    },

    handleClickLink: function (E) {
        var HREF = E.target.href,
            self = this;

        if (!HREF || HREF.match(/#/)) {
            return;
        }

        E.preventDefault();
        E.stopPropagation();

        // Store original state 1 time
        if (!this._initHistoryState) {
            this._initHistoryState = this._getContext().toString();
        }

        // Go to the url
        this._getContext().dispatch('UPDATE_URL', HREF).then(function () {
            // Run action to update page stores
            return this.executeAction(sampleActions.updateProductPage);
        }).then(function () {
            // Success, update url
            /*global history*/
            history.pushState(null, self._getContext().toString(), HREF);
        });
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <Product />
         </body>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this._getInitScript()}}></script>
<script>
</script>
        </html> 
        );
    }
});

module.exports = Html;
