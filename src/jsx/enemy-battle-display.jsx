var React = require('react');
var Stat = require('./stat.jsx');
module.exports = React.createClass({
  render : function(){
    return (
      <div>
        <h1>{this.props.enemy.name}</h1>
        <Stat stat={this.props.enemy.stats.hp} current={true} max={true}/>
      </div>
      )
  }
});