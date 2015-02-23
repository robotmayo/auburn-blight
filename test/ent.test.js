var Entity = require('ab-game/entity')
var Eventer = require('ab-game/event');
var EVENTS = require('ab-data/events');
var test = require('tape');

test('Entity.js', function(t){
  var e = new Entity({str : {current : 1, max : 20}});
  t.equals(e.stats.str.current, 1);
  t.equals(e.stats.int.max, 9999);
  e.stats.str.addModifier('max', 'flat', 10);
  Eventer.emit(EVENTS.GAME.END);
  t.equals(e.stats.str.max, 30);
  t.end();
})