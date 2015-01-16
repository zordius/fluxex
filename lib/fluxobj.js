'use strict';

/**
 * FluxexObject is an object can be serialized and be constructed with the serialized status.
 * @class
 * @param {Object=} state - Serialized state
 */
var FluxexObject = function FluxexObject(state) {
    this._context = state || {};
};

Object.assign(FluxexObject.prototype,
/** @lends FluxexObject# */
{
    /**
     * Get a value or an object by name
     * @param {String} name - a simple key name
     * @return {Object|Number|String|Null} the value
     */
    get: function (name) {
        return this._context[name];
    },
    /**
     * Restore the FluxexObject status by provided status object
     * @param {Object} state - the status to restore
     */
    restore: function (state) {
        this._context = state;
    },

    /**
     * Set value by name
     * @param {String} name - a simple key name or json path
     * @return {FluxexObject} Self
     */
    set: function (name, value) {
        this._context[name] = value;
        return this;
    },

    /**
     * Get serialized state
     * @return {String} A JSON string of current status
     */
    toString: function () {
        return JSON.stringify(this._context);
    }
});

module.exports = FluxexObject;
