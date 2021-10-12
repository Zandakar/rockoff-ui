import React, { useEffect, useState, createContext } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useHistory } from "react-router-dom";

const address = "ws://54.206.45.48:8000";

const client = new W3CWebSocket(address);

export default function WSHandler(props = {}) {
  console.log("WSHandler");

  return <div>{React.cloneElement(props.children, { test: true })}</div>;
}
