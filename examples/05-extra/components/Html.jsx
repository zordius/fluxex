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
        return {
            route_name: this.getStore('page').getRouteName(),
            id: this.getStore('page').getQuery().id
        };
    },

    render: function () {
        var Body;

        switch (this.state.route_name) {
        case 'search':
            Body = <Results />;
            break;
        case 'video':
            Body = <Video id={this.state.id} />;
            break;
        }

        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <Fluxex.Title />
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
          <Fluxex.InitScript />
         </body>
        </html> 
        );
    }
});

module.exports = Html;
