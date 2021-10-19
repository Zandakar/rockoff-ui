import React, { useState } from "react";
import Button from "@mui/material/Button";
import { COMMANDS } from "../providers/WSProvider";

/*
Sessions:
- Player clicks create game
  - add to list of active games.
  - Create sharable url
- Friend clicks link, server pairs players up
- Game starts
*/

function HomeView({
  sendMessage,
  displayName,
  setDisplayName,
  updateDisplayName,
}) {
  const [hasChangedDisplayName, setHasChangedDisplayName] = useState(false);

  const handleNewGame = () => {
    console.log("handleNewGame");
    sendMessage(COMMANDS.CREATE_GAME);
  };

  return (
    <div>
      <br></br>
      <div>{`Display name:`}</div>
      <input
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
          setHasChangedDisplayName(true);
        }}
        onBlur={(e) => {
          console.log("onBlur");
          if (hasChangedDisplayName) {
            console.log("onBlur if");
            updateDisplayName(e.target.value);
            setHasChangedDisplayName(false);
          }
        }}
      ></input>
      <br></br>
      <br></br>
      <Button variant="contained" onClick={() => handleNewGame()}>
        VS. a friend
      </Button>
      <br></br>
    </div>
  );
}

export default HomeView;
