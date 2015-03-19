'use strict';

var react = require('react');
var FluxexObject = require('./fluxobj');

module.exports = {
    /**
     * Rract.render() the HTML, this rebind all client side react events.
     */
    initClient: function () {
        /*global document*/
        react.render(this.getContextedHtml(), document.body.parentNode.parentNode);
        this.inited = true;
    },

    // jscs:disable checkRedundantParams
    /**
     * Restore the fluxex application status by provided state
     * @param {Object} states - the status to restore
     */
    // jscs:enable
    _restore: function () {
        var I, states;

        FluxexObject.prototype._restore.apply(this, arguments);
        states = this._get('stores');
        Object.keys(this._stores).forEach(function (I) {
            this._stores[I]._restore(states[I]);
        }.bind(this));
    }
};
