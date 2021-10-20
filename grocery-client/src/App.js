import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Groceries from "./pages/groceries";
import EditGrocery from "./pages/editGrocery";
import {
  GroceryContext,
  TokenContext,
  UserContext,
} from "./components/context";

export default function App() {
  const [allGroceries, setAllGroceries] = useState();
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    let retrieveUser = localStorage.getItem("User");
    setUser(JSON.parse(retrieveUser));
    let retrieveToken = localStorage.getItem("Token");
    setToken(JSON.parse(retrieveToken));
  }, []);

  const logout = () => {
    localStorage.clear();
    setUser();
    setToken();
  };

  return (
    <GroceryContext.Provider value={[allGroceries, setAllGroceries]}>
      <UserContext.Provider value={[user, setUser]}>
        <TokenContext.Provider value={[token, setToken]}>
          <Router>
            <div className="navbar">
              <div className="navbar-content">
                <Link className="title-bar" to="/">
                  <img
                    className="logo"
                    src="/images/cupcake.png"
                    alt="cupcakeImg"
                  />
                  <div>Cupcake</div>
                </Link>
                {token ? (
                  <div onClick={logout}>
                    <Link className="logout-btn" to="/">
                      Logout
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link className="btn-outline" to="/signup">
                      Sign Up
                    </Link>
                    <Link className="btn" to="/login">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="border-line"></div>
            <div style={{ marginTop: 75 }}></div>
            <Switch>
              <Route exact path="/">
                {token ? <Redirect to="/groceries" /> : <Home />}
              </Route>
              <Route exact path="/signup">
                {token ? <Redirect to="/groceries" /> : <SignUp />}
              </Route>
              <Route exact path="/login">
                {token ? <Redirect to="/groceries" /> : <Login />}
              </Route>
              <Route exact path="/groceries">
                {token ? <Groceries /> : <Redirect to="/login" />}
              </Route>
              <Route path="/groceries/:groceryID">
                <EditGrocery />
              </Route>
            </Switch>
          </Router>
        </TokenContext.Provider>
      </UserContext.Provider>
    </GroceryContext.Provider>
  );
}
