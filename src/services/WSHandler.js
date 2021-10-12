import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useHistory } from "react-router-dom";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

export default function WSHandler() {
  console.log("WSHandler");

  const handleSendMessage = () => {
    console.log("clicky2");
    // try {
    //   const payload = JSON.stringify({
    //     message: currentMessage,
    //     clientId,
    //     displayName,
    //   });
    //   client.send(payload);

    //   setCurrentMessage("");
    // } catch (e) {
    //   console.error(e);
    // }
  };

  return { client };
}
