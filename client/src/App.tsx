import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardClient from "./pages/DashboardClient";
import DashboardWorker from "./pages/DashboardWorker";
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
