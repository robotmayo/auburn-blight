var Gevent = require('./gevent');
var EVENTS = require('ab-data/events');
var Battle = {};
var Player = require('./player');

Battle.player = Player;
Battle.start = function(enemy){
  this.enemy = enemy;
  Gevent.once(EVENTS.ENEMY.DIE, this.end);
  Gevent.once(EVENTS.PLAYER.DIE, this.playerEnd);
  Gevent.on(EVENTS.GAME.UPDATE, this.updateEnemy);
  Gevent.emit(EVENTS.BATTLE.START, this);
}

Battle.updateEnemy = function(){
  Gevent.emit(EVENTS.BATTLE.UPDATE);
  Battle.enemy.update(this.player);
}

Battle.end = function(){
  Battle.active = false;
  Gevent.off(Battle.updateEnemy);
  Gevent.emit(EVENTS.BATTLE.END, Battle);
  Battle.enemy = null;
}

Battle.playerEnd = function(){
  Battle.active = false;
  Battle.enemy = null;
  Gevent.emit(EVENTS.BATTLE.PLAYER_LOST, Battle);
}

module.exports = Battle;