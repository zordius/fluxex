'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),

Html = React.createClass({
    mixins: [Fluxex.mixin],

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body>
          <Product/>
         </body>
         <script src="/static/js/main.js"></script>
        </html> 
        );
    }
});

module.exports = Html;
