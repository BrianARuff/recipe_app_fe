import './Router.css';
import {
   BrowserRouter as Router,
   Route,
   Redirect,
   Switch,
} from 'react-router-dom';
import { routes } from './pages';

function App() {
   const accessToken = localStorage.getItem('accessToken');
   const { Dashboard, Login, Register } = routes;
   return (
      <Router>
         <Switch>
            <Route
               exact
               path="/"
               render={(props) =>
                  accessToken ? (
                     <Dashboard {...props} />
                  ) : (
                     <Redirect to="/register" />
                  )
               }
            />
            <Route
               exact
               path="/login"
               render={(props) =>
                  accessToken ? (
                     <Redirect to="/" {...props} />
                  ) : (
                     <Login {...props} />
                  )
               }
            />
            <Route
               exact
               path="/register"
               render={(props) =>
                  accessToken ? (
                     <Redirect to="/" {...props} />
                  ) : (
                     <Register {...props} />
                  )
               }
            />
         </Switch>
      </Router>
   );
}

export default App;
