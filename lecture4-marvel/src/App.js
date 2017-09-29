import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from "./utils/axiosinstance.js";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import CharacterSearchPage from "./CharacterSearchPage.js";
import SingleCharacter from "./SingleCharacter.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>{this.props.title}</h2>
            <cite>
              Brought to you by {this.props.author} on{" "}{this.props.now.toDateString()}
            </cite>
          </div>
          <div className="App-body">
            <Switch>
              <Route path="/character/:id" component={SingleCharacter}/>
              <Route path="/" component={CharacterSearchPage}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
