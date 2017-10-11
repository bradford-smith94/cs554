import React, {Component} from 'react';

import strings from '../../utils/strings.js';

class PagedPokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.match.params.page
    };
  }

  render() {
    return (
      <h3>Paged {strings.pokemon} Page</h3>
    );
  }
}

export default PagedPokemon;
