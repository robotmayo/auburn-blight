
function Stat(current, min, max, name, abbv, desc){
  this.current = current;
  this.min = min;
  this.max = max;
  this._min = min;
  this._max = max;
  this.modifiers = [];
  this.name = name;
  this.abbv = abbv;
  this.desc = desc;
}
Stat.prototype.floor = function() {
  this.current = this.min;
};
Stat.prototype.add = function(val) {
  this.current += val;
  this.clamp();
  return this.current;
};

Stat.prototype.subtract = function(val) {
  this.current -= val;
  this.clamp();
  return this.current;
};

Stat.prototype.clamp = function() {
  if(this.current < this.min) this.current = this.min;
  if(this.current > this.max) this.current = this.max;
};

Stat.prototype.addModifier = function(applyTo, type, value) {
  var m = {
    value : value,
    type : type,
    applyTo : applyTo,
    isFn : typeof value === 'function',
    remove : false
  };
  // I want to use WeakMaps :(
  this.modifiers.push(m);
  return m;
};

Stat.prototype.calcTotal = function() {
  var minFlat = maxFlat = minPer = maxPer = 0;
  var i = this.modifiers.length;
  while(i > 0){
    i--;
    var m = this.modifiers[i];
    var val = m.isFn ? m.value() : m.value;
    if(m.remove) {
      this.modifiers.pop();
      continue;
    }
    if(m.type == 'flat'){
      if(m.applyTo === 'max') maxFlat += val;
      else minFlat += val;
    }else{
      if(m.applyTo === 'max') maxPer += val;
      else minPer += val;
    }
  }
  this.max = this._max + maxFlat + ( (maxPer / 100) * this._max);
  this.min = this._min + minFlat + ( (minPer / 100) * this._min);
  this.clamp();
};

module.exports = Stat;