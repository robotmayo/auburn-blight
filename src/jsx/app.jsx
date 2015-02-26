var Router = require('react-router');
var React = require('react');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Game = require('ab-game/game');
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

var BattleDisplay = require('./battle-display.jsx')
var b = require('ab-game/battle');
var e = require('ab-game/entity');
var p = require('ab-game/player');
p.init();
b.start(new e())
var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="battle" path="battle" handler={BattleDisplay}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});