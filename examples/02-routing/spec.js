describe('React server side rendering', function () {
    it('should be good', function () {
        browser.get('main');
        expect(element.all(by.css('ul li')).count()).toEqual(5);
    });

    it('body title should be main', function () {
        expect(element(by.css('div h1')).getInnerHtml()).toMatch(/Main/);
    });

    it('html title should be Main Page', function () {
        expect(element(by.css('title')).getInnerHtml()).toBe('Main Page');
    });
});

describe('React client side binding', function () {
    it('should handle document.title correctly', function () {
        browser.driver.executeScript('return document.title').then(function (value) {
            expect(value).toBe('Main Page');
        });
    });

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
    });

    it('should block page loading and use history.pushState', function () {
        browser.driver.executeScript('return window.test').then(function (value) {
            expect(value).toBe(1);
        });
    });

    it('should change title correctly after page changed', function () {
        browser.driver.executeScript('return document.title').then(function (value) {
            expect(value).toMatch(/123/);
        });
    });

    it('should handle browser back button', function () {
        // http://stackoverflow.com/questions/27240969/unknown-error-on-safari-history-navigation-using-protractor-webdrivers
        // THE HACK: use history.go(-1) to replace browser.navigate().back();
        browser.driver.executeScript('return (window.test=2) && history.go(-1)');

        browser.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return url.match(/main/);
            });
        });
        expect(element(by.css('div h1')).getInnerHtml()).toMatch(/Main/);
    });

    it('should not cause page changed when back', function () {
        browser.driver.executeScript('return window.test').then(function (value) {
            expect(value).toBe(2);
        });
    });

    it('should change title correctly after page back', function () {
        browser.driver.executeScript('return document.title').then(function (value) {
            expect(value).toBe('Main Page');
        });
    });
});