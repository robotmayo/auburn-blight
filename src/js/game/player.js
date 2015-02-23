var Entity = require('./entity');
var xtend = require('xtend');
var EQUIPMENT_SLOTS = require('ab-data/equipment-slots');
var eventer = require('./event');
var EVENTS = require('ab-data/events');
Player = new Entity({ap : {max : 4}});
Player.init = function(){
  this.currentTarget = {};
  eventer.on(EVENTS.GAME.UPDATE, this.update.bind(this));
}

Player.update = function(){
  this.stats.hp.add(this.stats.hpRegen.current);
  this.stats.mp.add(this.stats.mpRegen.current);
  this.stats.ap.add(this.stats.apRegen.current);
}

Player.useSkill = function(skill){
  if(!skill.canUse(this)) return false;
  if(skill.castTime == 0) return skill.use(pMem);
  this.casting = setTimeout(function(){
    skill.use(pMem. Player.target);
  }, skill.castTime);
};

module.exports = Player;