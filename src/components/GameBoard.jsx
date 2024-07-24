// Define the GameBoard component and export it as the default export
export default function GameBoard({ onSelectSquare, board }) {
  // Render the game board as an ordered list
  return (

    <ol id="game-board">

      {board.map((row, rowIndex) => (

        // Create a list item for each row with a unique key based on the row index
        <li key={rowIndex}>

          {/* Render each row as an ordered list */}
          <ol>
            {row.map((playerSymbol, colIndex) => (

              // Create a list item for each square with a unique key based on the column index
              <li key={colIndex}>

                {/* Render a button for each square */}
               
                <button
                  // Call onSelectSquare with the row and column indices when the button is clicked
                  
                  onClick={() => onSelectSquare(rowIndex, colIndex)}
                  // Disable the button if the square is already occupied
                  disabled={playerSymbol !== null}
                >
                  {/* Display the player symbol (if any) in the button */}

                  {playerSymbol}

                </button>

              </li>

            ))}

          </ol>

        </li>

      ))}

    </ol>
    
  );
}
