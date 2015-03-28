'use strict';

var stringify = function (V) {
    var circ = [];

    var core = function (V) {
        if ((typeof V === 'number') || (typeof V === 'boolean')) {
            return V;
        }

        if (V === null) {
            return 'null';
        }

        if (V === undefined) {
            return 'undefined';
        }

        if (V instanceof Date) {
            return 'new Date(' + V.toISOString() + ')';
        }

        if (Array.isArray(V)) {
            return '[' + V.map(function (v) {
                return core(v);
            }).join(',') + ']';
        }

        if (V === Object(V)) {
            if (circ.indexOf(V) > -1) {
                return '"[CIRCULAR!]"';
            }

            circ.push(V);

            return '{' + Object.keys(V).map(function (k) {
                return core(k) + ':' + core(V[k]);
            }).join(',') + '}';
        }

        return JSON.stringify(V);
    };

    return core(V);
};

/**
 * FluxexObject is an object can be serialized and be constructed with the serialized status.
 * @class
 * @param {Object=} state - Serialized state
 */
var FluxexObject = function FluxexObject(state) {
    var copy = {};

    if ((state !== null) && ('object' === typeof state)) {
        this._context = state;
    } else {
        this._context = {};
    }
    
    if ('function' === typeof this.initialize) {
        Object.assign(copy, state);
        this.initialize();
        Object.assign(this._context, copy);
    }

};

Object.assign(FluxexObject.prototype,
/** @lends FluxexObject# */
{
    /**
     * Get a value or an object by name
     * @param {String} name - a simple key name
     * @return {Object|Number|String|Null} the value
     */
    _get: function (name) {
        return this._context[name];
    },

    /**
     * Restore the FluxexObject status by provided status object
     * @param {Object} state - the status to restore
     */
    _restore: function (state) {
        this._context = state;
    },

    /**
     * Set value by name
     * @param {String} name - a simple key name or json path
     * @return {FluxexObject} Self
     */
    _set: function (name, value) {
        this._context[name] = value;
        return this;
    },

    /**
     * Get serialized state
     * @return {String} A JSON string of current status
     */
    toString: function () {
        return stringify(this._context);
    }
});

module.exports = FluxexObject;
