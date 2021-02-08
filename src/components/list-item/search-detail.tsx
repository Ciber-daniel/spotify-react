import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { RouteComponentProps } from "react-router";
import apiCall from "../../api";
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
import "../../styles/search-page.css";

export default function SearchDetail(props: any) {
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  console.log("adsdasdasd", props);
  useEffect(() => {
    const fetchTrack = async () => {
      try {
        let urlDetail = window.location.href.split("/");
        const response = await apiCall({
          method: "GET",
          url: `https:api.spotify.com/v1/tracks/${
            urlDetail[urlDetail.length - 1]
          }`,
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        console.log("flamear a daniel", response.body);
      } catch (err) {
        throw err;
      }
    };

    fetchTrack();
  }, []);

  return (
    <div>
      <div className="col-md-3 p-4 container-fluid">
        <div className="list-item card card-body">
          <img
            className="list-img d-flex justify-content-between"
            src={props.imageUrl}
            alt={props.id}
          />
          <p className="list-item-artist">
            <span>Artista</span>:{props.artist}
          </p>
          <p className="list-item-artist">
            <span>Popularidad</span>:{props.popularity}
          </p>
          <p className="list-item-artist">
            <span>Disco</span>:{props.disc_number}
          </p>
          <p className="list-item-release-date">
            <span>Track</span>:{props.track_number}
          </p>
          <p className="list-item-release-date">
            <span>Vista previa</span>:{props.preview_url}
          </p>
        </div>
      </div>
    </div>
  );
}
