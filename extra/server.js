'use strict';                                                 

var react = require('react');

require('node-jsx').install({extension: '.jsx'});

module.exports = {
    initStatic: function (app) {
       app.use('/static', express.static(process.cwd() + '/static'));
    },
    
    middleware: function (fluxexapp, action) {
        return function (req, res, next) {
            (new fluxexapp()).renderHtml(action, req).then(function (HTML) {
                res.send(HTML);
            }).catch(function (E) {
                console.log(E.stack);
                next();
            });
        };
    }
}
