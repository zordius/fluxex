'use strict';

module.exports = {
    handle_UPDATE_SEARCH_RESULT: function (data) {
        if (this.get('data.keyword') !== data.keyword) {
            this.set('data', data);
        } else {
            this.set('data.videos', function (D) {
                return Array.prototype.concat.call(D, data.videos);
            });
        }
        this.emitChange();
    }
};
