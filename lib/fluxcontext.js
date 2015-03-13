'use strict';

/**
 * @external ReactComponent
 * @see {@link http://facebook.github.io/react/docs/component-api.html}
 */
var react = require('react'),

/**
 * A React component mixin to provide Fluxex context container
 * @mixin
 * @mixes external:ReactComponent
 */
FluxexContextMixin = {
    /**
     * Define required property for fluxex context receiving
     * @instance
     */
    propTypes: {
        fluxex: react.PropTypes.object.isRequired
    },

    /**
     * Define property for fluxex context delivery
     * @instance
     */
    childContextTypes: {
        fluxex: react.PropTypes.object.isRequired
    },

    /**
     * Pass self context to children.
     * @protected
     * @instance
     * @return {Fluxex} The Fluxex application instance
     */
    getChildContext: function () {
        return {fluxex: this.props.fluxex};
    }
};

module.exports = FluxexContextMixin;
