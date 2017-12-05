'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
    displayName: 'FluxexInitScript',

    mixins: [require('./fluxmixin')],

    render: function () {
        var initScript = this._getContext().inited ? undefined : ('var FluxexApp = new Fluxex(' + this._getContext().toString() + ');FluxexApp.initClient();');

        return React.createElement(
            'div',
            {className: this.props.className || 'fluxex_hidden'},
            ('production' !== process.env.NODE_ENV) ? React.createElement('script', {src: '/static/js/devcore.js'}) : undefined,
            React.createElement('script', {src: this.props.src || '/static/js/main.js'}),
            initScript ? React.createElement('script', {dangerouslySetInnerHTML: {__html: initScript}}) : undefined
        );
    }
});

