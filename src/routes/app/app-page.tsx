import React from "react";
import { RouteComponentProps, BrowserRouter as Router } from "react-router-dom";
// components
import SearchDetail from "../../components/list-item/search-detail";
// viewa
import SearchPage from "../../views/search/search-page";
// routes
import PrivateRoute from "../private-route";
// assets
import BannerSpotify from "../../assets/img/spotify-header.png";

export default function AppPage(props: RouteComponentProps): JSX.Element {
  return (
    <>
      <div
        className="banner-search-page container-fluid"
        style={{ backgroundImage: `url(${BannerSpotify})` }}
      ></div>
      <PrivateRoute exact path="/app/search/songs" component={SearchPage} />
      <PrivateRoute exact path="/app/detail/:id" component={SearchDetail} />
    </>
  );
}
