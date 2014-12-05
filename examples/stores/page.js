'use strict';

module.exports = {
    handle_UPDATE_TITLE: function (title) {
        if (this.get('title') !== title) {
            this.set('title', title, true);
            this.emitChange();
        }
    }
}
