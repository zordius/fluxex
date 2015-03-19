'use strict';

var react = require('react');

module.exports = {
    /**
     * Server side render HTML by executing an action with payload.
     * @param {Function} action - An action to prepare a page
     * @param {Object=} payload
     * @return {String} Rendered HTML
     */
    renderHtml: function (action, payload) {
        return this.executeAction(action, payload).then(function () {
            return react.renderToString(this.getContextedHtml());
        }.bind(this));
    },

    /**
     * Get request header, this should be used for server side rendering only.
     */
    _getHeader: function (name) {
        return this._headers ? this._headers[name] : undefined;
    }
};
