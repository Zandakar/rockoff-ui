import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { generateId } from "../helperFuncs";

/*
Sessions:
- Player clicks create game
  - add to list of active games.
  - Create sharable url
- Friend clicks link, server pairs players up
- Game starts
*/

function HomeView({ allMessages, sendMessage, displayName, setDisplayName }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const history = useHistory();

  const handleSendMessage = () => {
    console.log("clicky");
    sendMessage(currentMessage);
    setCurrentMessage("");
  };

  const handleNewGame = () => {
    console.log("handleNewGame");
    const gameId = generateId();

    history.push(`/game/${gameId}`);
  };

  const createMessageDivs = () =>
    allMessages.map((message, index) => {
      return <div key={index}>{message}</div>;
    });

  return (
    <div>
      {`Best message app ever`}
      <br></br>
      <div>{`Display name:`}</div>
      <input
        value={displayName}
        onChange={(e) => {
          setDisplayName(e.target.value);
        }}
      ></input>
      <br></br>
      <div>{`Message:`}</div>
      <input
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>
      <br></br>
      <button onClick={() => handleNewGame()}>Invite a friend</button>
      <br></br>
      <button onClick={() => handleSendMessage()}>send message</button>
      <div>{`All Messages: `}</div>
      {createMessageDivs()}
    </div>
  );
}

export default HomeView;
