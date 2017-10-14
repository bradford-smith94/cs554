import React, {Component} from 'react';

//import strings from '../utils/strings.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

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
          <Redirect from={`${url}/`} to={`${url}/page/0`}/>
        </Switch>
      </Router>
    );
  }
}

export default Berries;
