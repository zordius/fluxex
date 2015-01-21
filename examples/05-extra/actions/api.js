'use strict';

var yql = require('./yql'),

api = {
    search: function (payload) {
        var start = payload.p * 1 || 0,
            count = 20,
            keyword = payload.q,
            self = this;

        if (!keyword) {
            return Promise.resolve({});
        }

        return yql('select * from youtube.search where query="' + keyword + '" and start_index=' + (start + 1) + ' and max_results=' + count).then(function (O) {
            return self.dispatch('UPDATE_SEARCH_RESULT', {
                keyword: keyword,
                offset: start,
                videos: (O && O.video) ? O.video : null
            });
        });
    },
    load_more: function () {
        return this.executeAction(api.search, {
            q: this.getStore('page').getQuery().q,
            p: this.getStore('search').getSearchData().videos.length
        });
    }
};

module.exports = api;
