var React = require('react'),
    Fluxex = require('fluxex'),

Product = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['productStore']}
    ],

    getStateFromStores: function () {
        return this.getStore('productStore').getProduct();
    },

    render: function () {
        return (
        <div>
         <h3>{this.state.title}</h3>
         <p>{this.state.description}</p>
         <span>Price:{this.state.price}</span>
         <ul>
          <li>data generated time:{this.state.time}</li>
          <li>Serial(random):{this.state.serial}</li>
         </ul>
         <h4>Related products</h4>
         <ul>
          <li><a href="/product/123">ID = 123</a></li>
          <li><a href="/product/456">ID = 456</a></li>
          <li><a href="/product/789">ID = 789</a></li>
         </ul>
        </div>
        );
    }
});

module.exports = Product;
