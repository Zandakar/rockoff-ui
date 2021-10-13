import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

const COMMANDS = {
  CLIENT_ACK: "CLIENT_ACK",
  CONNECTED: "CONNECTED",
  CREATE_GAME: "CREATE_GAME",
  GAME_CREATED: "GAME_CREATED",
};

export default function WSHandler(props = {}) {
  const [allMessages, setAllMessages] = useState([]);
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  console.log(client);

  client.onopen = (connection) => {
    console.log("WebSocket Client Connected");
    console.log(connection);
  };

  client.onmessage = ({ data } = {}) => {
    console.log("message data");
    console.log(data);
    try {
      const parsedMessage = JSON.parse(data);

      if (parsedMessage.command === COMMANDS.CONNECTED) {
        setClientId(parsedMessage.clientId);
        sendMessage(COMMANDS.CLIENT_ACK, {}, parsedMessage.clientId);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (command = "", params = {}, clientIdBootstrap = "") => {
    try {
      const payload = JSON.stringify({
        ...params,
        command,
        clientId: clientId ? clientId : clientIdBootstrap,
      });
      client.send(payload);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {React.cloneElement(props.children, {
        displayName,
        setDisplayName,
        sendMessage,
      })}
    </div>
  );
}
