// Import the useState hook from React
import { useState } from 'react';

// Import components
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';

// Import winning combinations for the game logic
import { WINNING_COMBINATIONS } from './winning-combinations.js';

// Define the initial game board state, a 3x3 grid with null values
const initialGameBoard = [

  [null, null, null],
  [null, null, null],
  [null, null, null],

];

// Function to derive the active player based on the game turns
function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X'; // Default to 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    
    currentPlayer = 'O'; // Switch to 'O' if the last player was 'X'
  
  }
  
  return currentPlayer;

}

function App() {
  // Define state for players, initialized to 'Player 1' and 'Player 2'
  const [players, setPlayers] = useState({
    
    'X': 'Player 1',
    'O': 'Player 2',

  });

  // Define state for game turns, initialized to an empty array
  const [gameTurns, setGameTurns] = useState([]);
  
  // Determine the active player based on the game turns
  const activePlayer = deriveActivePlayer(gameTurns);

  // Clone the initial game board to avoid direct mutation
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  // Update the game board based on the game turns
  for (const turn of gameTurns) {

    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
    
  }

  // Determine if there is a winner by checking the winning combinations
  let winner = "";
  for (const combination of WINNING_COMBINATIONS) {
    
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {

      winner = players[firstSquareSymbol];

    }

  }

  // Determine if the game is a draw (all squares filled with no winner)
  const hasDraw = gameTurns.length === 9 && !winner;

  // Handler for selecting a square, adds a new turn to the gameTurns state
  function handleSelectSquare(rowIndex, colIndex) {

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;

    });

  }

  // Handler for restarting the game, resets the gameTurns state
  function handleRestart() {

    setGameTurns([]);
    
  }

  // Handler for changing a player's name, updates the players state
  function handlePlayerNameChange(symbol, newName) {

    setPlayers((prevPlayers) => {

      return {

        ...prevPlayers,
        [symbol]: newName,

      };

    });
    
  }

  // Render the main game interface
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart} />)}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
