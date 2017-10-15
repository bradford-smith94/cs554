import React, {Component} from 'react';

import strings from '../utils/strings.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div className="App-body">
        <article>
          <Link to='/pokemon/page/0'>
            <h2>{strings.pokemon}</h2>
          </Link>
          <p>
            {strings.pokemon} are the creatures that inhabit the world and can be captured, trained and battled.
            They come in a wide variety of species each with their own series of evolutions.
          </p>
          <p>
            You can search for a specific {strings.pokemon} by navigating to /pokemon/:id where ':id' is the ID or name of a {strings.pokemon}.
            Alternatively, you can click on the link above (or navigate to /pokemon/page/0) to get a paginated list of all the {strings.pokemon} accessible via the {strings.api}.
            You can also navigate to a specific page via /pokemon/page/:page, where ':page' is the page number you want.
          </p>
        </article>
        <article>
          <Link to='/berries/page/0'>
            <h2>Berries</h2>
          </Link>
          <p>
            Berries are small fruits that can provide HP and status condition restoration, stat enhancement, and even damage negation when eaten by {strings.pokemon}.
          </p>
          <p>
            You can search for a specific Berry by navigating to /berries/:id where ':id' is the ID or name of a Berry.
            Alternatively, you can click on the link above (or navigate to /berries/page/0) to get a paginated list of all the Berries accessible via the {strings.api}.
            You can also navigate to a specific page via /berries/page/:page, where ':page' is the page number you want.
          </p>
        </article>
        <article>
          <Link to='/machines/page/0'>
            <h2>Machines</h2>
          </Link>
          <p>
            Machines are the representation of items that teach moves to {strings.pokemon}.
            They vary from version to version, so it is not certain that one specific TM or HM corresponds to a single Machine.
          </p>
          <p>
            You can search for a specific Machine by navigating to /machines/:id where ':id' is the ID or name of a Machine.
            Alternatively, you can click on the link above (or navigate to /machines/page/0) to get a paginated list of all the Machines accessible via the {strings.api}.
            You can also navigate to a specific page via /machines/page/:page, where ':page' is the page number you want.
          </p>
        </article>
      </div>
    );
  }
}

export default Main;
