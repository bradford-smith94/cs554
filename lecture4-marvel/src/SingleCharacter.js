import React, { Component } from "react";
import "./App.css";
import axiosInstance from "./utils/axiosInstance";

class SingleCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: undefined,
      loading: false
    };
  }

  async loadCharacterById(characterId) {
    try {
      this.setState({ loading: true });
      const response = await axiosInstance.get(`characters/${characterId}`);
      const character = response.data.data.results[0];
      this.setState({ loading: false, character });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const characterId = this.props.match.params.id;
    await this.loadCharacterById(characterId);
  }

  async componentWillReceiveProps(nextProps) {
    const characterId = nextProps.match.params.id;
    const oldCharacterId = this.props.match.params.id;

    if (characterId !== oldCharacterId) {
      await this.loadCharacterById(characterId);
    }
  }

  render() {
    let body = null;

    if (this.state.loading) {
      body = <div>Loading...</div>;
    } else if (this.state.character) {
      body = (
        <div>
          <h2>{this.state.character.name}</h2>
          <hr />
        </div>
      );
    } else {
      body = <div />;
    }

    return <div className="single-character-page">{body}</div>;
  }
}

export default SingleCharacter;
