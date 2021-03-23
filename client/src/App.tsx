import React from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DashboardClient from "./components/DashboardClient";
import DashboardWorker from "./components/DashboardWorker";
import Test from "./components/test";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <DashboardClient />
          </Route>
          <Route path="/worker/dashboard">
            <DashboardWorker />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
