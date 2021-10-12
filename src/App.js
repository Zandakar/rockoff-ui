import React from "react";
import MainView from "./MainView";
import Gameview from "./GameView";
import WSProvider from "./WSProvider";
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
          <WSProvider>
            <MainView></MainView>
          </WSProvider>
        </Route>
      </Switch>
    </Router>
  );
}
