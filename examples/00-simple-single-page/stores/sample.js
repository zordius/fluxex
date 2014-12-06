'use strict';

module.exports = {
    handle_UPDATE_SAMPLE: function (v) {
        this.set('c', v, true);
        this.emitChange();
    }
};
