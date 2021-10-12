import React from "react";
import MainView from "./MainView";
import Gameview from "./GameView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App(props) {
  return (
    <Router>
      <li>
        <Link to="/">Home</Link>
      </li>

      <Switch>
        <Route path="/game/*">
          <Gameview></Gameview>
        </Route>
        <Route path="/">
          <MainView></MainView>;
        </Route>
      </Switch>
    </Router>
  );
}
