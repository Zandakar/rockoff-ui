import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useHistory } from "react-router-dom";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

export const COMMANDS = {
  CLIENT_CONNECTED_ACK: "CLIENT_CONNECTED_ACK",
  CONNECTED: "CONNECTED",
  CREATE_GAME: "CREATE_GAME",
  GAME_CREATED: "GAME_CREATED",
  GAME_JOINED: "GAME_JOINED",
};

const messageBuffer = [];

export default function WSHandler(props = {}) {
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  const history = useHistory();

  useEffect(() => {
    if (client.readyState === 1 && clientId) {
      messageBuffer.forEach(({ command = "", params = {} }) => {
        sendMessage(command, params);
      });
    }
  }, [client.readyState, clientId]);

  client.onopen = (WebSocket) => {
    console.log("WebSocket Client Connected");
  };

  client.onmessage = ({ data } = {}) => {
    console.log("receiving data from server:");
    console.log(data);
    try {
      const { command = "", clientId = "", ...rest } = JSON.parse(data);

      if (command === COMMANDS.CONNECTED) {
        setClientId(clientId);
        sendMessage(COMMANDS.CLIENT_CONNECTED_ACK);
      }

      if (command === COMMANDS.GAME_CREATED) {
        history.push(`/game/${rest.gameId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (command = "", params = {}) => {
    if (client.readyState === 0 || !clientId) {
      const messageParams = { command, params };
      messageBuffer.unshift(messageParams);
    } else {
      try {
        const payload = JSON.stringify({
          params,
          command,
          clientId,
        });
        client.send(payload);
      } catch (e) {
        console.error(e);
      }
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
