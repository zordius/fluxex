'use strict';

module.exports = {
    initialize: function () {
        this._set('data', {keyword: undefined, videos: []});
    },
    handle_UPDATE_SEARCH_RESULT: function (data) {
        var old_data = this._get('data');

        if (old_data.keyword !== data.keyword) {
            this._set('data', data);
        } else {
            old_data.videos = old_data.videos.concat(data.videos);
        }

        this.emitChange();
    },

    getSearchData: function () {
        return this._get('data');
    }
};
