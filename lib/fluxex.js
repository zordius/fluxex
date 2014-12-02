var objectAssign = require('object-assign'),
    promise = require('promise'),
    jpp = require('json-path-processor'),

Fluxex = function (cfg) {
    this._context = {
        states: {},
        isDispatching: false,
        currentAction: undefined
    };
    this._stores = {};
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
    },
    addStore: function (name, store, states) {
    },
    dispatch: function (name, payload) {
        var self = this;
        return new promise(function (resolve) {
            if (this.get('isDispatching')) {
                throw new Error('Can not dispatch "' + name + '" action when previous "' + this.get('currentAction') + '" action is not done!');
            }

            this.set('isDispatching', true);
        });
    }
};

module.exports = Fluxex;
