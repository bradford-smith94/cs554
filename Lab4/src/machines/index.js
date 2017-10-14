import React, {Component} from 'react';

//import strings from '../utils/strings.js';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import SingleMachine from './single/SingleMachine.js';
import PagedMachines from './page/PagedMachines.js';

class Machines extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;
    return (
      <Router>
        <div className="App-body">
          <h2>Machines</h2>
          <Switch>
            <Route path={`${url}/page/:page`} component={PagedMachines}/>
            <Route path={`${url}/:id`} component={SingleMachine}/>
            <Redirect from={`${url}/`} to={`${url}/page/0`}/>
          </Switch>
      </div>
      </Router>
    );
  }
}

export default Machines;
