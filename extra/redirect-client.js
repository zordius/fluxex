// Fluxex extra action

module.exports = {
    redirect: function (url) {
        if (!url) {
            throw new Error('call .redirect() without url!');
        }
        window.location.href = url;
    }
};
