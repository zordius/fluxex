var React = require('react');
var Fluxex = require('fluxex');
var createReactClass = require('create-react-class');

var Html = createReactClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['product']}
    ],

    getStateFromStores: function () {
        return this.getStore('product').getData();
    },

    handleClick: function () {
        var product = this.state;
        product.sold++;
        this.executeAction(function () {
            return this.dispatch('UPDATE_PRODUCT', product);
        });
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
         </head>
         <body onClick={this.handleClick}>
          <ul>
           <li>{'Product: ' + this.state.title}</li>
           <li>{'Price: ' + this.state.price}</li>
           <li>{'Sold: ' + this.state.sold}</li>
          </ul>
         <Fluxex.InitScript />
         </body>
        </html>
        );
    }
});

module.exports = Html;
