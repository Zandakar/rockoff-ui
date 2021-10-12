import React from "react";
import MainView from "./MainView";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";

export default function App(props) {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/topics">
            <div>bla</div>
          </Route>
          <Route path="/">
            <MainView></MainView>;
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
