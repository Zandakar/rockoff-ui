import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import WSHandler from "../src/services/WSHandler";

const client = WSHandler();

/*
Sessions:
- Player clicks create game
  - add to list of active games.
  - Create sharable url
- Friend clicks link, server pairs players up
- Game starts
*/

const generateGameId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + "-" + s4() + "-" + s4();
};

function MainView(props) {
  const [allMessages, setAllMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  const history = useHistory();

  useEffect(() => {
    client.onopen = (connection) => {
      console.log("WebSocket Client Connected");
      console.log(connection);
    };
    client.onmessage = ({ data } = {}) => {
      console.log("message data");
      console.log(data);
      try {
        const parsedMessage = JSON.parse(data);
        if (parsedMessage.message) {
          setAllMessages([...allMessages, parsedMessage.message]);
        }

        if (parsedMessage.connection) {
          if (parsedMessage.connection === "ok") {
            setClientId(parsedMessage.clientId);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
  });

  const handleSendMessage = () => {
    console.log("clicky");
    try {
      const payload = JSON.stringify({
        message: currentMessage,
        clientId,
        displayName,
      });
      client.send(payload);

      setCurrentMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  const createMessageDivs = () =>
    allMessages.map((message, index) => {
      return <div key={index}>{message}</div>;
    });

  const handleNewGame = () => {
    console.log("handleNewGame");
    const gameId = generateGameId();

    history.push(`/game/${gameId}`);

    console.log(gameId);
  };

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

export default MainView;
