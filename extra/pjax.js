'use strict';

// Use this mixin at HTML/BODY level to enable pjax behavior
// Your fluxexapp should provide routeToURL() for this mixin
// See routeToURL.js for more info
module.exports = {
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

            try {
                state = JSON.parse(state);
            } catch (E) {
                state = 0;
            }

            if (!state) {
                // NO STATE DATA....can not re-render, so reload.
                location.reload();
                return;
            }

            // Ya, trigger page restore by an anonymous action
            self.executeAction(function () {
                this.restore(state);
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

        this._getContext().routeToURL(HREF);
    }
};
