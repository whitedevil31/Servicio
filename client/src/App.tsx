import React  from "react";
import { useHistory } from 'react-router-dom';
import Login  from './components/Login'
import Signup from './components/Signup'
import DashboardClient from './components/DashboardClient'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
  return (
   <div>
     <Router>
      <Switch>
        <Route exact path = '/'>
          <Login />
        </Route>
        <Route path = '/signup'>
        <Signup />
        </Route>
        <Route path = '/dashboard'>
        <DashboardClient />
        </Route>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
