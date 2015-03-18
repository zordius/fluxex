HISTORY
=======
0.5.1 https://github.com/zordius/fluxex/releases/tag/v0.5.1
   * [CORE] new Fluxex.Title component
   * [EXTRA] new fluxex/extra/history to enable html5-history-api
   * [EXTRA] new fluxex/extra/polyfill-ie8 to enable IE8 polyfills
   * [EXTRA] refine pjax and routeToURL to support IE8 by html5-history-api

0.5.0 https://github.com/zordius/fluxex/releases/tag/v0.5.0
   * [CORE] fix .dispatch() magic **UPDATEALL**
   * [CORE] refresh depdency, move to react 0.13.0
   * [CORE] support new react context
   * [CORE] use babel as default jsx transcoder
   * [CORE] support es6 features in jsx
   * [CORE] IE8 fix (tweak constructor matching logic)
   * [CORE] remove .getInitScript() from mixin
   * [CORE] new fluxex.InitScript component to handle initialize and fix IE8
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
   * [CORE] Remove all polyfill related depdency
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
