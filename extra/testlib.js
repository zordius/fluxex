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
        TestUtils = require('react/addons').addons.TestUtils;
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

                    sinon.stub(Store, '_get', function (name) {
                        return mockStores[store][name];
                    });

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

    simulateBrowserEnv: function () {
        global.document = jsdom('<!DOCTYPE html><html><body></body></html>');
        global.window = global.document.parentWindow;
    },

    stopBrowserEnv: function () {
        delete global.window;
        delete global.document;
        require('react/lib/ExecutionEnvironment').canUseDOM = false;
    },

    renderComponent: function (react, props, context) {
        var rendered;

        Testlib.simulateBrowserEnv();
        rendered = Testlib.getReactTestUtils().renderIntoDocument(Testlib.getContextedElement(react, props, context));
        return Testlib.getReactTestUtils().findRenderedComponentWithType(rendered, react);
    }
};

module.export = Testlib;
