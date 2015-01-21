var React = require('react'),
    Fluxex = require('fluxex'),

Product = React.createClass({
    mixins: [
        Fluxex.mixin,
        {listenStores: ['productStore']}
    ],

    getStateFromStores: function () {
        return this.getStore('productStore')._get('data');
    },

    getInitialState: function () {
        return this.getStateFromStores();
    },

    onStoreChange: function () {
        this.setState(this.getStateFromStores());
    },

    render: function () {
        return (
        <div>
         <h3>{this.state.title}</h3>
         <p>{this.state.description}</p>
         <span>Price:{this.state.price}</span>
        </div>
        );
    }
});

module.exports = Product;
