'use strict';

var React = require('react'),
    Fluxex = require('fluxex'),
    Product = require('./Product.jsx'),

Html = React.createClass({
    mixins: [Fluxex.mixin],

    shouldComponentUpdate: function () {
        return false;
    },

    handleClickLink: function (E) {
        var HREF = E.target.href;

        if (!HREF || HREF.match(/#/)) {
            return;
        }

        E.preventDefault();
        E.stopPropagation();
        console.log(HREF);
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
          <Product />
         </body>
         <script src="/static/js/main.js"></script>
         <script dangerouslySetInnerHTML={{__html: this._getInitScript()}}></script>
<script>
</script>
        </html> 
        );
    }
});

module.exports = Html;
