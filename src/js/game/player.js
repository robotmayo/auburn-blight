var Entity = require('./entity');
var xtend = require('xtend');
var EQUIPMENT_SLOTS = require('ab-data/equipment-slots');
var Gevent = require('./gevent');
var EVENTS = require('ab-data/events');
var DAMAGE = require('ab-data/constants/damage-types');
var Damage = require('./damage');
var objToArray = require('ab-utils/objToArray');
var FrameTimer = require('./game-timer');
Player = new Entity(require('ab-data/base-player-stats'));
Player.init = function(){
  this.name = "Player";
  this.activeSkills = {
    basicAttack : {
      name : 'Basic Attack',
      cooldown : 0,
      baseCooldown : 3,
      costs : {
        ap : 1
      },
      applyCost : function(player, enemy){
        player.stats.ap.subtract(this.costs.ap);
        return this;
      },
      use : function(player, enemy){
        console.log("Using basic attack!", enemy);
        var d = new Damage();
        d.add(5, DAMAGE.TYPE.PHYSICAL)
        console.log(d);
        enemy.applyDamage(d);
        this.cooldown = this.baseCooldown;
        return this;
      },
      canUse : function(player, enemy){
        console.log(this.cooldown)
        return player.stats.ap.current >= 1 && this.cooldown === 0;
      },
      castTime : 0
    }
  };
  Gevent.on(EVENTS.GAME.UPDATE, this.update.bind(this));
  Gevent.on(EVENTS.GAME.END, this.updateStats.bind(this));
  Gevent.on(EVENTS.BATTLE.START, this.battleStart.bind(this));
}

Player.battleStart = function(){
  this.stats.ap.floor();
}

Player.update = function(){
  this.regen(true, true, true);
  this.updateCoolDowns();
}

Player.updateCoolDowns = function(){
  objToArray(this.activeSkills)
  .filter(function(skill){
    return skill.cooldown > 0;
  })
  .forEach(function(skill){
    skill.cooldown -= FrameTimer.elapsed;
    if(skill.cooldown < 0) skill.cooldown = 0;
  });
}

Player.useSkill = function(skill, enemy){
  console.log(arguments);
  if(!skill.canUse(this, enemy)){
    console.log("cant use")
    return false;
  }
  if(skill.castTime == 0) return skill.applyCost(this, enemy).use(this, enemy);
  this.casting = setTimeout(function(){
    skill.applyCost(this, enemy).use(this, enemy);
  }, skill.castTime *
   1000);
};

global.Player = module.exports = Player;