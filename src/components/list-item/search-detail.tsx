import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
// api
import apiCall from "../../api";
// interfaces
import {
  Artist,
  Track,
} from "../../interfaces/spotify-search-response.interface";
// recoil
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
// styles
import "../../styles/detail-page.css";
// components
import Loading from "../loading";

export default function SearchDetail() {
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [track, setTrack] = useState<Track>();
  const history = useHistory();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        let url = window.location.href.split("/");
        const response = await apiCall({
          method: "GET",
          url: `https:api.spotify.com/v1/tracks/${url[url.length - 1]}`,
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });
        response.json().then((data) => {
          if (data) {
            console.log(data);
            setTrack(data);
          }
        });
      } catch (err) {
        throw err;
      }
    };

    fetchTrack();
  }, [tokenResponse.access_token]);

  return (
    <div className="col-md-3 p-4 container-fluid container-detail">
      <div className="list-item-detail card card-body">
        <div className="main-section">
          <img
            className="list-img-detail d-flex justify-content-between"
            src={track?.album.images[1].url}
            style={{
              width: track?.album.images[1].width,
              height: track?.album.images[1].height,
            }}
            alt={track?.id}
          />
          <h4>{track?.album.name}</h4>
          <h5>{track?.name}</h5>
        </div>
        <p className="list-item-artist-detail">
          <span>Artistas</span>:
          {track?.artists.map((artist: Artist, index: any) => {
            return <span key={index}> {artist.name}</span>;
          })}
        </p>
        <p className="list-item-track-detail">
          <span>Popularidad</span>:{" "}
          {track?.popularity ? track?.popularity : "Not exist"}
        </p>
        <p className="list-item-track-detail">
          <span>Disco</span>: {track?.disc_number}
        </p>
        <p className="list-item-track-detail">
          <span>Tracks numbers</span>: {track?.track_number}
        </p>
      </div>
      <Button
        variant="primary"
        onClick={() => {
          history.push("/app/search/songs");
        }}
        className="btn-go-back"
      >
        Go back
      </Button>
    </div>
  );
}
