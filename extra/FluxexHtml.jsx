'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),

FluxexHtml = React.createClass({
    mixins: [
        Fluxex.mixin,
        require('fluxex/extra/storechange'),
        require('fluxex/extra/pjax')
    ],

    render: function () {
        return (
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body onClick={this.handleClickLink}>
          {this.props.children}
          <script src="http://cdn.jsdelivr.net/polyfills/polyfill.js"></script>
          <script src="/static/js/main.js"></script>
          <script dangerouslySetInnerHTML={{__html: this.getInitScript()}}></script>
         </body>
        </html> 
        );
    }
});

module.exports = FluxexHtml;
