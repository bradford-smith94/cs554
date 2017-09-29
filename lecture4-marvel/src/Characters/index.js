import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import CharacterSearchPage from "./CharacterSearch/CharacterSearchPage.js"

class Characters extends Component {
  render() {
    const {match} = this.props;
    const {url} = match;

    return(
      <Switch>
        <Route path={`${url}/`} component={CharacterSearchPage} />
      </Switch>
    );
  }
}
