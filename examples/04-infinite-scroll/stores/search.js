'use strict';

module.exports = {
    handle_UPDATE_SEARCH_RESULT: function (data) {
        var old_data = this.get('data');

        if (!old_data || (old_data.keyword !== data.keyword)) {
            this.set('data', data);
        } else {
            old_data.videos = old_data.videos.concat(data.videos);
            this.set('data', old_data);
        }
        this.emitChange();
    }
};
