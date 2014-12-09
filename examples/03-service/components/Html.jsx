'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Results = require('./Results.jsx'),
    SearchBox = require('./SearchBox.jsx'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin
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
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <SearchBox />
          <Results />
         </body>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this._getInitScript()}}></script>
        </html> 
        );
    }
});

module.exports = Html;
