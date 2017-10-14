import React, {Component} from 'react';

//import strings from '../../utils/strings.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

class SinglePokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemon: undefined,
      loading: false,
      error: false,
    };
  }

  async loadPokemonById(pokeId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`pokemon/${pokeId}`);
      const pokemon = response.data;
      this.setState({loading: false, pokemon });
    } catch (e) {
      this.setState({ loading: false });
      this.setState({ error: true });
    }
  }

  async componentDidMount() {
    const requestedId = this.props.match.params.id;
    await this.loadPokemonById(requestedId);
  }

  async componentWillReceiveProps(nextProps) {
    const newId = nextProps.match.params.id;
    const oldId = this.props.match.params.id;

    if (newId !== oldId) {
      await this.loadPokemonById(newId);
    }
  }

  render() {
    let body = null;
    const { match } = this.props;
    const { url } = match;

    if (this.state.loading) {
      body = <div>Loading...</div>
    } else if (this.state.pokemon) {
      body = (
        <div>
          <h2>{this.state.pokemon.name}</h2>
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

export default SinglePokemon;
