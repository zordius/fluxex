describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('product?id=124');
        expect(element.all(by.css('ul li')).count()).toEqual(3);
    });

    it('price should be 12400', function () {
        browser.get('product?id=124');
        expect(element(by.css('div span')).getInnerHtml()).toMatch(/12400/);
    });
});