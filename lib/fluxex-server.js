'use strict';

var ReactDOMServer = require('react-dom/server');

module.exports = {
    /**
     * Server side render HTML by executing an action with payload.
     * @param {Function} action - An action to prepare a page
     * @param {Object=} payload
     * @return {String} Rendered HTML
     */
    renderHtml: function (action, payload) {
        return this.executeAction(action, payload).then(function () {
            return ReactDOMServer.renderToString(this.getContextedHtml());
        }.bind(this));
    }
};
