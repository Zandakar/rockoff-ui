import React, { useEffect } from "react";
import { COMMANDS } from "../providers/WSProvider";

export default function Gameview({ sendMessage }) {
  useEffect(() => {
    sendMessage(COMMANDS.GAME_JOINED);
  }, []);

  const gameUrl = window.location.href;

  return (
    <div>
      {`Waiting for a mate...`}
      <div>{`Share this link with the friend you want to vs:`}</div>
      <div>{`${gameUrl}`}</div>
    </div>
  );
}
