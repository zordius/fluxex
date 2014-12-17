exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  multiCapabilities: [
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

  specs: ['spec.js'],

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};