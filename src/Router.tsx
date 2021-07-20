import './Router.css';
import {BrowserRouter as Router, Route, Link, Redirect, Switch} from "react-router-dom"
import {routes} from "./pages";

function App() {
  const {Dashboard, Login, Register}= routes;
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => true ? <Dashboard {...props} /> : <Redirect to='/login' /> } />
        <Route exact path="/login"  render={(props) => <Login {...props} />} />
        <Route exact path="/register" render={(props) => <Register {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
