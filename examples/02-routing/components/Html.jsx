'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),
    TopProducts = require('./TopProducts.jsx'),

Routing = {
    top: <TopProducts />,
    product: <Product />
},

Html = React.createClass({
    mixins: [
        Fluxex.mixin
    ],

    getInitialState: function () {
        return {
            route_name: this.getStore('page').get('routing.name'),
            no_historyapi: true
        };
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
          {Routing[this.state.route_name]}
          <hr />
          <a href="/main">Go to Main...</a>
         </body>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this._getInitScript()}}></script>
        </html> 
        );
    }
});

module.exports = Html;
