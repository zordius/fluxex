'use strict';

module.exports = {
    handle_test: function (payload) {
        return 'OK';
    },
    getList: function () {
        return this.get('list');
    }
};
