'use strict';

// Fluxex extra action
// you should attach a `routing()` action creator on your fluxexapp
// See routing.js for more info
module.exports = function (url) {
    // Try to route
    this.dispatch('UPDATE_URL', url).then(function () {
        // Run action to update page stores
        return this.executeAction(this.routing);
    }).then(function () {
        // Success, trigger page refresh
        this.getStore('page').emitChange();

        // update url to history
        /*global history*/
        history.pushState(this.toString(), undefined, url);
    }).catch(function (E) {
        console.log('Pjax failed! Failback to page loading....');
        console.log(E.stack || E);
        // pjax failed, go to url...
        location.href = url;
    });
};
