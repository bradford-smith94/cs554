import React, {Component} from 'react';

import strings from '../../utils/strings.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { BrowserRouter as Switch, Redirect } from 'react-router-dom';

import LoadingText from '../../utils/loading.js';

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
      body = <LoadingText/>;
    } else if (this.state.pokemon !== undefined) {
      let height = this.state.pokemon.height * .1;
      if (height != 1) {
        height = <li>Height: {height} meters</li>
      } else {
        height = <li>Height: {height} meter</li>
      }

      let weight = this.state.pokemon.weight * .1;
      if (weight != 1) {
        weight = <li>Weight: {weight} kilograms</li>
      } else {
        weight = <li>Weight: {weight} kilogram</li>
      }

      let types = '';
      if (this.state.pokemon.types.length > 1) {
        types += this.state.pokemon.types[0].type.name;
        for (let i = 1; i < this.state.pokemon.types.length; i++) {
          types += ', ' + this.state.pokemon.types[i].type.name
        }
        types = <li>Types: {types}</li>
      } else {
        types = <li>Type: {this.state.pokemon.types[0].type.name}</li>
      }

      body = (
        <div>
          <h2>{strings.pokemon}: {this.state.pokemon.name}</h2>
          <img src={`${this.state.pokemon.sprites.front_default}`} alt={`The default front in-game sprite for ${this.state.pokemon.name}`}/>
          <ul>
            <li>Number: {this.state.pokemon.id}</li>
            {height}
            {weight}
            {types}
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

export default SinglePokemon;
