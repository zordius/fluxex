'use strict';

module.exports = {
    initialize: function () {
        this.set('q', 'OK!');
    },
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
