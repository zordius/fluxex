'use strict';

// Fluxex extra action
// you should attach a `routing()` action creator on your fluxexapp
// See routing.js for more info
//
// To support IE8,
// You will need to npm install html5-history-api,
// then add require('fluxex/extra/history'); in your fluxexapp.js

module.exports = function (url) {
    // Try to route
    this.dispatch('UPDATE_URL', url).then(function () {
        // Run action to update page stores
        return this.executeAction(this.routing);
    }.bind(this)).then(function () {
        // Success, trigger page refresh
        this.getStore('page').emitChange();

        // update url to history
        /*global window*/
        window.history.pushState(JSON.stringify(this._context), undefined, url);

        // scroll window to top to simulate non-pjax click
        window.scrollTo( 0, 0);
    }.bind(this))['catch'](function (E) {
        if (console && console.log) {
            console.log('Pjax failed! Failback to page loading....');
            console.log(E.stack || E);
        }

        // pjax failed, go to url...
        window.location.href = url;
    });
};
