'use strict';

module.exports = {
    handle_UPDATE_SEARCH_RESULT: function (data) {
        this.set('data', data);
        this.emitChange();
    }
};
