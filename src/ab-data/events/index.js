module.exports = {
  GAME : require('./game'),
  ENEMY : require('./enemy'),
  BATTLE : require('./battle'),
  PLAYER : require('./player')
}
global.GAME_EVENTS = module.exports;