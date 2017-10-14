import React, {Component} from 'react';

//import strings from '../utils/strings.js';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class Main extends Component {
  render() {
    let body = null;

    if (this.props.match.params.error !== '404') {
      body = (
        <div>
          <h2>404 Not Found</h2>
          <p>
            The page "{this.props.match.params.error}" doesn't seem to exist, how about you just take if from the <Link to='/'>top</Link>?
          </p>
        </div>
      );
    } else {
      body = (
        <div>
          <h2>404 Not Found</h2>
          <p>
            That page doesn't seem to exist, how about you just take if from the <Link to='/'>top</Link>?
          </p>
        </div>
      );
    }

    return <div className="App-body">{body}</div>;
  }
}

export default Main;
