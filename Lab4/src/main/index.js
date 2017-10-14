import React, {Component} from 'react';

import strings from '../utils/strings.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App-body">
          <Link to='/pokemon/page/0'>
            <h2>{strings.pokemon}</h2>
          </Link>
          <p>
            {strings.pokemon} are the creatures that inhabit the world and can be captured, trained and battled.
            They come in a wide variety of species each with their own series of evolutions.
          </p>
          <Link to='/berries/page/0'>
            <h2>Berries</h2>
          </Link>
          <p>
            Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by {strings.pokemon}.
          </p>
          <Link to='/machines/page/0'>
            <h2>Machines</h2>
          </Link>
          <p>
            Machines are the representation of items that teach moves to {strings.pokemon}.
            They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
          </p>
        </div>
      </Router>
    );
  }
}

export default Main;
