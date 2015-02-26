var React = require('react');
var Player = require('player');
module.exports = React.createClass({
  render : function(){
    console.log(kappa)
    var skillList = Object.keys(Player.activeSkills).map(function(k){
      var s = Player.activeSkills[k];
      return <li><button onClick={Player.useSkill.bind(Player, s, this.props.enemy)} data={s}>{s.name}</button></li>
    }, this)
    return (
      <ul>{skillList} </ul>
    );
  }
});