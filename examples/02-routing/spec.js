describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('main');
        expect(element.all(by.css('ul li')).count()).toEqual(5);
    });

    it('title should be main', function () {
        browser.get('main');
        expect(element(by.css('div h1')).getInnerHtml()).toMatch(/Main/);
    });
});