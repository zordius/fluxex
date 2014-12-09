'use strict';

var request = require('request'),
    when = require('when'),

yql = {
    getConfig: function (name) {
        var module = './service_config.js',
            config;

        try {
            // Trick to brevent browerify pack the config module into bundle.
            config = require(module);
        } catch {
            config = {};
        }

        return config.name;
    },
    fetch: function (name, cfg) {
        if (!name) {
            return when.reject(new Error('service name required!'));
        }

        if (!cfg) {
            cfg = {};
        }

        cfg.url = yql.getConfig(name) || '/services/' + name;
        
    }
};

module.exports = yql;
