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

    getStateFromStores: function () {
        return {};
    },

    componentDidMount: function () {
        /*global window,document*/
        var blockDoublePop = (document.readyState != 'complete'),
            initState = this._getContext().toString(),
            initUrl = window.location.href,
            self = this;

        if (!window.addEventListener) {
            return;
        }

        window.addEventListener('load', function() {
            setTimeout(function () {
                blockDoublePop = false;
            }, 1);
        });

        window.addEventListener('popstate', function (E) {
            var state = E.state || ((window.location.href === initUrl) ? initState : undefined);

            if (blockDoublePop && (document.readyState === 'complete')) {
                return;
            }

            if (!state) {
                return console.log('NO STATE DATA....can not handle re-rendering');
            }

            // Ya, trigger page restore by an anonymous action
            self.executeAction(function () {
                    this.restore(JSON.parse(state));
                    this.dispatch('UPDATE_TITLE');
                    this.getStore('productStore').emitChange();
                    return this.resolvePromise(true);
            });
        });
    },

    handleClickLink: function (E) {
        var HREF = E.target.href,
            self = this;

        if (!HREF || HREF.match(/#/)) {
            return;
        }

        E.preventDefault();
        E.stopPropagation();

        // Go to the url
        this._getContext().dispatch('UPDATE_URL', HREF).then(function () {
            // Run action to update page stores
            return self.executeAction(sampleActions.updateProductPage);
        }).then(function () {
            // Success, update url to history
            /*global history*/
            history.pushState(self._getContext().toString(), undefined, HREF);
        });
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <div>
           <Product />
          </div>
          <script src="http://cdn.jsdelivr.net/polyfills/polyfill.js"></script>
          <script src="/static/js/main.js"></script>
          <script dangerouslySetInnerHTML={{__html: this.getInitScript()}}></script>
         </body>
        </html> 
        );
    }
});

module.exports = Html;
