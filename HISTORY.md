HISTORY
=======
0.7.11 https://github.com/zordius/fluxex/releases/tag/v0.7.11
   * [EXTRA] remove canUseDOM modification in testlib.stopBrowserEnv()

0.7.10 https://github.com/zordius/fluxex/releases/tag/v0.7.10
   * [EXTRA] the default server extra will pass error to next() now

0.7.9 https://github.com/zordius/fluxex/releases/tag/v0.7.9
   * [EXTRA] support client side .redirect() as location.replace() now

0.7.8 https://github.com/zordius/fluxex/releases/tag/v0.7.8
   * [CORE] fix .toString() CIRCULAR detection bug

0.7.7 https://github.com/zordius/fluxex/releases/tag/v0.7.7
   * [EXTRA] the page store now receive payload.query when .handle_UPDATE_URL()
   * [EXTRA] the server extra .createMiddlewareWithRouting() now also dispatch req.query

0.7.6 https://github.com/zordius/fluxex/releases/tag/v0.7.6
   * [EXTRA] refine gulp to prevent 1 extra restart when boot server

0.7.4 https://github.com/zordius/fluxex/releases/tag/v0.7.4
   * [EXTRA] add new extra to provide .redirect()
   * [EXTRA] now this.routeToURL() depends on this.redirect() for error handling or external links

0.7.2 https://github.com/zordius/fluxex/releases/tag/v0.7.2
   * [EXTRA] gulp config test_coverage.default.babel removed, please use .babelrc file
   * [EXTRA] createMiddlewareWithRouting can handle METHOD correctly now
   * [EXTRA] commonStores.page can store METHOD now
   * [EXTRA] routingAction can handle POST correctly now

0.7.1 https://github.com/zordius/fluxex/releases/tag/v0.7.1
   * [CORE] remove context API: ._getHeader() . All request related things should be placed into a rpc.
   * [CORE] refine context API: .dispatch() now always returns a Promise and never throw exception.
   * [EXTRA] now commonStores.page will throw when try to .dispatch('UPDATE_URL') to different host.
   * [EXTRA] new API: commonStores.page .getPath()
   * [EXTRA] commonStores.page API change: rename .getRoutingParam() to .getRouteParams()
   * [EXTRA] commonStores.page now handle url.href more correctly
   * [EXTRA] remove deplicated commonStores.page API: .getParam() (should migrate to .getParams() )
   * [EXTRA] fix a typo in gulpfile
   * [EXTRA] gulp config eslint_fail changed from through object into function

0.7.0 https://github.com/zordius/fluxex/releases/tag/v0.7.0
   * [CORE] fix fluxex-client, use react-dom now
   * [EXTRA] refine gulpfile
      * add devDep: tcp-port-used
      * add react-dom into devcore
      * removed config: aliasify (you should put aliasify config in your package.json)
      * removed config: babel (you should put babel config into .babelrc)
      * now do not build devcore.js when it exists to save server start time, you can still use `gulp build_devcore` to force generation.
      * use tcp-port-used npm moudule to do browserSync reload at correct time.
      * removed config: nodemon_restart_delay
      * new config: port (default is 3000)
      * new config: BSport (default is 3001)
      * now supports nodemon.json
   * [EXTRA] remove extra/polyfill, please change `require('fluxex/extra/polyfill');` to `require('babel-polyfill')`;
   * [EXTRA] use babel 6.0 now:
      * new required devDep for your application: babel-register, babel-polyfill, babel-preset-es2015, babel-preset-react, babel-plugin-transform-runtime
      * remoded devDep for your application: babel-runtime
      * please change `require('babel/register')` to `require('babel-register');`
      * please copy .babelrc from node_modules/fluxex/.babelrc if you do not have one.

0.6.0 https://github.com/zordius/fluxex/releases/tag/v0.6.0
   * [CORE] refresh dependency, move to react 0.14.0
   * [CORE] new dependency for your project: react-dom
   * [EXTRA] refine gulpfile
      * remove devDep: jshint jscs gulp-jshint gulp-jscs gulp-jshint jshint-stylish
      * add devDep: gulp-eslint eslint eslint-plugin-react babel-eslint
      * remove config: jshint_fail, jscs_fail
      * add config: eslint_fail
   * [EXTRA] migrate to eslint now:
      * please copy .eslintrc from node_modules/fluxex/.slintrc if you do not have one.
      * you do not need .jshintrc now
      * you do not need .jscsrc now
      * you do not need .jshintignore now

0.5.3 https://github.com/zordius/fluxex/releases/tag/v0.5.3
   * [CORE] update package.json to support webpack
   * [CORE] Fluxex.InitScript supports devcore.js now
   * [EXTRA] refine gulpfile
      * will remove configs.aliasify , please use your package.json to store aliasify configs
      * remove unused react-tools and through2
      * jshint fixed
      * new devcore bundle task for develop mode to save main bundle time and file size
      * support config.uglify
   * [EXTRA] remove devDepdency of application: through2, react-tools
   * [EXTRA] add new dependency of application: iso-call
   * [EXTRA] add new devDepdency of application: envify
   * [EXTRA] unlock all locked dependency of example projects
   * [EXTRA] refine page Store URL parsing logic
   * [EXTRA] deprecated extra/fetch, migrate to extra/rpc
   * [EXTRA] polyfill IE8 console in extra/polyfill now (powered by Console-polyfill)
   * [EXTRA] deprecated .middlewareRouting() and .initServer() in extra/server
   * [EXTRA] new .createMiddlewareByAction() and .createMiddlewareWithRouting() in extra/server

0.5.2 https://github.com/zordius/fluxex/releases/tag/v0.5.2
   * [CORE] support React owner context now
   * [CORE] do not require process.cwd() hack on Html.jsx when .createApp() now
   * [CORE] remove ._getInitScript() from context API
   * [CORE] turn exception inside an action creator into a rejected Promise now
   * [EXTRA] support change fetch baseURL
   * [EXTRA] remove server/client logic from fetch (now done by aliasify)
   * [EXTRA] refine gulp exported config
      * remove .lint_files.js and .lint_files.jsx (now .lint_fiels is array)
      * move babel config from .babelify to .babel
      * migrate to new gulp-jsx-coverage, rename test_coverage.default.react to test_coverage.default.babel
   * [EXTRA] refine gulp task names:
      * remove lint_flux_js and lint_jsx (use lint_js now)
      * remove watch_flux_js (use watch_js now)
   * [EXTRA] fix initState bug in pjax.js
   * [EXTRA] support target!=self click in pjax.js
   * [EXTRA] scrollTo(0, 0) when routeToURL()
   * [EXTRA] fix extraAction should after UPDATE_URL issue in server.js

0.5.1 https://github.com/zordius/fluxex/releases/tag/v0.5.1
   * [CORE] new Fluxex.Title component to handle title change and fix IE8
   * [EXTRA] new fluxex/extra/history to enable html5-history-api
   * [EXTRA] new fluxex/extra/polyfill-ie8 to enable IE8 polyfills
   * [EXTRA] refine pjax and routeToURL to support IE8 by html5-history-api

0.5.0 https://github.com/zordius/fluxex/releases/tag/v0.5.0
   * [CORE] fix .dispatch() magic **UPDATEALL**
   * [CORE] refresh dependency, move to react 0.13.0
   * [CORE] support new react context
   * [CORE] use babel as default jsx transcoder
   * [CORE] support es6 features in jsx
   * [CORE] IE8 fix (tweak constructor matching logic)
   * [CORE] remove .getInitScript() from mixin
   * [CORE] new Fluxex.InitScript component to handle initialize and fix IE8
   * [EXTRA] extre/gulpfile: new configs for babel

0.4.0 https://github.com/zordius/fluxex/releases/tag/v0.4.0
   * [CORE] rename store methods: ._get(), ._set()
   * [CORE] support .initialize() for stores
   * [CORE] refine serialize function to keep null and undefined
   * [CORE] .executeAction() for components now do not return promise
   * [CORE] support waitFor for stores
   * [CORE] new context API: ._getHeader()
   * [EXTRA] use mocha-jenkins-reporter for better output when CI build
   * [EXTRA] refine common stores getter functions
   * [EXTRA] big API changes for fetch related functions
   * [EXTRA] better error messages for routing

0.3.0 https://github.com/zordius/fluxex/releases/tag/v0.3.0
   * [CORE] remove json path support of .set() and .get()
   * [EXTRA] remove fetch.appMixin
   * [EXTRA] refine some gulp setting naming

0.2.0 https://github.com/zordius/fluxex/releases/tag/v0.2.0
   * [CORE] remove all with-promise related API, use .bind() instead

0.1.11 https://github.com/zordius/fluxex/releases/tag/v0.1.11
   * [CORE] Extended executeAction() API to pass all arguments into action creator
   * [CORE] Remove all polyfill related dependency
   * [CORE] Depend on with-promise to keep context API can be accessed in all .then()
   * [CORE] dispatch() now returns all return values from handlers as promise
   * [EXTRA] Extended fetch.createServices() to handle preRequest logic
   * [EXTRA] New gulp tasks for jscs, test and coverage
   * [EXTRA] New routing mixin and helper functions

0.1.10 https://github.com/zordius/fluxex/releases/tag/v0.1.10
   * [CORE] Add standard doctype to support IE9
   * [EXTRA] Enhanced gulp tasks: `disc_app` to analyze bundle file size
   * [EXTRA] Better `fluxex_starter` message

0.1.9 https://github.com/zordius/fluxex/releases/tag/v0.1.9
   * [CORE] Now `.getInitScript()` will return empty string when `.initClient()` is done.
   * [CORE] Now `.set()` on undefined do not require 3rd parameter.
   * [CORE] Rename `FluxStore` to `FluxexStore`.
   * [CORE] Now `.emitChange()`, `.addChangeListener()` and `.removeChangeListener()` return `FluxexStore` itself for chaining.
   * [EXTRA] Add new `fluxex_starter` command to create your new project.
   * [EXTRA] Add new `fetch` extra module to wrap npm:request calls by service name.
   * [EXTRA] Now gulp task will minify javascript by npm:uglifyify.
   * [EXTRA] Better error handling in `pjax`.
   * [EXTRA] Fix a bug in `.routeToURL()`.
   * [EXTRA] `.getInitialState()` in `storechange` now return an empty object when `.getStateFromStores()` return nothing.

0.1.8 https://github.com/zordius/fluxex/releases/tag/v0.1.8
   * [CORE] Now all stores receive magic action `**UPDATEALL**` then emit change.
   * [EXTRA] Now gulp `develop` task will watch/lint/restart by server script.
   * [EXTRA] New `.getUrl()` method in common store `page`.
   * [EXTRA] New method `.routeToURL()` to deal with client side routing by `this.routing` action.
   * [EXTRA] New helper function `middlewareRouting()` to mount a routing fluxexapp.

0.1.7 https://github.com/zordius/fluxex/releases/tag/v0.1.7
   * [CORE] Now all action promise handler can access context by `this`.
   * [CORE] New `.restore()` method for `FluxexObject`, `FluxexStore` and `Fluxex`.
   * [EXTRA] New helper function `middleware()` to mount fluxexapp + action as express middleware.
   * [EXTRA] New common store `page` to deal with url and routing information.
   * [EXTRA] Sorter watch delay time for gulp tasks. Add document about vim setting to prevent double change events.
   * [EXTRA] New mixin to provide common `.getInitialState()` and `.onStoreChange`()` implement.

0.1.6-2 https://github.com/zordius/fluxex/releases/tag/v0.1.6-2
   * [EXTRA] Better gulpfile for develop envionment.

0.1.6-1 https://github.com/zordius/fluxex/releases/tag/v0.1.6-1
   * [CORE] Add `.executeAction()` to react mixin .

0.1.6 https://github.com/zordius/fluxex/tree/7689ecf34286c76efb96feb65c5239c7f0acc46d
   * First version for beta test.
   * [CORE] Internal methods for react mixin now prefix with _ .
   * [Example] first sample project to demo fluxex.
