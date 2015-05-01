/* Deprecated */
/* Please use rpc for better interface and logic */
module.exports = {
    getRequestConfig: function (name, cfg, mainCfg) {
        return Object.assign({}, cfg, {url: mainCfg[name]});
    }
};
