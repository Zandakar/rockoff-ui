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

const generateGameId = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return "game" + "-" + s4() + "-" + s4() + "-" + s4();
};

function WebsocketProvider(props) {
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

  return {
    ...props.children,
    clientId,
    handleSendMessage,
  };
}

export default WebsocketProvider;
