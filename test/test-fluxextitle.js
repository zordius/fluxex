var testlib = require('../extra/testlib');
var assert = require('chai').assert;
var Title = require('..').Title;
var getDOMNode = require('react-dom').findDOMNode;

describe('FluxexTitle', function () {
    it('renders title', function () {
        var html = testlib.renderComponentToString(Title, undefined, testlib.getMockedContext({
            page: {
                getTitle: function () {
                    return 'Test Title';
                }
            }
        }));

        assert.match(html, /Test Title/);
    });

    it('renders title at client side', function () {
        var node = testlib.renderComponent(Title, undefined, testlib.getMockedContext({
            page: {
                getTitle: function () {
                    return 'Test Title 2';
                }
            }
        }));

        assert.equal(getDOMNode(node).innerHTML, 'Test Title 2');
    });

    it('second time rendering will update document.title', function () {
        var context = testlib.getMockedContext({
            page: {
                getTitle: function () {
                    return 'Test Title 2';
                }
            }
        });
        var node = testlib.renderComponent(Title, undefined, context);
        context.getStore('page').emitChange();

        assert.equal(global.document.title, 'Test Title 2');
    });
});
