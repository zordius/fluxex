'use strict';

module.exports = function () {                                                           
    return this.executeAction().then(function () {
        this.dispatch('UPDATE_TITLE', 'HELLO!');
    });
};
