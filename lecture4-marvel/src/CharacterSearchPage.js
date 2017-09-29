import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from "./utils/axiosinstance.js";
import CharacterList from "./CharacterList";

class CharacterSearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      characterList: []
    }
  }

  changeSearchQuery = (searchQuery) => {
    // es6 syntax {searchQuery: searchQuery}
    this.setState({ searchQuery });
  }

  async searchForMatches(searchQuery) {
    // more shorthand: searchQuery = this.state.searchQuery
    //const { searchQuery } = this.state;
    const url = `characters?nameStartsWith={searchQuery}`
    //alert(url);
    const response = await axiosInstance.get(url);
    console.log(response);

    const resultList = response.data.data.results;
    console.log(resultList);
    this.setState({ characterList: resultList });
  }

  render() {
    return (
      <div className="CharacterSearchPage">
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

export default CharacterSearchPage;
