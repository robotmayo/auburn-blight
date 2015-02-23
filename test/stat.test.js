var Stat = require('ab-game/stat')
var test = require('tape');

test('Stat.js', function(t){
  var str = new Stat(0, 0, 10);
  str.addModifier('max', 'flat', 90);
  str.calcTotal();
  t.equals(str.max, 100, 'Max should now be 100');
  str.addModifier('min', 'flat', 10);
  str.calcTotal();
  t.equals(str.min, 10, 'Min should now be 10');
  t.equals(str.current, 10, 'Should clamp to 10');
  var m = str.addModifier('max', 'percent', 10);
  str.calcTotal();
  t.equals(str.max, 101, 'Max should be 101');
  m.remove = true;
  str.calcTotal();
  t.equals(str.max, 100, 'Max should go back to 100');
  t.equals(str.modifiers.indexOf(m), -1, 'The modifier should have been removed');
  t.end();
})