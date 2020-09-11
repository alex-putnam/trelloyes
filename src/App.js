import React from "react";
import List from "./List";
import STORE from "./STORE";
import "./App.css";

function omit(obj, keyToOmit) {
  let { [keyToOmit]: _, ...rest } = obj;
  return rest;
}

class App extends React.Component {
  state = {
    store: STORE,
  };

  handleDeleteCard = (cardId) => {
    console.log("handle deleted card called", { cardId });
    const newLists = this.state.store.lists.map((list) => ({
      ...list,
      cardIds: list.cardIds.filter((id) => id !== cardId),
    }));
    const newCards = omit(this.state.store, cardId);
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards,
      },
    });
  };

  handleAddRandomCard() {
    console.log("handle add random card called");
  }

  render() {
    return (
      <main className="App">
        <header className="App-header">
          <h1>Trelloyes!</h1>
        </header>
        <div className="App-list">
          {this.state.store.lists.map((list) => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map((id) => this.state.store.allCards[id])}
              onDeleteCard={this.handleDeleteCard}
              onAddRandomCard={this.handleAddRandomCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
