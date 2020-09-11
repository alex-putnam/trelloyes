import React from "react";
import List from "./List";
import STORE from "./STORE";
import "./App.css";

class App extends React.Component {
  state = {
    store: STORE,
  };

  handleDeleteCard(id) {
    console.log("handle deleted card called", { id });
  }

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
