import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [hasWinner, setHasWinner] = useState(false);
  const WINNING_COMBOS = [
    [0, 1, 2], // 1st row
    [3, 4, 5], // 2nd row
    [6, 7, 8], // 3rd row
    [0, 3, 6], // 1st column
    [1, 4, 7], // 2nd column
    [2, 5, 8], // 3rd column
    [0, 4, 8], // Diagonal
    [2, 4, 6], // Diagonal
  ];
  const handleClick = (e) => {
    console.log(e.target.id); // numbers 0-8
    if (hasWinner === false) {
      const boardCopy = [...board];
      if (boardCopy[e.target.id] === "") {
        boardCopy[e.target.id] = currentPlayer;
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setBoard(boardCopy);
      }
    }
  };
  const resetGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setHasWinner(false);
  };
  useEffect(() => {
    WINNING_COMBOS.forEach((combo) => {
      // First time combo is [0,1,2]
      let joined = combo.map((i) => {
        // First time i is 0
        // Second time i is 1
        // Third time i is 2
        return board[i];
      });
      console.log(joined);
      if (joined.join("") === "XXX") {
        setWinner("X");
        setHasWinner(true);
      } else if (joined.join("") === "OOO") {
        setWinner("O");
        setHasWinner(true);
      } else if (
        joined.join("") !== "XXX" &&
        joined.join("") !== "OOO" &&
        board.join("").length === 9
      ) {
        setWinner("draw");
      }
    });
  }, [board]);
  console.log(winner);
  return (
    <div className="App" style={{ height: "100vh", width: "100vw" }}>
      <h1>REACT TIC TAC TOE</h1>
      <div className="currentPlayerMessage">
        Current Player is: {currentPlayer}{" "}
      </div>
      <div
        className="Board"
        style={{ height: "70vh", width: "70vh", border: "2px solid black" }}
      >
        {board.map((value, index) => {
          return (
            <div className="Box" onClick={handleClick} key={index} id={index}>
              {value}
            </div>
          );
        })}
      </div>
      <div className="winner">
        {winner === "draw" ? "It's a draw!" : `Winner is ${winner}`}
      </div>
      <div>
        <button className="resetButton" onClick={resetGame}>
          Reset/Restart
        </button>
      </div>
    </div>
  );
}
export default App;

//...........THERE IS A BUG :
//...........IF PLAYER PLAYS THE LAST SQUARE AND WINS,
//...........ITS CONSIDERED A DRAW zzzz
