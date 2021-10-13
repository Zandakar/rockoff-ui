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
  GAME_MATCH_FOUND: "GAME_MATCH_FOUND",
};

const messageBuffer = [];
const DEFAULT_DISPLAY_NAME = "New Player";
const DISPLAYNAME_STORE = "displayName";

export default function WSHandler(props = {}) {
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [game, setGame] = useState({});

  const history = useHistory();

  useEffect(() => {
    const storedDisplayname = window.localStorage.getItem(DISPLAYNAME_STORE);

    if (storedDisplayname !== displayName) {
      if (!storedDisplayname) {
        setDisplayName(DEFAULT_DISPLAY_NAME);
        window.localStorage.setItem(DISPLAYNAME_STORE, DEFAULT_DISPLAY_NAME);
      } else {
        setDisplayName(storedDisplayname);
      }
    }
  }, []);

  useEffect(() => {
    const storedDisplayname = window.localStorage.getItem(DISPLAYNAME_STORE);

    if (storedDisplayname !== displayName) {
      window.localStorage.setItem(DISPLAYNAME_STORE, displayName);
    }
  }, [displayName]);

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
      const { command = "", clientId = "", params } = JSON.parse(data);

      if (command === COMMANDS.CONNECTED) {
        setClientId(clientId);
        sendMessage(COMMANDS.CLIENT_CONNECTED_ACK);
      }

      if (command === COMMANDS.GAME_CREATED) {
        console.log(`---------- params ----------`);
        console.log(params);
        history.push(`/game/${params.gameId}`);
      }

      if (command === COMMANDS.GAME_MATCH_FOUND) {
        setGame(params);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const sendMessage = (command = "", params = {}) => {
    if (!command) {
      console.error("Trying to send a message without a command");
    }

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
        game,
      })}
    </div>
  );
}
