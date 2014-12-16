'use strict';

module.exports = {
    handle_UPDATE_TITLE: function (title) {
        // Because we can not re-render Html at client side
        // So we play DOM here.
        if (this.get('title')) {
            /*global document*/
            document.getElementsByTagName('title')[0].innerHTML = title;
        } else {
            this.set('title', title);
        }
    }
};
