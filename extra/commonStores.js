'use strict';

var querystring = require('querystring');

module.exports = {
    // All current page and location related things stay here.
    // We do not emitChange() in this store because this store should not trigger re-rendering directly.
    page: {
        initialize: function () {
            this._set('routing', {});
            this._set('body', {});
            this._set('url', {});
        },

        // Title functions
        handle_UPDATE_TITLE: function (title) {
            // Play DOM update here because title beyonds body
            if (this._get('title')) {
                /*global document*/
                document.getElementsByTagName('title')[0].innerHTML = title || this._get('title');
            }

            if (title) {
                this._set('title', title);
            }
        },
        getTitle: function () {
            return this._get('title');
        },

        // Routing functions
        handle_UPDATE_ROUTING: function (routing) {
            this._set('routing', routing);
        },
        getRouteName: function () {
            return this._get('routing').name;
        },
        getRoutingParam: function () {
            return this._get('routing').params || {};
        },

        // Post body functions
        handle_UPDATE_BODY: function (body) {
            this._set('body', body);
        },
        getBody: function () {
            return this._get('body');
        },

        // URL functions
        handle_UPDATE_URL: function (payload) {
            var isPayloadString = ('string' == typeof payload),
                url = isPayloadString ? payload : payload.url,
                host = isPayloadString ? undefined : payload.host,
                M = url.match(/^(?:(https?:)\/\/(([^:/]+)(:[^\/]+)?))?([^#?]*)(\\?[^#]*)?(#.*)?$/),
                N = host ? host.match(/^(.+):(.+)$/) : [],
                search = M[6] || '',
                hash = M[7] || '';

            this._set('url', {
                href: M[5] + search + hash,
                protocol:  M[1] || '',
                host: M[2] || host || '',
                hostname: M[3] || N[1] || '',
                port: M[4] || N[2] || '',
                pathname: M[5] || '',
                search: search,
                hash: hash,
                query: querystring.decode(search.substring(1)) || {}
            });
        },
        getQuery: function () {
            return this._get('url').query;
        },
        getURL: function (query) {
            var url = this._get('url'),
                mixedSearch = querystring.encode(Object.assign(url.query, query));

            /*global location*/
            return location.protocol + '//' + location.host + location.pathname + (mixedSearch ? '?' : '') + mixedSearch + location.hash;
        },
        getParam: function (name) {
            return Object.assign({}, this.getRoutingParam(), this.getBody(), this.getQuery());
        }
    },

    // All header > meta related things stay here.
    // We do not emitChange() in this store because this store should not trigger re-rendering directly.
    meta: {
        handle_UPDATE_META: function (meta) {
            this._set('meta', meta);
        },
        getMeta: function () {
            return this._get('meta');
        }
    }
};
