import React from "react";
import HomeView from "./views/HomeView";
import Gameview from "./views/GameView";
import WSProvider from "./providers/WSProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const WSProviderWrapper = (view, path) => (
    <Route path={path}>
      <WSProvider>{view}</WSProvider>
    </Route>
  );

  return (
    <Router>
      <li>
        <Link to="/">Home</Link>
      </li>
      <Switch>
        {WSProviderWrapper(<Gameview></Gameview>, "/game/*")}
        {WSProviderWrapper(<HomeView></HomeView>, "/")}
      </Switch>
    </Router>
  );
}
