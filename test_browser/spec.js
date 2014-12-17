describe('server side rendering', function () {
    it('should be good', function () {
        browser.get('http://localhost:3000/test');
        expect(element.all(by.css('ul li')).count()).toEqual(3);
    });
});