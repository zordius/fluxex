'use strict';

var yql = require('../services/yql.js');

module.exports = {
    search: function (payload) {
        var p = payload.p * 1 || 0,
            start = p * 10;

        if (!payload.q) {
            return this.resovePromise({});
        }

        return this.createPromise(yql('SELECT * FROM search.ec (' + start + ', 10) WHERE keyword="' + payload.q + '" and property="shopping"'));
    }
};
