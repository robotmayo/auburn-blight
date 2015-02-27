var Game = {};
var EVENTS = require('ab-data/events');
var Gevent = require('./gevent');
var Player = require('./player');
Game.player = Player;
//var Storage = require('./storage')
Game.timer = require('./game-timer');

//Game.settings = Storage.get('GAME.SETTINGS');
Game.settings = {
  FPS : 60
};

Game.start = function(){
  Game.timer.last = Date.now();
  Game.tick();
}

Game.tick = function(){
  console.log(Game.timer.elapsed);
  var now = Date.now();
  Game.timer.elapsed = (now - Game.timer.last) / 1000;
  Gevent.emit(EVENTS.GAME.START, Game);
  Gevent.emit(EVENTS.GAME.UPDATE, Game);
  Gevent.emit(EVENTS.GAME.END, Game);
  Game.timer.id = setTimeout(Game.tick, Game.settings.FPS / 1000);
  Game.timer.last = Date.now();
}

module.exports = Game;