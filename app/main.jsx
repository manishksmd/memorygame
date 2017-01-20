import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,IndexRoute, Link, browserHistory } from 'react-router'
import App from './components/App/App';
import GameView from './components/App/game/game_view';
import GameStarter from './components/App/game/game_starter';

ReactDOM.render(	
	<Router history={browserHistory}>
    <Route path="/" component={App}>
	  <IndexRoute component={GameStarter}/>
      <Route path="gameview" component={GameView}/>      
      <Route path="*" component={GameStarter}/>
    </Route>
  </Router>,
	document.body.appendChild(document.createElement('div')),	
);
