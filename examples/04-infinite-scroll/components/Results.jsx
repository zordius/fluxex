var React = require('react');
var Fluxex = require('fluxex');
var apis = require('../actions/api');

var Results = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        {listenStores: ['search']}
    ],

    componentDidMount: function() {
        /*global window,document*/
        window.addEventListener('scroll', this.handleScroll, false);
    },

    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.handleScroll, false);
    },

    getStateFromStores: function () {
        return this.getStore('search').getSearchData();
    },

    handleScroll: function () {
        var ie8;

        if (this.state.appending) {
            return;
        }

        if (window.pageYOffset === undefined) {
            ie8 = window.document.documentElement;
        }

        if ((ie8 ? ie8.scrollTop : window.pageYOffset) + (ie8 ? ie8.clientHeight : window.innerHeight) * 3 > document.body.offsetHeight) {
            this.executeAction(apis.load_more);
        }
    },

    render: function () {
        var items = [],
            all = this.state.items ? this.state.items.length : 0;

        if (!all) {
            return (
               <h1>Search keyword: '{this.state.keyword}' not found!</h1>
            );
        }

        items = this.state.items.map(function (V) {
            var img = V.ec_image ? <img src={V.ec_image} /> : undefined;

            return (
            <li key={V.ec_productid}>
             <h5><a href={V.ec_item_url}>{V.ec_title}</a></h5>
             <a href={V.ec_item_url}>{img}</a>
            </li>
            );
        });

        return (
        <div>
         <h1>Search keyword: '{this.state.keyword}'</h1>
         <ul>{items}</ul>
        </div>
        );
    }
});

module.exports = Results;
