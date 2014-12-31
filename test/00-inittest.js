// Apply all polyfills
require('object.assign').shim();
global.Promise = require('bluebird');
Promise.longStackTraces();
