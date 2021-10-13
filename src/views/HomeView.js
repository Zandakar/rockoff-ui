import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { generateId } from "../helperFuncs";
import Button from "@mui/material/Button";

/*
Sessions:
- Player clicks create game
  - add to list of active games.
  - Create sharable url
- Friend clicks link, server pairs players up
- Game starts
*/

function HomeView({ allMessages, sendMessage, displayName, setDisplayName }) {
  const handleNewGame = () => {
    console.log("handleNewGame");
    sendMessage("CREATE_GAME");
  };

  return (
    <div>
      <br></br>
      <div>{`Display name:`}</div>
      <input
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
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
