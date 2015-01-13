'use strict';

var yql = require('../services/yql');

module.exports = {
    search: function (payload) {
        var p = payload.p * 1 || 0,
            start = p * 10,
            keyword = payload.q,
            self = this;

        if (!keyword) {
            return Promise.resolve({});
        }

        return yql('select * from local.search where zip="94085" and query="'+ keyword + '"').then(function (O) {
            return self.dispatch('UPDATE_SEARCH_RESULT', {
                keyword: keyword,
                offset: start,
                hits: O ? (O.Result.length ? O.Result : [O.Result]) : undefined
            });
        });
    }
};
