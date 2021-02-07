import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
// views
import Home from "../views/home";
import SearchPage from "../views/search/search-page";
// routes
import PrivateRoute from "./private-route";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/search/songs" exact component={SearchPage} />
    </Router>
  );
}
