var React = require('react');
var Gevent = require('ab-game/gevent');
module.exports = React.createClass({
  render : function(){
    var list = [<span>{this.props.stat.name}: </span>];
    if(this.props.current){
      list.push(<span>{Math.floor(this.props.stat.current)}</span>);
    }
    if(this.props.max){
      list.push(<span> / {Math.floor(this.props.stat.max)}</span>);
    }
    return <div>{list}</div>
  }
})