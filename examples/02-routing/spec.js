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

describe('React client side binding', function () {
    it('should handle button click', function () {
        browser.get('main');
        browser.driver.executeScript('return window.test=1');
        element.all(by.css('ul li a')).get(0).click();
        browser.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return url.match(/product\/123/);
            });
        });
        expect(element(by.css('div span')).getInnerHtml()).toMatch(/12300/);
        browser.driver.executeScript('return window.test').then(function (value) {
            expect(value).toBe(1);
        });
    });
});