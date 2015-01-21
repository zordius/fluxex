'use strict';

module.exports = {
    handle_UPDATE_SAMPLE: function (v) {
        this._set('c', v);
        this.emitChange();
    }
};
