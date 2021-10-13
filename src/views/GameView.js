import React, { useEffect } from "react";
import { COMMANDS } from "../providers/WSProvider";
import { useParams } from "react-router-dom";

export default function Gameview({ sendMessage }) {
  const gameUrl = window.location.href;
  const gameId = useParams()[0];

  console.log(gameId);

  useEffect(() => {
    sendMessage(COMMANDS.GAME_JOINED, { gameId });
  }, []);

  return (
    <div>
      {`Waiting for a mate...`}
      <div>{`Share this link with the friend you want to vs:`}</div>
      <div>{`${gameUrl}`}</div>
    </div>
  );
}
