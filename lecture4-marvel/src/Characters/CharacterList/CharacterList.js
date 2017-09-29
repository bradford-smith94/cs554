import React, { Component } from "react";

class CharacterList extends Component {
  render() {
    if (this.props.characters.length === 0) {
      return <small>No characters!</small>;
    }

    const characterDisplays = characters.map(character => {
      const description = character.description ? (
        <p>{character.description}</p>
      ) : null;

      const { thumbnail } = character;
      const picture = thumbnail ? (
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={character.name}
        />
      ) : null;

      return (
        <div key={character.id}>
          <h3>{character.name}</h3>
          {description}
          {picture}
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
