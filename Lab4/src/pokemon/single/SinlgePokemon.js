import React, {Component} from 'react';

import strings from '../../utils/strings.js';

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id
    }
  }

  render() {
    return (
      <h3>Single {strings.pokemon} Page</h3>
    );
  }
}

export default SinglePokemon;
