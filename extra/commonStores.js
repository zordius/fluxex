'use strict';

module.exports = {
    // All current page states stays here include location related things
    // Because we can not re-render Html at client side,
    // so we do not emitChange() in this store
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
        handle_UPDATE_URL: function (url) {
            var M = url.match(/^(?:(https?:)\/\/(([^:/]+)(:[^\/]+)?))?([^#?]*)(\\?[^#]*)?(#.*)?$/),
                search = M[6] || '',
                hash = M[7] || '',
                params = {},
                slist = search.substring(1).split(/[;&]/),
                P, I;

            for (I in slist) {
                if (slist.hasOwnProperty(I)) {
                    if (!slist[I]) {
                        continue;
                    }
                    P = slist[I].split(/=/);
                    params[decodeURIComponent(P[0].replace(/\+/g, '%20'))] = decodeURIComponent(P[1].replace(/\+/g, '%20'));
                }
            }

            this.set('url', {
                href: M[5] + M[6] + hash,
                protocol:  M[1],
                host: M[2],
                hostname: M[3],
                port: M[4] || '',
                pathname: M[5] || '',
                search: search,
                hash: hash,
                params: params
            }, true);
        }
    }
};
