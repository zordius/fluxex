'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
    displayName: 'FluxexTitle',

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
        if (this.title === undefined) {
            this.title = this.state.title;
        } else {
            /*global document*/
            document.title = this.state.title;
        }
        return React.createElement('title', null, this.title);
    }
});

