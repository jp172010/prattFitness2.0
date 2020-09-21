import React from "react";
import "./App.css";
import { TopNav } from "./app/TopNav.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthProvider } from "./Auth";
import { LoginPage } from "./features/users/LoginPage";
import { Landing } from "./app/Landing";
import { Home } from "./features/users/usersHome";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <TopNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" component={LoginPage} />
            <Route exact path="/Landing" component={Landing} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
