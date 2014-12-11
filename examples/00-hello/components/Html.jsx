'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
    ],

    getInitialState: function () {
        return {
            title: this.getStore('page').get('title'),
            product: this.getStore('product').getData()
        };
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.state.title}</title>
         </head>
         <body>
          <h1>Hello!!</h1>
          <ul>
           <li>Product: {this.state.product.title}</li>
           <li>Price: {this.state.product.price}</li>
          </ul>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this.getInitScript()}}></script>
         </body>
        </html>
        );
    }
});

module.exports = Html;
