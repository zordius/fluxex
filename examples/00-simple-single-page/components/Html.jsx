'use strict';

var React = require('react');
var Fluxex = require('fluxex');
var Product = require('./Product.jsx');
var Sample = require('./Sample.jsx');

var Html = React.createClass({
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
