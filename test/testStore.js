module.exports = {
    initialize: function () {
        this._set('q', 'OK!');
    },
    handle_test: function (payload) {
        return 'OK';
    },
    handle_dispatch: function (payload) {
        return payload.dispatch('more_dispatch');
    },
    handle_more_dispatch: function () {
    },
    handle_SAMPLE: function (payload) {
        this._set('c', payload);
        this.emitChange();
    },
    getList: function () {
        return this._get('list');
    }
};
