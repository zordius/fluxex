var config = {
  job_basename: require('path').basename(process.cwd()) + '_' + process.env.TRAVIS_JOB_ID,

  sauceSeleniumAddress: 'localhost:4445/wd/hub',
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  browsers: [
    {browserName: 'chrome'},
    {browserName: 'firefox'},
    {browserName: 'safari', version: 7, platform: 'OS X 10.9'},
    {browserName: 'safari', version: 6, platform: 'OS X 10.8'},
    {browserName: 'internet explorer', version: 11, platform: 'Windows 8.1'},
    {browserName: 'internet explorer', version: 10, platform: 'Windows 8'},
    {browserName: 'internet explorer', version: 9, platform: 'Windows 7'},
    {browserName: 'iphone', version:'7.1', platform: 'OS X 10.9'},
    {browserName: 'iphone', version:'7.0', platform: 'OS X 10.9'},
    {browserName: 'iphone', version:'6.1', platform: 'OS X 10.8'},
    {browserName: 'ipad', version:'7.1', platform: 'OS X 10.9'},
    {browserName: 'ipad', version:'7.0', platform: 'OS X 10.9'},
    {browserName: 'ipad', version:'6.1', platform: 'OS X 10.8'}
  ],

  specs: [process.cwd() + '/spec.js'],

  baseUrl: 'http://localhost:3000/',

  // This enable testing on none angular pages without test code change.
  onPrepare: function () {
    element = browser.element;
    browser.ignoreSynchronization = true;
  },

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};

config.multiCapabilities = config.browsers.map(function (cfg) {
  cfg.build = config.job_basename;
  cfg['tunnel-identifier'] = process.env.TRAVIS_JOB_NUMBER;
  cfg.name = 'FluxEx browser test for example: ' + config.job_basename;
  cfg.public = 'public';
  cfg.tags = [process.env.TRAVIS_JOB_ID, process.env.TRAVIS_COMMIT, 'fluxex'];
  return cfg;
});

module.exports.config = config;