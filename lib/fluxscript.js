'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react'),

FluxexInitScript = React.createClass({
    mixins: [require('./fluxmixin')],

    render: function () {
        var initScript = this._getContext().inited ? undefined : this._getInitScript();
        return React.DOM.div(
            {className: this.props.className || 'fluxex_hidden'},
            React.DOM.script({src: this.props.src || '/static/js/main.js'}),
            initScript ? React.DOM.script({dangerouslySetInnerHTML: {__html: initScript}}) : undefined
        );
    }
});

module.exports = FluxexInitScript;
