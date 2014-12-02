var objectAssign = require('object-assign'),
    Fluxex = function (cfg) {
    return objectAssign(this, cfg);
};

Fluxex.prototype = {
    toString: function () {
        return 'new Fluxex(' + JSON.stringify(this) + ')';
    }
};

module.exports = Fluxex;
