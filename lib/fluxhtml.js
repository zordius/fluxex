'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var React = require('react');

module.exports = React.createClass({
    /**
     * Define displayName
     * @instance
     */
    displayName: 'FluxexContextedHtml',

    /**
     * Define required property for fluxex context receiving
     * @instance
     */
    propTypes: {
        fluxex: React.PropTypes.object.isRequired,
        html: React.PropTypes.func.isRequired
    },

    /**
     * Define property for fluxex context delivery
     * @instance
     */
    childContextTypes: {
        fluxex: React.PropTypes.object.isRequired
    },

    /**
     * Pass self context to children.
     * @protected
     * @instance
     * @return {Fluxex} The Fluxex application instance
     */
    getChildContext: function () {
        return {fluxex: this.props.fluxex};
    },

    /**
     * Change the owner of all children to self and pass context
     */
    render: function () {
        return React.createElement(this.props.html);
    }
});

