import React, {Component} from 'react';

import strings from '../utils/strings.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SinglePokemon from './single/SinlgePokemon.js';
import PagedPokemon from './page/PagedPokemon.js';

class Pokemon extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <Router>
        <div className="App-body">
          <h2>{strings.pokemon}</h2>
          <Switch>
            <Route path={`${url}/page/:page`} component={PagedPokemon}/>
            <Route path={`${url}/:id`} component={SinglePokemon}/>
            <Redirect from={`${url}/`} to={`${url}/page/0`}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Pokemon;
