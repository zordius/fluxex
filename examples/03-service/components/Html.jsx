'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    InitScript = Fluxex.InitScript,
    Results = require('./Results.jsx'),
    SearchBox = require('./SearchBox.jsx'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/pjax')
    ],

    getInitialState: function () {
        return {};
    },

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').getTitle()}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <SearchBox />
          Sample Search:
          <ul>
           <li><a href="/search?q=apple">Apple</a></li>
           <li><a href="/search?q=banana">Banana</a></li>
           <li><a href="/search?q=orange">Orange</a></li>
          </ul>
          <Results />
          <InitScript />
         </body>
        </html> 
        );
    }
});

module.exports = Html;
