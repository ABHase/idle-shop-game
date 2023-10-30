import React from "react";
import "./App.css";
import GameComponent from "./GameComponent"; // Import the GameComponent

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Idle Shop Game</h1> {/* Add a title if you want */}
        <GameComponent /> {/* Use the GameComponent here */}
      </header>
    </div>
  );
}

export default App;
