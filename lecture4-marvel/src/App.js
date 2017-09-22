import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import CharacterList from "./CharacterList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      characterList: []
    }
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
  }

  changeSearchQuery = (searchQuery) => {
    // es6 syntax {searchQuery: searchQuery}
    this.setState({ searchQuery });
  }

  async searchForMatches(searchQuery) {
    // more shorthand: searchQuery = this.state.searchQuery
    //const { searchQuery } = this.state;
    const url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith={searchQuery}&apikey=<m-api-key>`
    //alert(url);
    const response = await axios.get(url);
    console.log(response);

    const resultList = response.data.data.results;
    console.log(resultList);
    this.setState({ characterList: resultList });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.props.title}</h2>
          <cite>
            Brought to you by {this.props.author} on{" "}{this.props.now.toDateString()}
          </cite>
        </div>
        <p className="App-intro">
          To get started, please input a hero or heroine's name below.
        </p>
        <form onSubmit={e => {
          e.preventDefault();
          this.searchForMatches(this.state.searchQuery);
        }}>
          <input type="text"
            onChange={e => {
              e.preventDefault();
              this.changeSearchQuery(e.target.value);
            }}
            value={this.state.searchQuery}/>
          <button type="submit">Search!</button>
        </form>
        <hr/>
        <CharacterList characters={this.state.characterList}/>
      </div>
    );
  }
}

export default App;
