'use strict';

var jpp = require('json-path-processor'),

/**
 * FluxexObject is an object can be serialized and be constructed with the serialized status.
 * @class
 * @param {Object=} state - Serialized state
 */
FluxexObject = function FluxexObject(state) {
    this._context = state || {};
};

Object.assign(FluxexObject.prototype,
/** @lends FluxexObject# */
{
    /**
     * Get a value or an object by name
     * @param {String} name - a simple key name or json path
     * @return {Object|Number|String|Null} the value
     */
    get: function (name) {
        return jpp(this._context, name);
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
    set: function (name, value, cb) {
        jpp(this._context).set(name, value, (cb === undefined) ? true : cb);
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
