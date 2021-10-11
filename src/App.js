import React, { useEffect, useState, useRef } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("bla");

  const bla = useRef();

  useEffect(() => {
    client.onopen = (connection) => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = ({ data } = {}) => {
      try {
        const parsedMessage = JSON.parse(data);
        if (parsedMessage.message) {
          setMessages([...messages, parsedMessage.message]);
        }
      } catch (e) {
        console.error(e);
      }
    };
  });

  const handleButtonPress = () => {
    console.log("clicky");
    client.send(currentMessage);
    setCurrentMessage("");
  };

  const createMessageDivs = () =>
    messages.map((message, index) => {
      return <div key={index}>{message}</div>;
    });

  return (
    <div>
      {`Best message app ever`}
      <br></br>
      <input
        value={currentMessage}
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>
      <br></br>
      <button ref={bla} onClick={() => handleButtonPress()}>
        send message
      </button>
      <div>{`Messages: `}</div>
      {createMessageDivs()}
    </div>
  );
}

export default App;
