import React, { Component } from "react";
import "./App.css";
import axiosInstance from "./utils/axiosInstance";

import CharacterList from "./CharacterList";

class CharacterSearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: "",
      characterList: []
    };
  }

  changeSearchQuery(searchQuery) {
    this.setState({ searchQuery });
  }

  async searchForMatches(searchQuery) {
    const url = `characters?nameStartsWith=${searchQuery}`;
    const response = await axiosInstance.get(url);

    const resultList = response.data.data.results;
    this.setState({ characterList: resultList });
  }

  render() {
    //    alert("Hello -- ");
    return (
      <div className="character-search-page">
        <p className="App-intro">
          To get started, please input a hero or heroine's name below.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            this.searchForMatches(this.state.searchQuery);
          }}
        >
          <input
            type="text"
            onChange={e => {
              e.preventDefault();
              this.changeSearchQuery(e.target.value);
            }}
            value={this.state.searchQuery}
          />
          <button type="submit">Search!</button>
        </form>
        <hr />
        <CharacterList characters={this.state.characterList} />
      </div>
    );
  }
}
export default CharacterSearchPage;
