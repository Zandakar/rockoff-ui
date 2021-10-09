import React, { useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://54.206.45.48:8000");

// class App extends Component {
//   componentWillMount() {
//     client.onopen = () => {
//       console.log("WebSocket Client Connected");
//     };
//     client.onmessage = (message) => {
//       console.log(message);
//     };
//   }

//   render() {
//     return (
//       <div>
//         Practical Intro To WebSockets.
//         <div>test</div>
//       </div>
//     );
//   }
// }

function App() {
  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log(message);
    };
  });

  return (
    <div>
      Practical Intro To WebSockets.
      <div>test2</div>
    </div>
  );
}

export default App;
