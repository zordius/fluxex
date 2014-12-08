'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),
    TopProducts = require('./TopProducts.jsx'),

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
        var body;

        switch (this.state.route_name) {
        case 'top':
            body = <TopProducts />;
            break;
        case 'product':
            body = <Product />;
            break;
        }

        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          {body}
          <hr />
          <a href="/main">Go to Main...</a>
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
