describe('React server side rendering', function () {
    it('should be good', function () {
        expect(element.all(by.css('ul li')).count()).toEqual(3);
    });

    it('sold should be 0', function () {
        expect(element(by.css('ul')).getInnerhtml()).toMatch(/Sold: 0/);
    });
});

describe('React client side binding', function () {
    it('should handle click', function () {
        element(by.css('ul')).click().then(function () {
            expect(element(by.css('ul')).getInnerhtml()).toMatch(/Sold: 1/);
        });
    });
});