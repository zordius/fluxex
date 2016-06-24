// Fluxex extra action

module.exports = {
    redirect: function (url, replace) {
        if (!url) {
            throw new Error('call .redirect() without url!');
        }
        /*global window*/
        if (replace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }
};
