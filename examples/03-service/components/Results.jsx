var React = require('react'),
    Fluxex = require('fluxex'),

Product = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['search']}
    ],

    getStateFromStores: function () {
        return this.getStore('search').get('data');
    },

    render: function () {
        var hits = [], I, P;

        if (this.state.total === 0) {
            return (
            <div>Not Found!</div>
            );
        }

        for (I in this.state.hits) {
            P = this.state.hits[I];
            hits.push(<li><h5>{P.ec_title}</h5><img src={P.ec_image} /><p>{P.ec_hotsale_title}</p><span>Price: ${P.ec_price}</span></li>);
        }

        return (
        <div>
         <h1>Search keyword: '{this.state.keyword}'</h1>
         <h3>found {this.state.total} results</h3>
         <ul>{hits}</ul>
        </div>
        );
    }
});

module.exports = Product;
