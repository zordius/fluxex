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
    var agent, isIE;

    try {
        agent = window.navigator.userAgent;
        isIE = agent.match(/MSIE (\d+)/);
    } catch (E) {
        // DO NOTHING
    }

    ((isIE && isIE[1] < 9) ? it.skip : it)('should handle button click', function () {
        browser.get('product?id=124');
        browser.driver.executeScript('return window.test=1');
        element.all(by.css('ul li a')).get(0).click();
        browser.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return url.match(/id=123/);
            });
        });
        expect(element(by.css('div span')).getInnerHtml()).toMatch(/12300/);
        browser.driver.executeScript('return window.test').then(function (value) {
            expect(value).toBe(1);
        });
    });
});