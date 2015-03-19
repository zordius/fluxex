'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react'),

FluxexInitScript = React.createClass({
    mixins: [require('./fluxmixin')],

    render: function () {
        return React.DOM.div(
            {className: this.props.className || 'fluxex_hidden'},
            React.DOM.script({src: this.props.src || '/static/js/main.js'}),
            React.DOM.script({dangerouslySetInnerHTML: {__html: this._getInitScript()}})
        );
    }
});

module.exports = FluxexInitScript;
