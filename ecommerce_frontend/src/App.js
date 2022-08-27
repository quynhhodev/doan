
import { AdminPrivateRoute } from './pages/AdminPrivateRoute';
import PublicRoute from './pages/PublicRoute';

import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Context-Type'] = 'application/json';
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})



function App() {
  return (<>
    <Router>
      <Switch>
        <AdminPrivateRoute path="/admin" name="Admin" />
        <PublicRoute path="/" name="Home" />
        <PublicRoute path="/register" name="Register" />
        <PublicRoute path="/login" name="Login" />
      </Switch>

    </Router>
  </>
  );
}



export default App;
