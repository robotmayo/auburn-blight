var PlayerBattle = require('./player-battle-display.jsx');
var EnemyBattle = require('./enemy-battle-display.jsx');
var React = require('react');
var Battle = require('ab-game/battle')
module.exports = React.createClass({
  render : function(){
    return (
      <div>
        <PlayerBattle />
        <EnemyBattle enemy={Battle.enemy}/>
      </div>
    )
  }
});