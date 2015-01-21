'use strict';

module.exports = {
    handle_UPDATE_SEARCH_RESULT: function (data) {
        this._set('data', data);
        this.emitChange();
    },

    getResult: function () {
        return this._get('data');
    },

    getQuery: function () {
        return {keyword: this._get('data').keyword};
    }
};
