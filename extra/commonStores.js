var querystring = require('querystring');
var fluxex = require('..');

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
            this._set('method', 'GET');
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
        getRouteParams: function () {
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
            var isPayloadString = ('string' === typeof payload);
            var url = isPayloadString ? payload : payload.url;
            var host = isPayloadString ? undefined : payload.host;
            var ohost = this._get('url').host;
            var M = url.match(/^(?:(https?:)\/\/(([^:\/]+)(:([^\/]+))?))?([^#?]*)(\\?[^#]*)?(#.*)?$/);
            var N = host ? host.match(/^([^:]+)(:(.+))?$/) : [];
            var search = M[7] || '';
            var hash = M[8] || '';
            var URL = {
                protocol: fluxex.protocol || M[1] || '',
                hostname: fluxex.hostname || M[3] || N[1] || '',
                port: fluxex.port || M[5] || N[3] || '',
                pathname: M[6] || '',
                search: search,
                hash: hash,
                query: payload.query || querystring.decode(search.substring(1)) || {}
            };

            this._set('method', payload.method || 'GET');

            URL.host = URL.hostname + ((URL.port !== '') ? (':' + URL.port) : '');
            URL.href = URL.protocol + (URL.protocol ? '//' : '') + URL.host + URL.pathname + URL.search + URL.hash;

            if (ohost && (ohost !== URL.host)) {
                throw new Error('Try to set URL to different host: ' + URL.host + ' , original host is: ' + ohost);
            }

            this._set('url', URL);
        },
        getMethod: function () {
            return this._get('method');
        },
        getQuery: function () {
            return this._get('url').query;
        },
        getPath: function () {
            return this._get('url').pathname;
        },
        getURL: function (query) {
            var url = this._get('url'),
                mixedSearch = querystring.encode(Object.assign(url.query, query));

            return encodeURIComponent(url.protocol + '//' + url.host + url.pathname + (mixedSearch ? '?' : '') + mixedSearch + url.hash);
        },
        getParams: function () {
            return Object.assign({}, this.getRouteParams(), this.getBody(), this.getQuery());
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
