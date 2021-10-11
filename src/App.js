import React, { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

/*
Sessions:
- Player clicks create game
  - add to list of active games.
  - Create sharable url
- Friend clicks link, server pairs players up
- Game starts
*/

function App(props) {
  const [allMessages, setAllMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  const urlParams = window.location.href.split("/").splice(3);

  console.log(`---------- urlParams ----------`);
  console.log(urlParams);

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
      <button onClick={() => handleSendMessage()}>send message</button>
      <div>{`All Messages: `}</div>
      {createMessageDivs()}
    </div>
  );
}

export default App;
