var Entity = require('./entity');
var xtend = require('xtend');
var EQUIPMENT_SLOTS = require('ab-data/equipment-slots');
var Gevent = require('./gevent');
var EVENTS = require('ab-data/events');
Player = new Entity({ap : {max : 4}});
Player.init = function(){
  this.activeSkills = {
    basicAttack : {
      name : 'Basic Attack',
      use : function(enemy){
        console.log("Attack", arguments)
      },
      canUse : function(){return true},
      castTime : 0
    }
  };
  Gevent.on(EVENTS.GAME.UPDATE, this.update.bind(this));
  Gevent.on(EVENTS.GAME.END, this.updateStats.bind(this));
  Gevent.on(EVENTS.BATTLE.START, this.battleStart);
}

Player.battleStart = function(){
  this.stats.ap.floor();
}

Player.update = function(){
  this.regen(true, true, true);
}

Player.useSkill = function(skill, enemy){
  if(!skill.canUse(this)) return false;
  if(skill.castTime == 0) return skill.use(Player, enemy);
  this.casting = setTimeout(function(){
    skill.use(Player, Player.target);
  }, skill.castTime *
   1000);
};

global.Player = module.exports = Player;