describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('product?id=124');
        expect(element.all(by.css('h4')).count()).toEqual(1);
    });

    it('price should be 12400', function () {
        browser.get('product?id=124');
        expect(element(by.css('div span')).getInnerHtml()).toMatch(/12400/);
    });
});

describe('React client side binding', function () {
    it('should handle button click', function () {
        browser.get('product?id=124');
        browser.driver.executeScript('window.test=1');
        element(by.css('ul li a')).click().then(function () {
            console.log('OK!');
            browser.driver.getCurrentUrl().then(function (url) {
                console.log('URL--------:' + url);
            });
        });
    });
});