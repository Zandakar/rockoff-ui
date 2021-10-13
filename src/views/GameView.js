import React, { useEffect, useState } from "react";
import { COMMANDS } from "../providers/WSProvider";
import { useParams } from "react-router-dom";

export default function Gameview({ sendMessage }) {
  const [copiedToClipBoard, setCopiedToClipboard] = useState(false);
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
      <button
        onClick={() => {
          navigator.clipboard.writeText(gameUrl);
          setCopiedToClipboard(true);
          setTimeout(() => {
            setCopiedToClipboard(false);
          }, 500);
        }}
      >
        Copy to clipboard
      </button>
      {copiedToClipBoard && <div>copied</div>}
    </div>
  );
}
