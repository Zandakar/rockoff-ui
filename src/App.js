import React, { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [clientId, setClientId] = useState("");
  const [displayName, setDisplayName] = useState("New User");

  const bla = useRef();

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
          setMessages([...messages, parsedMessage.message]);
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
    messages.map((message, index) => {
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
      <button ref={bla} onClick={() => handleSendMessage()}>
        send message
      </button>
      <div>{`All Messages: `}</div>
      {createMessageDivs()}
    </div>
  );
}

export default App;
