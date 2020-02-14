import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import loadable from '@loadable/component';

const Loading = loadable(() => import(/* webpackChunkName: "loading-component" */'./pages/loading/loading'));
const Index = loadable(() => import(/* webpackChunkName: "Index-component" */'./pages/index'), {
  fallback: <Loading />
});

const MainApp: React.FunctionComponent = () => (
  <Router>
    <Index />
    <div>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About<Loading /></h2>;
}

function Users() {
    return <h2>Users</h2>;
}

export default MainApp;
