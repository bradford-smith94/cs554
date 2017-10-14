import React, {Component} from 'react';

//import strings from '../../utils/strings.js';

class SingleBerry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id
    }
  }

  render() {
    return (
      <h3>Single Berry Page</h3>
    );
  }
}

export default SingleBerry;
