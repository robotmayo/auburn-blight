var Router = require('react-router');
var React = require('react');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Game = require('ab-game/game');
Player.init()
Game.start();
var Header = React.createClass({
  render : function(){
    return (
      <nav>
        <ul>
          <li><Link to="app">Status</Link></li>
          <li><Link to="battle">Battle</Link></li>
        </ul>
      </nav>
    )
  }
});

var Settings = React.createClass({
  render : function(){
    return (
      <h1>Settings</h1>
    )
  }
});

var App = React.createClass({
  render : function(){
    return (
      <div>
        <Header/>
        <RouteHandler/>
      </div>
    );
  }
});

var Skills = React.createClass({
  clickHandler : function(e, skill){

  },
  render : function(){
    var skillList = Object.keys(Player.activeSkills).map(function(k){
      var s = Player.activeSkills[k];
      console.log(s)
      return <li><button onClick={this.clickHandler.bind(this, s)}>{s.name}</button></li>
    })
    return (
      <ul>{skillList} </ul>
    );
  }
});

var PlayerBattle = React.createClass({
  render : function(){
    return (
      <div>
        <h3>Player</h3>
        <Skills />
      </div>
    );
  }
});

var EnemyBattle = React.createClass({
  render : function(){
    return (
      <h3>Enemy</h3>
    );
  }
});

var Battle = React.createClass({
  render : function(){
    return (
      <div>
        <PlayerBattle />
        <EnemyBattle />
      </div>
    )
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="battle" path="battle" handler={Battle}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});