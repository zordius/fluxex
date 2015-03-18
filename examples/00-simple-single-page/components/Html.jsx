'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),
    Sample = require('./Sample.jsx'),

Html = React.createClass({
    mixins: [Fluxex.mixin],

    shouldComponentUpdate: function () {
        return false;
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <Fluxex.Title />
         </head>
         <body>
          <div>Test...OK??.</div>
          <Product />
          <Sample />
          <Fluxex.InitScript />
         </body>
        </html> 
        );
    }
});

module.exports = Html;
