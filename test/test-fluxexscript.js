var testlib = require('../extra/testlib');
var assert = require('chai').assert;
var sinon = require('sinon');
var Script = require('..').InitScript;
var getDOMNode = require('react-dom').findDOMNode;

describe('FluxexScript', function () {
    it('renders devcore when in dev mode', function () {
        process.env.NODE_ENV = 'develop';
        assert.match(testlib.renderComponentToString(Script, undefined, testlib.getMockedContext()), /devcore/);
    });

    it('no devcore when in production mode', function () {
        process.env.NODE_ENV = 'production';
        assert.notMatch(testlib.renderComponentToString(Script, undefined, testlib.getMockedContext()), /devcore/);
    });

    it('renders div with default classname', function () {
        assert.match(testlib.renderComponentToString(Script, undefined, testlib.getMockedContext()), /fluxex_hidden/);
    });

    it('renders div with provided classname', function () {
        assert.match(testlib.renderComponentToString(Script, {className: 'foo'}, testlib.getMockedContext()), /class="foo"/);
    });

    it('renders script with default script name', function () {
        assert.match(testlib.renderComponentToString(Script, undefined, testlib.getMockedContext()), /\/static\/js\/main\.js/);
    });

    it('renders script with provided src', function () {
        assert.match(testlib.renderComponentToString(Script, {src: 'bar.js'}, testlib.getMockedContext()), /src="bar.js"/);
    });

    it('renders init script at server side', function () {
        assert.match(testlib.renderComponentToString(Script, undefined, testlib.getMockedContext()), /new Fluxex/);
    });

    it('do not render init script when already inited', function () {
        var context = testlib.getMockedContext();
        context.inited = true;

        assert.notMatch(getDOMNode(testlib.renderComponent(Script, undefined, context)).innerHTML, /new Fluxex/);
    });
});
