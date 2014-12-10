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

    handleChange: function (E) {
        this.setState({keyword: E.target.value});
        this._getContext().routeToURL(this.getStore('page').getUrl({q: E.target.value}));
    },

    render: function () {
        return (
        <form>
         <input type="text" onChange={this.handleChange} value={this.state.keyword} />
         <input type="submit" value="Search!" />
        </form>
        );
    }
});

module.exports = Product;
