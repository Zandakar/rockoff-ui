import React from "react";
import MainView from "./MainView";
import Gameview from "./GameView";
import WSProvider from "./WSProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App(props) {
  const WSProviderWrapper = (view, path) => {
    return (
      <Route path={path}>
        <WSProvider>{view}</WSProvider>
      </Route>
    );
  };

  return (
    <WSProvider>
      <Router>
        <li>
          <Link to="/">Home</Link>
        </li>
        <Switch>
          {WSProviderWrapper(<Gameview></Gameview>, "/game/*")}
          {WSProviderWrapper(<MainView></MainView>, "/")}
        </Switch>
      </Router>
    </WSProvider>
  );
}
