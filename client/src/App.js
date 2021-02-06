import SignIn from './components/signInPage'
import SignUp from './components/signUp'
import DashboardClient from './components/dashboardClient'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import './styles/styles.scss'
import 'normalize.css/normalize.css';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path = '/'>
          <SignIn />
        </Route>
        <Route path = '/signup'>
        <SignUp />
        </Route>
        <Route path = '/dashboard'>
        <DashboardClient />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
