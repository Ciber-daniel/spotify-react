import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SearchDetail from "../components/list-item/search-detail";
// views
import Home from "../views/home";
import SearchPage from "../views/search/search-page";
import AppPage from "./app/app-page";
// routes
import PrivateRoute from "./private-route";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <PrivateRoute path="/app" component={AppPage} />
    </Router>
  );
}
