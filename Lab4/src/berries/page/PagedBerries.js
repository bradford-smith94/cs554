import React, {Component} from 'react';

//import strings from '../../utils/strings.js';

class PagedBerries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: this.props.match.params.page
    };
  }

  render() {
    return (
      <h3>Paged Berries Page</h3>
    );
  }
}

export default PagedBerries;
