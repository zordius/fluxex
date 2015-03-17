'use strict';

var yql = require('./yql'),

log = function () {
    try {
        console.log.apply(console, arguments);
    } catch (E) {
        // do nothing
    }
},

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
        log('load more start!');
        this.dispatch('UPDATE_APPENDING', true);
        return this.executeAction(api.search, {
            q: this.getStore('page').getQuery().q,
            p: this.getStore('search').getSearchData().videos.length
        }).then(function () {
            log('load more successed~');
            this.dispatch('UPDATE_APPENDING', false);
        }.bind(this), function () {
            log('load more failed.');
            this.dispatch('UPDATE_APPENDING', false);
        }.bind(this));
    }
};

module.exports = api;
