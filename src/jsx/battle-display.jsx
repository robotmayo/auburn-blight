var PlayerBattle = require('./player-battle-display.jsx');
var EnemyBattle = require('./enemy-battle-display.jsx');
var React = require('react');
var Battle = require('ab-game/battle');
var Player = require('ab-game/player');
var Gevent = require('ab-game/gevent');
module.exports = React.createClass({
  componentWillMount : function(){
    var self = this;
    this.replaceState(Battle);
    this.update = function(){
      self.replaceState(Battle);
      self.render();
    }
    Gevent.on("GAME_UPDATE", this.update);
  },
  componentWillUnmount : function(){
    Gevent.removeListener("GAME_UPDATE", this.update);
  },
  render : function(){
    return (
      <div>
        <PlayerBattle player={Player} enemy={this.state.enemy}/>
        <EnemyBattle enemy={this.state.enemy}/>
      </div>
    )
  }
});