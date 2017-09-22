import React, { Component } from "react";

class CharacterList extends Component {
  render() {
    if (this.props.characters.length === 0) {
      return <small>No characters!</small>;
    }

    const characterDisplays = this.props.characters.map((character) => {
      return (
        <div key={character.id}>
          <h3>{character.name}</h3>
          <p>{character.description}</p>
        </div>
      );
    })

    return (
      <section>
      <h2>Characters</h2>
      {characterDisplays}
      </section>
    );
  }
}

export default CharacterList;
