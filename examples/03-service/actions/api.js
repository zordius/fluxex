'use strict';

var yql = require('../services/yql');

module.exports = {
    search: function (payload) {
        var p = payload.p * 1 || 0,
            start = p * 10,
            self = this;

        if (!payload.q) {
            return this.resovePromise({});
        }

        return yql('SELECT * FROM search.ec (' + start + ', 10) WHERE keyword="' + payload.q + '" and property="shopping"').then(function (O) {
            return {
                total: O.result.total,
                offset: start,
                hits: O.result.hits
            }
        });
    }
};
