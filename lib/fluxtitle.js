'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react'),

FluxexTitle = React.createClass({
    mixins: [
        require('./fluxmixin'),
        require('../extra/storechange'),
        {listenStores: ['page']}
    ],

    getStateFromStores: function () {
        return {
            title: this.getStore('page').getTitle()
        };
    },

    render: function () {
        // prevent IE8 title.innerHTML update bug
        if (this.title == undefined) {
            this.title = this.state.title;
        } else {
            document.title = this.state.title;
        }
        return React.DOM.title(null, this.title);
    }
});

module.exports = FluxexTitle;
