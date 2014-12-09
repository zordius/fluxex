'use strict';

module.exports = {
    mixin: {
        componentDidMount: function () {
            /*global window,document*/
            var blockDoublePop = (document.readyState != 'complete'),
                initState = this._getContext().toString(),
                initUrl = window.location.href,
                self = this;

            if (!window.addEventListener) {
                return;
            }

            window.addEventListener('load', function() {
                setTimeout(function () {
                    blockDoublePop = false;
                }, 1);
            });

            window.addEventListener('popstate', function (E) {
                var state = E.state || ((window.location.href === initUrl) ? initState : undefined);

                if (blockDoublePop && (document.readyState === 'complete')) {
                    return;
                }

                if (!state) {
                    // NO STATE DATA....can not re-render, so reload.
                    location.reload();
                    return;
                }

                // Ya, trigger page restore by an anonymous action
                self.executeAction(function () {
                        this.restore(JSON.parse(state));
                        this.dispatch('UPDATE_TITLE');
                        this.dispatch('**UPDATEALL**');
                        return this.resolvePromise(true);
                    });
                });
        },

        handleClickLink: function (E) {
            var HREF = E.target.href,
                self = this;

            if (!HREF || HREF.match(/#/)) {
                return;
            }

            E.preventDefault();
            E.stopPropagation();

            // Try to route
            this._getContext().dispatch('UPDATE_URL', HREF).then(function () {
                // Run action to update page stores
                return this.executeAction(this._getContext().routing);
            }).then(function () {
                // Success, update url to history
                /*global history*/
                history.pushState(self._getContext().toString(), undefined, HREF);
            });
        },
    }
};
