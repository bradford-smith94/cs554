import React, {Component} from 'react';

//import strings from '../utils/strings.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <Router>
        <div className="App-body">
          <h2>404 Not Found</h2>
          <p>
            That page doesn't seem to exist, how about you just take if from the <Link to='/'>top</Link>?
          </p>
        </div>
      </Router>
    );
  }
}

export default Main;
