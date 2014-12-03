'use strict';

var objectAssign = require('object-assign'),
    jpp = require('json-path-processor'),

FluxexObject = function FluxexObject(cfg) {
    this._context = cfg || {};
};

objectAssign(FluxexObject.prototype, {
    get: function (name) {
        return jpp(this._context, name);
    },
    set: function (name, value, cb) {
        jpp(this._context).set(name, value, cb);
        return this;
    },
    toString: function () {
        return JSON.stringify(this._context);
    }
});

module.exports = FluxexObject;
