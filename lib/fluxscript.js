'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react');

module.exports = React.createClass({
    displayName: 'FluxexInitScript',

    mixins: [require('./fluxmixin')],

    render: function () {
        var initScript = this._getContext().inited ? undefined : ('var FluxexApp = new Fluxex(' + this._getContext().toString() + ');FluxexApp.initClient();');

        return React.DOM.div(
            {className: this.props.className || 'fluxex_hidden'},
            ('production' !== process.env.NODE_ENV) ? React.DOM.script({src: '/static/js/devcore.js'}) : undefined,
            React.DOM.script({src: this.props.src || '/static/js/main.js'}),
            initScript ? React.DOM.script({dangerouslySetInnerHTML: {__html: initScript}}) : undefined
        );
    }
});

