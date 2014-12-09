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
        return (
        <form>
         <input type="text" value={this.state.keyword} />
         <input type="submit" value="Search!" />
        </form>
        );
    }
});

module.exports = Product;
