How to try this
===============

1. npm install ../..
2. npm install
3. npm start
4. browse http://localhost:3001/test?id=123
5. type these commands in console, enjoy!
  * change page title: `FluxexApp.dispatch('UPDATE_TITLE', 'this is another test');`
  * update product: `FluxexApp.dispatch('UPDATE_PRODUCT', {title: 'next', description: 'OK?!', price: 12345});`
  * the dark side: `FluxexApp.getStore('productStore').set('data.title', 'yes! you change the product title and it re-rendered!').emitChange();`
