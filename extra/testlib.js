var jsdom = require('jsdom').jsdom;
var sinon = require('sinon');
var React = require('react');
var Fluxex = require('..');
var fluxexhtml = require('../lib/fluxhtml');
var Fluxstore = require('../lib/fluxstore');

var Testlib = {
    getReactTestUtils: function () {
        var nodeenv = process.env.NODE_ENV;
        var TestUtils;

        process.env.NODE_ENV = 'testing';
        TestUtils = require('react-addons-test-utils');
        process.env.NODE_ENV = nodeenv;

        return TestUtils;
    },

    simulate: function () {
        return Testlib.getReactTestUtils().Simulate;
    },

    getMockedContext: function (mockStores) {
        var context = new Fluxex();
        var Stores = [];
        var Store;

        sinon.stub(context, 'dispatch').returns(Promise.resolve(1));

        Object.assign(context, require('./rpc'));

        if (mockStores) {
            sinon.stub(context, 'getStore', function (store) {
                if (Stores[store]) {
                    return Stores[store]; 
                } else {
                    Store = new Fluxstore();
                    Object.assign(Store, mockStores[store]);
                    Stores[store] = Store;

                    return Store;
                }
            });
        }
 
        return context;
    },

    getContextedElement: function (react, props, context) {
        return React.createFactory(fluxexhtml)({
            fluxex: context || Testlib.getMockedContext(),
            html: function () {
                return React.createFactory(react)(Object.assign({}, props));
            }
        });
    },

    renderJSX: function (jsx, context) {
        return Testlib.renderComponent(React.createClass({
            displayName: 'TestJSX',
            render: function () {
                return jsx;
            }
        }), undefined, context);
    },

    simulateBrowserEnv: function (mockWindow) {
        global.document = jsdom('<!DOCTYPE html><html><body></body></html>');
        global.window = global.document.parentWindow || global.document.defaultView;
        Object.assign(global.window, mockWindow);
    },

    stopBrowserEnv: function () {
        delete global.window;
        delete global.document;
        require('react/lib/ExecutionEnvironment').canUseDOM = false;
    },

    renderComponent: function (react, props, context, mockWindow) {
        var rendered;

        Testlib.simulateBrowserEnv(mockWindow);
        rendered = Testlib.getReactTestUtils().renderIntoDocument(Testlib.getContextedElement(react, props, context));
        return Testlib.getReactTestUtils().findRenderedComponentWithType(rendered, react);
    },

    renderComponentToString: function (react, props, context) {
        return require('react-dom/server').renderToString(Testlib.getContextedElement(react, props, context));
    }
};

module.exports = Testlib;
