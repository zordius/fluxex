var objectAssign = require('object-assign'),
    jpp = require('json-path-processor'),

Fluxex = function (cfg) {
    this._context = {};
    objectAssign(this._context, cfg);
};

Fluxex.prototype = {
    get: function (name) {
        return jpp(this._context, name);
    },
    set: function (name, value, cb) {
        jpp(this._context).set(name, value, cb);
    },
    toString: function () {
        return 'new Fluxex(' + JSON.stringify(this._context) + ')';
    }
};

module.exports = Fluxex;
