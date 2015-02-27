var React = require('react');
var SkillBattleButtons = require('./skill-battle-display.jsx');
var Battle = require('ab-game/battle');
var Stat = require('./stat.jsx');
var Gevent = require('ab-game/gevent');
module.exports = React.createClass({
  render : function(){
    return (
      <div>
        <h1>Player</h1>
        <Stat stat={this.props.player.stats.hp} current={true} max={true}/>
        <Stat stat={this.props.player.stats.ap} current={true} max={true}/>
        <SkillBattleButtons enemy={this.props.enemy}/>
      </div>
    )
  }
});