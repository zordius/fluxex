'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Results = require('./Results.jsx'),
    Video = require('./Video.jsx'),
    SearchBox = require('./SearchBox.jsx'),

Html = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        require('fluxex/extra/pjax'),
        require('fluxex/extra/routing').mixin,
        {listenStores: ['page']}
    ],

    getStateFromStores: function () {
        return this.getStore('page').get('routing');
    },

    render: function () {
        var Body;

        switch (this.state.name) {
        case 'search':
            Body = <Results />;
            break;
        case 'video':
            Body = <Video id={this.state.params.id} />;
            break;
        }

        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          <SearchBox />
          Sample Search:
          <ul>
           <li><a href={this.getURL('search', {}, {q:'apple'})}>Apple</a></li>
           <li><a href={this.getURL('search', {}, {q:'banana'})}>Banana</a></li>
           <li><a href={this.getURL('search', {}, {q:'orange'})}>Orange</a></li>
          </ul>
          <div>{Body}</div>
          <script src="http://cdn.jsdelivr.net/polyfills/polyfill.js"></script>
          <script src="/static/js/main.js"></script>
          <script dangerouslySetInnerHTML={{__html: this.getInitScript()}}></script>
         </body>
        </html> 
        );
    }
});

module.exports = Html;
