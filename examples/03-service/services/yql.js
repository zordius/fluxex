'use strict';

var isocall = require('iso-call');

module.exports = function (yql) {
    if (!yql) {
        throw new Error('call yql without yql statement!');
    }

    return isocall.request('yql', {
        qs: {
            q: yql,
            format: 'json'
        },
        rejectUnauthorized : false,
        json: true
    }).then(function (O) {
        if (O.body && O.body.query && O.body.query.hasOwnProperty('results')) {
            return O.body.query.results;
        } else {
            throw new Error({
                message: 'no query.results in response',
                request: O
            });
        }
    });
};
