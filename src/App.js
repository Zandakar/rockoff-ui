import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    client.onopen = (connection) => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log("recieved message from socket");
      console.log(message);
      setMessages([...messages, message]);
    };
  });

  const handleButtonPress = () => {
    console.log("clicky");
    client.send("bla");
  };

  const createMessageDivs = () =>
    messages.map((message) => {
      return <div>{message.data}</div>;
    });

  return (
    <div>
      Practical Intro To WebSockets.
      <div>test2</div>
      <button onClick={() => handleButtonPress()}>send message</button>
      {createMessageDivs()}
    </div>
  );
}

export default App;
