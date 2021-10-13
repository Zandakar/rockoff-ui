import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

export const COMMANDS = {
  CLIENT_CONNECTED_ACK: "CLIENT_CONNECTED_ACK",
  CONNECTED: "CONNECTED",
  CREATE_GAME: "CREATE_GAME",
  GAME_CREATED: "GAME_CREATED",
};

export default function WSHandler(props = {}) {
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  console.log(client);

  client.onopen = (connection) => {
    console.log("WebSocket Client Connected");
    console.log(connection);
  };

  client.onmessage = ({ data } = {}) => {
    console.log("onmessage data");
    console.log(data);
    try {
      const { command = "", clientId = "" } = JSON.parse(data);

      if (command === COMMANDS.CONNECTED) {
        setClientId(clientId);
        // Sending CLIENT_CONNECTED_ACK from a CONNECTED event throws errors that it's too soon
        // Need to set clientId manually
        sendMessage(COMMANDS.CLIENT_CONNECTED_ACK, {}, clientId);
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
