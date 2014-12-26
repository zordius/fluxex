'use strict';

module.exports = {
    handle_test: function (payload) {
        return 'OK';
    },
    handle_dispatch: function (payload) {
        return payload.dispatch('more_dispatch');
    },
    handle_SAMPLE: function (payload) {
        this.set('c', payload, true);
        this.emitChange();
    },
    getList: function () {
        return this.get('list');
    }
};
