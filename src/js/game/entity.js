var stats = require('ab-data/stats');
var Stat = require('ab-game/stat');
var xtend = require('xtend');
var eventer = require('ab-game/gevent');
var EVENTS = require('ab-data/events');
var EQUIPMENT_SLOTS = require('ab-data/equipment-slots');
var GameTimer = require('./game-timer');
var DAMAGE_TYPES = require('ab-data/constants/damage-types');
var DAMAGE_RES = require('ab-data/constants/resistances')

function Ent(st){
  this.name = "Enemy";
	this.stats = this.createStats(st);
  this.equipped = xtend(EQUIPMENT_SLOTS, {});
  this.skills = {};
}

Ent.prototype.regen = function(hp, mp, ap) {
  if(hp) this.stats.hp.add(this.stats.hpRegen.current * GameTimer.elapsed);
  if(mp) this.stats.mp.add(this.stats.mpRegen.current * GameTimer.elapsed);
  if(ap) this.stats.ap.add(this.stats.apRegen.current * GameTimer.elapsed);
};

Ent.prototype.applyDamage = function(damage) {
  damage.damageList.forEach(this.takeDamage, this);
};

Ent.prototype.takeDamage = function(d) {
  var value = null;
  if(d.type === DAMAGE_TYPES.TYPE.PURE){
    if(Object.keys(DAMAGE_TYPES.ELEMENT).indexOf(d.element) > -1){
      value = this.calculateElementalDamage(d.element, d.value);
      return this.stats.hp.subtract(value);
    }else{
      return this.stats.hp.subtract(d.value);
    }
  }

  if(d.type === DAMAGE_TYPES.TYPE.PHYSICAL){
    value = this.calculatePhysicalDamage(d.value);
    //value = this.calculateElementalDamage(d.element, value);
    return this.stats.hp.subtract(value);
  }

  if(d.type === DAMAGE_TYPES.TYPE.MAGICAL){
    value = this.calculateMagicalDamage(d.value);
    //value = this.calculateElementalDamage(d.element, value);
    return this.stats.hp.subtract(value);
  }

};

Ent.prototype.calculatePhysicalDamage = function(damage) {
  var value = damage;
  value -= DAMAGE_RES.ARMOR.BASE * this.stats.armor.current; // Future calculation will have armor level increasing BASE
  value -= value * ( (DAMAGE_RES.ARMOR.PERCENT * this.stats.armor.current) / 100);
  return value < 1 ? 1 : value;
};

Ent.prototype.calculateMagicalDamage = function(damage) {
  var value = damage;
  value -= DAMAGE_RES.MAGIC_RESISTANCE.BASE * this.stats.magicRes.current; // Future calculation will have armor level increasing BASE
  value -= value * ( (DAMAGE_RES.MAGIC_RESISTANCE.PERCENT * this.stats.magicRes.current) / 100);
  return value < 1 ? 1 : value;
};

Ent.prototype.calculateElementalDamage = function(element, damage) {
  throw new Error('Not yet implemented');
};

Ent.prototype.update = function() {
  this.regen(true, true, true)
};

Ent.prototype.updateStats = function() {
  Object.keys(this.stats).forEach(function(s){this.stats[s].calcTotal()}, this);
};

Ent.prototype.createStats = function(st) {
  var s = {};
  st = st ? st : {}; 
  Object.keys(stats).forEach(function(key){
    var curStat = xtend(stats[key], st[key] || {});
    s[key] = new Stat(curStat.current || 0, curStat.min, curStat.max, curStat.name, curStat.abbv, curStat.desc);
  });
  return s;
};

module.exports = Ent;