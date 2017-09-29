import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from "./utils/axiosinstance.js";
import CharacterList from "./CharacterList";

class SingleCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characterData: undefined,
      loading: false
    }
  }

  async componentDidMount() {
    /* runs the first time the page is displayed */
    const characterId = this.props.match.params.id;
    try {
      this.setState({loading: true});
      const response = await axiosInstance.get(`characters/${characterId}`);
    } catch (e) {
      this.setState({loading: false});
    }
  }

  async componentWillReceiveProps(nextProps) {
    /* runs on subsequent reloads with new properties */
  }

  render() {
    return (
      <div className="single-character-page">
      </div>
    );
  }
}

export default SingleCharacter;
