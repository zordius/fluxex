'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    InitScript = Fluxex.InitScript,
    FluxexTitle = Fluxex.Title,
    Product = require('./Product.jsx'),
    TopProducts = require('./TopProducts.jsx'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        require('fluxex/extra/pjax'),
        {listenStores: ['page']}
    ],

    getStateFromStores: function () {
        return {
            route_name: this.getStore('page').getRouteName()
        };
    },

    render: function () {
        var Routing = {
            top: <TopProducts />,
            product: <Product />
        },
        body = Routing[this.state.route_name];

        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <FluxexTitle />
         </head>
         <body onClick={this.handleClickLink}>
          <div>
           {body}
          </div>
          <hr />
          <a href="/main">Go to Main...</a>
          <InitScript />
         </body>
        </html> 
        );
    }
});

module.exports = Html;
