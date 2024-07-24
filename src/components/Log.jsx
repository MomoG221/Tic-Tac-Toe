// Define the Log component and export it as the default export
export default function Log({ turns }) {
    // Render an ordered list containing the game turns
    return (
      <ol id="log">
        {turns.map((turn) => (
          // Create a list item for each turn with a unique key based on the square's row and column
          <li key={`${turn.square.row}${turn.square.col}`}>
            {/* Display the player who made the turn */}
            {turn.player} 
            {/* Display the text 'selected' */}
            selected 
            {/* Display the row and column of the selected square */}
            {turn.square.row},
            {turn.square.col}
          </li>
        ))}
      </ol>
    );
  }
  