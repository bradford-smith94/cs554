import React, {Component} from 'react';

import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

import LoadingText from '../../utils/loading.js';

class SingleMachine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machine: undefined,
      item: undefined,
      loading: false,
      error: false,
    };
  }

  async loadMachineById(machineId) {
    try {
      this.setState({ loading: true });
      const machineResponse = await axiosInstance.get(`machine/${machineId}`);
      const machine = machineResponse.data;
      const itemResponse = await axiosInstance.get(`item/${machine.item.name}`);
      const item = itemResponse.data;
      this.setState({ loading: false, machine, item });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const requestedId = this.props.match.params.id;
    await this.loadMachineById(requestedId);
  }

  async componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id;
    const oldId = this.props.match.params.id;

    if (newId !== oldId) {
      await this.loadMachineById(newId);
    }
  }

  render() {
    let body = null;
    const { match } = this.props;
    const { url } = match;

    if (this.state.loading) {
      body = <LoadingText/>
    } else if (this.state.machine !== undefined) {
      let name = this.state.item.name + ' (' + this.state.machine.move.name + ')';
      body = (
        <div>
          <h2>Machine: {name}</h2>
          <img src={`${this.state.item.sprites.default}`} alt={`The default in-game sprite for ${this.state.item.name}`}/>
          <ul>
            <li>Number: {this.state.machine.id}</li>
            <li>Move: {this.state.machine.move.name}</li>
            <li>Version: {this.state.machine.version_group.name}</li>
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

export default SingleMachine;
