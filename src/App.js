import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

function App() {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("bla");

  const bla = (message) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    client.onopen = (connection) => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log("recieved message from socket");
      console.log(message);
      bla(message);
    };
  });

  const handleButtonPress = () => {
    console.log("clicky");
    client.send(currentMessage);
  };

  const createMessageDivs = () =>
    messages.map((message, index) => {
      return <div key={index}>{message.data}</div>;
    });

  return (
    <div>
      {`Best message app ever`}
      <br></br>
      <input
        onChange={(e) => {
          setCurrentMessage(e.target.value);
        }}
      ></input>
      <br></br>
      <button onClick={() => handleButtonPress()}>send message</button>
      <div>{`Messages: `}</div>
      {createMessageDivs()}
    </div>
  );
}

export default App;
