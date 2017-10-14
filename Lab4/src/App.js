import React, { Component } from 'react';
import './App.css';
import strings from './utils/strings.js';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Main from './main';
import Pokemon from './pokemon';
import Berries from './berries';
import Machines from './machines';
import NotFound from './404';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link className="Header-link" to='/'>
              <h1 className="App-title">{strings.pokedex}</h1>
            </Link>
            <p className="App-intro">
              This is a simple {strings.pokedex} app designed to provide information about {strings.pokemon}, Berries and Machines.
            </p>
          </header>
          <Switch>
            <Route path='/pokemon' component={Pokemon}/>
            <Route path='/berries' component={Berries}/>
            <Route path='/machines' component={Machines}/>
            <Route path='/:error' component={NotFound}/>
            <Route path='/' component={Main}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
