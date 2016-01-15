var React = require('react');
var Fluxex = require('fluxex');

var TopProducts = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['productStore']}
    ],

    getStateFromStores: function () {
        return {list: this.getStore('productStore').getTop5()};
    },

    render: function () {
        var list = [],
            I;

        for (I=0;I<this.state.list.length;I++) {
            list.push(
                <li key={this.state.list[I].id}>
                    <a href={'product/' + this.state.list[I].id}>
                        <b>{this.state.list[I].title}</b>
                    </a>
                </li>);
        }

        list.push(<li key="00test"><a href="http://www.amazon.co.jp/product/111">Outsite Link</a></li>);
        
        return (
        <div>
         <h1>Main site</h1>
         <h3>top 5 products....</h3>
         <ul>{list}</ul>
        </div>
        );
    }
});

module.exports = TopProducts;
