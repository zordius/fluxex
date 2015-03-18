'use strict';

module.exports = {
    handle_UPDATE_TITLE: function (title) {
        this._set('title', title);
        this.emitChange();
    },
    getTitle: function () {
        return this._get('title');
    }
};
