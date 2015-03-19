'use strict';

module.exports = {
    getRequestConfig: function (name, cfg, mainCfg) {
        return Object.assign({}, cfg, {url: mainCfg[name]});
    }
};
