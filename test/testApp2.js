var fluxex = require('../');

module.exports = fluxex.createApp({
    storeA: {
        waitFor: {
            TEST1: ['storeB', 'storeC']
        },
        handle_TEST1: function () {}
    },
    storeB: {
        waitFor: {
            TEST1: ['storeC', 'storeD']
        },
        handle_TEST1: function () {}
    },
    storeC: {
        waitFor: {
            TEST1: ['storeD', 'storeA']
        },
        handle_TEST1: function () {}
    },
    storeD: {
        waitFor: {
            TEST1: 'storeE'
        },
        handle_TEST1: function () {}
    },
    storeE: {
        handle_TEST1: function () {}
    }
}, 'noneed_htmlJsx');
