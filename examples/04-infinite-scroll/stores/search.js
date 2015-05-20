'use strict';

module.exports = {
    initialize: function () {
        this._set('data', {keyword: undefined, items: []});
    },
    handle_UPDATE_SEARCH_RESULT: function (data) {
        var old_data = this._get('data');

        if (old_data.keyword !== data.keyword) {
            this._set('data', data);
        } else {
            old_data.items = old_data.items.concat(data.items);
        }

        this.emitChange();
    },

    handle_UPDATE_APPENDING: function (bool) {
        this._set('appending', bool);
        this.emitChange();
    },

    getSearchData: function () {
        var data = this._get('data');
        data.appending = this._get('appending');
        return data;
    }
};
