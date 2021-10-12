import React, { useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

export default function WSHandler(props = {}) {
  const [allMessages, setAllMessages] = useState([]);
  const [clientId, setClientId] = useState("");
  console.log("WSHandler");

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

  return (
    <div>
      {React.cloneElement(props.children, { client, clientId, allMessages })}
    </div>
  );
}
