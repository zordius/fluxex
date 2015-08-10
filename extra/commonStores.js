var querystring = require('querystring');
var fluxex = require('fluxex');

module.exports = {
    // All current page and location related things stay here.
    // We do not emitChange() in this store because this store should not trigger re-rendering directly.
    // set fluxex.protocol to override default url.protocol
    // set fluxex.hostname to override default url.hostname
    // set fluxex.port to override default url.port
    page: {
        initialize: function () {
            this._set('routing', {});
            this._set('body', {});
            this._set('url', {});
        },

        // Title functions
        handle_UPDATE_TITLE: function (title) {
            this._set('title', title);
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
                M = url.match(/^(?:(https?:)\/\/(([^:\/]+)(:([^\/]+))?))?([^#?]*)(\\?[^#]*)?(#.*)?$/),
                N = host ? host.match(/^([^:]+)(:(.+))?$/) : [],
                search = M[7] || '',
                hash = M[8] || '',
                URL = {
                    href: M[6] + search + hash,
                    protocol: fluxex.protocol || M[1] || '',
                    hostname: fluxex.hostname || M[3] || N[1] || '',
                    port: fluxex.port || M[5] || N[3] || '',
                    pathname: M[6] || '',
                    search: search,
                    hash: hash,
                    query: querystring.decode(search.substring(1)) || {}
                };

            URL.host = URL.hostname + ((URL.port !== '') ? (':' + URL.port) : '');

            this._set('url', URL);
        },
        getQuery: function () {
            return this._get('url').query;
        },
        getURL: function (query) {
            var url = this._get('url'),
                mixedSearch = querystring.encode(Object.assign(url.query, query));

            return encodeURIComponent(url.protocol + '//' + url.host + url.pathname + (mixedSearch ? '?' : '') + mixedSearch + url.hash);
        },
        getParam: function () {
            if ('production' !== process.env.NODE_ENV) {
                if (console && console.warn) {
                    console.warn('pageStore.getParam() is deplicated, plase rename to pageStore.getParams()');
                }
            }
            return Object.assign({}, this.getRoutingParam(), this.getBody(), this.getQuery());
        },
        getParams: function () {
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
