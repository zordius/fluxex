describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('search?q=apple');
        expect(element.all(by.css('form input')).count()).toEqual(2);
    });

    it('keyword should be apple', function () {
        browser.get('search?q=apple');
        expect(element(by.css('div h1')).getInnerHtml()).toMatch(/apple/);
    });
});