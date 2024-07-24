// Import the useState hook from React
import { useState } from 'react';

// Define the Player component and export it as the default export
export default function Player({ initialName, symbol, isActive, onChangeName }) {
  // Initialize state for the player's name with the initialName prop
  const [playerName, setPlayerName] = useState(initialName);
  // Initialize state to track if the player name is being edited
  const [isEditing, setIsEditing] = useState(false);

  // Handler for the edit button click event
  function handleEditClick() {
    // Toggle the isEditing state
    setIsEditing((editing) => !editing);
    // If switching from editing to not editing, call onChangeName with the updated playerName
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  // Handler for the input change event, updates the playerName state
  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  // Variable to store the JSX for the player's name, initially a span element
  let editablePlayerName = <span className="player-name">{playerName}</span>;

  // If in editing mode, change the editablePlayerName to an input element
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  // Render the player item
  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
