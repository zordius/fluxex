// For Fluxex Applications
// add require('fluxex/extra/rpc') into fluxex.createApp() , then you have 2 API for your application: .execute() , .fetch()
// check example here: https://github.com/zordius/fluxex/blob/master/examples/05-extra/fluxexapp.js
var isocall = require('iso-call');

module.exports = {
    execute: function () {
        isocall.execute.apply(this._req, arguments);
    },
    fetch: function () {
        isocall.request.apply(this._req, arguments);
    }
};
