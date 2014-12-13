'use strict';

module.exports = {
    handle_UPDATE_SEARCH_RESULT: function (data) {
        if (this.get('data.keyword') !== data.keyword) {
            this.set('data', data, true);
        } else {
            this.get('data.videos').append(data.videos);
        }
        this.emitChange();
    }
};
