var React = require('react');
var Player = require('ab-game/player');
module.exports = React.createClass({
  render : function(){
    return <h1>{Player.name}</h1>
  }
});