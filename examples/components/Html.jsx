var React = require('react'),

Html = React.createClass({
    render: function () {
        <html>
         <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          <title>{this.getStore('page').get('title')}</title>
         </head>
         <body>
         </body>
         <script src="/static/js/main.js"></script>
         </html> 
    }
});

module.exports = Html;
