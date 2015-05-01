// For Fluxex Applications
// add require('fluxex/extra/rpc') into fluxex.createApp() , then you have 2 API for your application: .execute() , .request()
// check example here: https://github.com/zordius/fluxex/blob/master/examples/05-extra/fluxexapp.js
var isocall = require('iso-call');

module.exports = {
    execute: function () {
        return isocall.execute.apply(this._req, arguments);
    },
    request: function () {
        return isocall.request.apply(this._req, arguments);
    }
};
