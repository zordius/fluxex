'use strict';

var querystring = require('querystring');

module.exports = {
    // All current page and location related things stay here.
    // We do not emitChange() in this store because this store should not trigger re-rendering directly.
    page: {
        handle_UPDATE_TITLE: function (title) {
            // Play DOM update here because title beyonds body
            if (this.get('title')) {
                /*global document*/
                document.getElementsByTagName('title')[0].innerHTML = title || this.get('title');
            }

            if (title) {
                this.set('title', title, true);
            }
        },
        handle_UPDATE_ROUTING: function (routing) {
            this.set('routing', routing, true);
        },
        handle_UPDATE_URL: function (url) {
            var M = url.match(/^(?:(https?:)\/\/(([^:/]+)(:[^\/]+)?))?([^#?]*)(\\?[^#]*)?(#.*)?$/),
                search = M[6] || '',
                hash = M[7] || '';

            this.set('url', {
                href: M[5] + search + hash,
                protocol:  M[1],
                host: M[2],
                hostname: M[3],
                port: M[4] || '',
                pathname: M[5] || '',
                search: search,
                hash: hash,
                query: querystring.decode(search.substring(1)) || {}
            }, true);
        },
        getURL: function (query) {
            var url = this.get('url'),
                mixedSearch = querystring.encode(Object.assign(url.query, query));

            /*global location*/
            return location.protocol + '//' + location.host + location.pathname + (mixedSearch ? '?' : '') + mixedSearch + location.hash;
        }
    },

    // All header > meta related things stay here.
    // We do not emitChange() in this store because this store should not trigger re-rendering directly.
    meta: {
        handle_UPDATE_META: function (meta) {
            this.set('meta', meta);
        },
        getMeta: function () {
            this.get('meta');
        }
    }
};
