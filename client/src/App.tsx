import React from "react";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import DashboardWorker from "./pages/DashboardWorker";
import DashboardClient from "./pages/DashboardClient";
import { GlobalProvider } from "./context/GlobalState";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

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
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/dashboard">
            <DashboardClient />
          </Route>
          <Route path="/worker/dashboard">
            <DashboardWorker />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;
