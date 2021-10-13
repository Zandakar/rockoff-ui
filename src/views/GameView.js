import { useHistory } from "react-router-dom";

export default function Gameview(props) {
  const history = useHistory();

  console.log(`---------- history----------`);
  console.log(history.location);

  console.log(window.location.href);

  const gameUrl = window.location.href;

  return (
    <div>
      {`Waiting for a mate...`}
      <div>{`Share this link with the friend you want to vs:`}</div>
      <div>{`${gameUrl}`}</div>
    </div>
  );
}
