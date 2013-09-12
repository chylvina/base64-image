/**
 * Created with JetBrains WebStorm.
 * Author: chylvina
 * Since: 13-2-15 下午10:18
 * Description:
 */

var hbs = require('hbs');

hbs.registerHelper('extend', function (name, context) {                  //copied form https://github.com/donpark/hbs/blob/master/examples/extend/app.js
  hbs.__blocks = hbs.__blocks || {};
  var block = hbs.__blocks[name];
  if (!block) {
    block = hbs.__blocks[name] = [];
  }
  block.push(context.fn(this));
});

hbs.registerHelper('block', function (name) {
  hbs.__blocks = hbs.__blocks || {};
  var val = (hbs.__blocks[name] || []).join('\n');
  // clear the block
  hbs.__blocks[name] = [];
  return val;
});

module.exports = hbs;