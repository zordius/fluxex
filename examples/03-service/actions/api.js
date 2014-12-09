'use strict';

var yql = require('../services/yql');

module.exports = {
    search: function (payload) {
        var p = payload.p * 1 || 0,
            start = p * 10,
            keyword = payload.q,
            self = this;

        if (!keyword) {
            return this.resovePromise({});
        }

        return yql('SELECT * FROM search.ec (' + start + ', 10) WHERE keyword="' + keyword + '" and property="shopping"').then(function (O) {
            return self.dispatch('UPDATE_SEARCH_RESULT', {
                keyword: keyword,
                total: O.result.total,
                offset: start,
                hits: O.result.hits
            });
        });
    }
};
