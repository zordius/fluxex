'use strict';

var fetch = require('./fetch');

module.exports = function (yql) {
    if (!yql) {
        throw new Error('call yql without yql statement!');
    }

    return fetch('yql', {
        q: encodeURIComponent(yql),
        json: true
    }).then(function (O) {
        if (O.body && O.body.query && O.body.query.results) {
            return O.body.query.results;
        } else {
            throw new Error({
                message: 'no query.results in response',
                request: O
            });
        }
    });
};
