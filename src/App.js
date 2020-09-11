import React from "react";
import List from "./List";
import STORE from "./STORE";
import "./App.css";

const newRandomCard = () => {
  const id =
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: "lorem ipsum",
  };
};

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
    const newCards = omit(this.state.store.allCards, cardId);
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards,
      },
    });
  };

  handleAddRandomCard = (listId) => {
    console.log("handle add random card called", { listId });
    const newCard = newRandomCard();
    const newLists = this.state.store.lists.map((list) => {
      if (list.id === listId) {
        return {
          ...list,
          cardIds: [...list.cardIds, newCard.id],
        };
      }
      return list;
    });

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard,
        },
      },
    });
  };

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
