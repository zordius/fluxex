describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('test');
        expect(element.all(by.css('ul li')).count()).toEqual(3);
    });

    it('sold should be 0', function () {
        browser.get('test');
        expect(element(by.css('ul')).getInnerHtml()).toMatch(/Sold: 0/);
    });
});

describe('React client side binding', function () {
    it('should handle click', function () {
        browser.get('test');
        element(by.css('ul')).click().then(function () {
            expect(element(by.css('ul')).getInnerHtml()).toMatch(/Sold: 1/);
        });
    });
});