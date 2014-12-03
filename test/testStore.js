'use strict';

module.exports = {
    handle_test: function (payload) {
        return 'OK';
    },
    handle_dispatch: function (payload) {
        payload.dispatch('more_dispatch');
    },
    getList: function () {
        return this.get('list');
    }
};
