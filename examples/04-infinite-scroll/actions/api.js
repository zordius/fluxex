'use strict';

var yql = require('./yql');

module.exports = {
    search: function (payload) {
        var p = payload.p * 1 || 0,
            count = 20,
            start = p * count,
            keyword = payload.q,
            self = this;

        if (!keyword) {
            return this.resolvePromise({});
        }

        return yql('select * from youtube.search(' + start + ',10) where query="' + keyword + '"').then(function (O) {
            return self.dispatch('UPDATE_SEARCH_RESULT', {
                keyword: keyword,
                offset: start,
                videos: O.video
            });
        });
    }
};
