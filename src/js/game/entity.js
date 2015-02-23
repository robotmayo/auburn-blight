var stats = require('ab-data/stats');
var Stat = require('ab-game/stat');
var xtend = require('xtend');
var eventer = require('ab-game/event');
var EVENTS = require('ab-data/events');
var EQUIPMENT_SLOTS = require('ab-data/equipment-slots');

function Ent(st){
	this.stats = this.createStats(st);
  eventer.on(EVENTS.GAME.END, this.updateStats.bind(this));
  eventer.on(EVENTS.GAME.END, this.update.bind(this));
  this.equipped = xtend(EQUIPMENT_SLOTS, {});
  this.skills = {};
}

Ent.prototype.update = function() {
  this.stats.hp.add(this.stats.hpRegen.current);
  this.stats.mp.add(this.stats.mpRegen.current);
  this.stats.ap.add(this.stats.apRegen.current);
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