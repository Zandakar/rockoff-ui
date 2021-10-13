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

export default function WSHandler(props = {}) {
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");
  const [messageBuffer, setMessageBuffer] = useState([]);

  const history = useHistory();

  console.log(client);

  useEffect(() => {
    if (client.readyState === 1) {
      messageBuffer.forEach((params) => {
        sendMessage({ ...params });
      });
    }
  }, [client.readyState]);

  client.onopen = (WebSocket) => {
    console.log("WebSocket Client Connected");
    console.log(client.readyState);
  };

  client.onmessage = ({ data } = {}) => {
    console.log("onmessage data");
    console.log(data);
    try {
      const { command = "", clientId = "", ...rest } = JSON.parse(data);

      if (command === COMMANDS.CONNECTED) {
        setClientId(clientId);
        // Sending CLIENT_CONNECTED_ACK from a CONNECTED event throws errors that it's too soon
        // Need to supply clientId manually here
        sendMessage(COMMANDS.CLIENT_CONNECTED_ACK, {}, clientId);
      }

      if (command === COMMANDS.GAME_CREATED) {
        history.push(`/game/${rest.gameId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (command = "", params = {}, clientIdBootstrap = "") => {
    if (client.readyState === 0) {
      const messageParams = { command, params, clientId };
      setMessageBuffer([...messageBuffer, messageParams]);
    } else {
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
