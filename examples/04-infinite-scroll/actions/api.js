var yql = require('./yql');

var log = function () {
    try {
        console.log.apply(console, arguments);
    } catch (E) {
        // do nothing
    }
};

var api = {
    search: function (payload) {
        var start = payload.p * 1 || 0,
            count = 20,
            keyword = payload.q,
            self = this;

        if (!keyword) {
            return Promise.resolve({});
        }

        return this.executeAction(yql, 'SELECT * FROM search.ec (' + (start + 1) + ', ' + count + ') WHERE keyword="' + keyword + '" and property="shopping"').then(function (O) {
            return self.dispatch('UPDATE_SEARCH_RESULT', {
                keyword: keyword,
                offset: start,
                items: (O && O.result && O.result.hits) ? O.result.hits : null
            });
        });
    },

    load_more: function () {
        log('load more start!');
        this.dispatch('UPDATE_APPENDING', true);
        return this.executeAction(api.search, {
            q: this.getStore('page').getQuery().q,
            p: this.getStore('search').getSearchData().items.length
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
