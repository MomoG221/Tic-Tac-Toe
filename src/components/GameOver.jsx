// Define the GameOver component and export it as the default export
export default function GameOver({ winner, onRestart }) {
    
    // Render the game over message and the rematch button
    
    return (

      <div id="game-over">
        {/* Display a heading indicating the game is over */}
        

        <h2>Game Over!</h2>
        {/* Conditionally render a message showing the winner if there is one */}
       
        {winner && <p>{winner} won!</p>}
       
        {/* Conditionally render a message indicating a draw if there is no winner */}
        {!winner && <p>It's a draw!</p>}
       
        {/* Render a button to restart the game, with an onClick handler for restarting */}
        <p><button onClick={onRestart}>Rematch!</button></p>
     
      </div>
    
);

}
  