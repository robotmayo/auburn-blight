var Router = require('react-router');
var React = require('react');
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Game = require('ab-game/game');
console.log(Game);
var Header = React.createClass({
  render : function(){
    return (
      <nav>
        <ul>
          <li><Link to="app">Status</Link></li>
          <li><Link to="settings">Settings</Link></li>
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

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="settings" path="settings" handler={Settings}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});