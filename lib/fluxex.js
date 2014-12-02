var objectAssign = require('object-assign'),

Fluxex = function (cfg) {
    this._context = {};
    objectAssign(this._context, cfg);
};

Fluxex.prototype = {
    get: function (name) {
        return this._context[name];
    },
    set: function (name, value) {
        this._context[name] = value;
    },
    toString: function () {
        return 'new Fluxex(' + JSON.stringify(this._context) + ')';
    }
};

module.exports = Fluxex;
