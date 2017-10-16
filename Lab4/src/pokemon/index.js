import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SinglePokemon from './single/SinlgePokemon.js';
import PagedPokemon from './page/PagedPokemon.js';

class Pokemon extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <Router>
        <Switch>
          <Route path={`${url}/page/:page`} component={PagedPokemon}/>
          <Route path={`${url}/:id`} component={SinglePokemon}/>
        </Switch>
      </Router>
    );
  }
}

export default Pokemon;
