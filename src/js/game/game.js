var Game = {};
var EVENTS = require('ab-data/events');
var eventor = require('./event');
var Player = require('./player');
Game.player = Player;
//var Storage = require('./storage')
Game.timer = {
  elapsed : 0,
  id : null
};

//Game.settings = Storage.get('GAME.SETTINGS');
Game.settings = {
  FPS : 60
};

Game.start = function(){
  Game.tick();
}

Game.tick = function(){
  var now = Date.now();
  Game.timer.elapsed = now - Game.timer.last;
  eventor.emit(EVENTS.GAME.START, Game);
  eventor.emit(EVENTS.GAME.UPDATE, Game);
  eventor.emit(EVENTS.GAME.END, Game);
  Game.timer.id = setTimeout(Game.tick, Game.settings.FPS / 1000);
}

module.exports = Game;