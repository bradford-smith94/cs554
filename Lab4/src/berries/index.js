import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SingleBerry from './single/SingleBerry.js';
import PagedBerries from './page/PagedBerries.js';

class Berries extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <Router>
        <Switch>
          <Route path={`${url}/page/:page`} component={PagedBerries}/>
          <Route path={`${url}/:id`} component={SingleBerry}/>
        </Switch>
      </Router>
    );
  }
}

export default Berries;
