'use strict';

// Fluxex extra method
// Should be used on your fluxexapp and you should attach a routing action
module.exports = function (url) {
    // Try to route
    this.dispatch('UPDATE_URL', url).then(function () {
        // Run action to update page stores
        return this.executeAction(this.routing);
    }).then(function () {
        // Success, update url to history
        /*global history*/
        history.pushState(self.toString(), undefined, url);
    }).catch(function (E) {
        console.log(E);
        // pjax failed, go to url...
        location.href = url;
    });
};
