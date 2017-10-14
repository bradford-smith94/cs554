import React, {Component} from 'react';

//import strings from '../../utils/strings.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

import LoadingText from '../../utils/loading.js';

class SingleBerry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      berry: undefined,
      item: undefined,
      loading: false,
      error: false,
    };
  }

  async loadBerryById(berryId) {
    try {
      this.setState({ loading: true });
      const berryResponse = await axiosInstance.get(`berry/${berryId}`);
      const berry = berryResponse.data;
      const itemResponse = await axiosInstance.get(`item/${berry.item.name}`);
      const item = itemResponse.data;
      this.setState({ loading: false, berry, item });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const requestedId = this.props.match.params.id;
    await this.loadBerryById(requestedId);
  }

  async componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id;
    const oldId = this.props.match.params.id;

    if (newId !== oldId) {
      await this.loadBerryById(newId);
    }
  }

  render() {
    let body = null;
    const { match } = this.props;
    const { url } = match;

    if (this.state.loading) {
      body = <LoadingText/>;
    } else if (this.state.berry !== undefined) {
      body = (
        <div>
          <h2>Berry: {this.state.berry.name}</h2>
          <img src={`${this.state.item.sprites.default}`} alt={`The default in-game sprite for ${this.state.berry.name}`}/>
          <ul>
            <li>Number: {this.state.berry.id}</li>
            <li>Growth Time: {this.state.berry.growth_time} hours</li>
            <li>Max Harvest: {this.state.berry.max_harvest}</li>
            <li>Size: {this.state.berry.size} millimeters</li>
          </ul>
        </div>
      );
    } else if (this.state.error) {
      body = (
        <Switch><Redirect from={`${url}`} to={'/404'}/></Switch>
      );
    } else {
      body = <div />;
    }

    return <div className="App-body">{body}</div>;
  }
}

export default SingleBerry;
