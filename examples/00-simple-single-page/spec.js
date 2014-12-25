describe('React server side rendering', function () {                                                   
    it('should be good', function () {
        browser.get('test?id=123');
        expect(element.all(by.css('button')).count()).toEqual(2);
    });

    it('data should be undefined', function () {
        browser.get('test?id=123');
        expect(element(by.css('div div')).getInnerHtml()).toMatch(/data: undefined/);
    });
});

describe('React client side binding', function () {
    it('should handle button click', function () {
        browser.get('test?id=123');
        element.all(by.css('button')).get(0).click().then(function () {
            expect(element(by.css('div div')).getInnerHtml()).toMatch(/data: 1/);
        });
    });
});