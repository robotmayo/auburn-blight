var Game = {};
var EVENTS = require('ab-data/events');
var Gevent = require('./gevent');
var Player = require('./player');
Game.player = Player;
//var Storage = require('./storage')
Game.timer = {
  elapsed : 0,
  last : 0,
  id : null
};

//Game.settings = Storage.get('GAME.SETTINGS');
Game.settings = {
  FPS : 60
};

Game.start = function(){
  Game.timer.last = Date.now();
  Game.tick();
}

Game.tick = function(){
  var now = Date.now();
  Game.timer.elapsed = now - Game.timer.last;
  Gevent.emit(EVENTS.GAME.START, Game);
  Gevent.emit(EVENTS.GAME.UPDATE, Game);
  Gevent.emit(EVENTS.GAME.END, Game);
  Game.timer.id = setTimeout(Game.tick, Game.settings.FPS / 1000);
  Game.timer.last = Date.now();
}

module.exports = Game;