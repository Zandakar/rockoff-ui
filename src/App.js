import React from "react";
import HomeView from "./views/HomeView";
import Gameview from "./views/GameView";
import WSProvider from "./providers/WSProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  const WSProviderWrapper = (viewComponent, routePath) => (
    <Route path={routePath}>
      <WSProvider>{viewComponent}</WSProvider>
    </Route>
  );

  const appToolbar = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          backgroundColor: "grey",
        }}
      >
        <Link to="/">Home</Link>
      </div>
    );
  };

  return (
    <Router>
      {appToolbar()}
      <Switch>
        {WSProviderWrapper(<Gameview></Gameview>, "/game/*")}
        {WSProviderWrapper(<HomeView></HomeView>, "/")}
      </Switch>
    </Router>
  );
}
