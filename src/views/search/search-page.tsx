import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
// recoil
import { spotifyResult } from "../../recoil/songs/atoms";
import { filterType as filterTypeSelector } from "../../recoil/songs/selectors";
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
// assets
import BannerSpotify from "../../assets/img/spotify-header.png";
// components
import Filters from "../../components/filters/search-filters";
import Track from "../../components/track";
import Album from "../../components/album";
import Artist from "../../components/artist";
import Playlist from "../../components/playlist";
// utils
import { spotifySearchCall } from "../../utils";
// styles
import "../../styles/search-page.css";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [searchResponse, setSearchResponse] = useRecoilState(spotifyResult);
  const [filterType] = useRecoilState(filterTypeSelector);

  const handleSearchClick = async ({ next, previous }: any) => {
    let type = filterType ?? "track";
    const paramsArray = [
      {
        q: searchText,
      },
      {
        type,
      },
      {
        offset: 12,
      },
      {
        limit: 12,
      },
      {
        next: "",
      },
      {
        previous: "",
      },
    ];

    const response = await spotifySearchCall(
      paramsArray,
      tokenResponse.access_token
    );
    setSearchResponse(response);
    console.log("sadsad", response);
  };

  return (
    <div className="search-page">
      <div
        className="banner-search-page container-fluid"
        style={{ backgroundImage: `url(${BannerSpotify})` }}
      ></div>
      <h2>Busca tu cancion favorita</h2>
      <div className="searchbox">
        <input
          type="text"
          className="searchbox-input"
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
        />
        <Button
          variant="success"
          className="search-btn"
          onClick={handleSearchClick}
        >
          Buscar
        </Button>
      </div>
      <Filters />

      {searchResponse?.tracks?.items && (
        <div className="home-tracks-container ">
          <p className="home-tracks-title">Canciones</p>
          <div className="home-tracks-container-items row">
            {searchResponse?.tracks?.items?.map((item: any, index: any) => (
              <Track key={index} {...item} />
            ))}
          </div>
        </div>
      )}

      {searchResponse?.albums?.items && (
        <div className="home-albums-container">
          <p className="home-albums-title">Album</p>
          <div className="home-albums-container-items row">
            {searchResponse?.albums?.items?.map((item: any, index: any) => (
              <Album key={index} {...item} />
            ))}
          </div>
        </div>
      )}

      {searchResponse?.artists?.items && (
        <div className="home-artists-container">
          <p className="home-artists-title">Artista</p>
          <div className="home-artist-container-items row">
            {searchResponse?.artists?.items?.map((item: any, index: any) => (
              <Artist key={index} {...item} />
            ))}
          </div>
        </div>
      )}

      {searchResponse?.playlists?.items && (
        <div className="home-playlists-container">
          <p className="home-playlists-title">Playlists</p>
          <div className="home-playlists-container-items row">
            {searchResponse?.playlists?.items?.map((item: any, index: any) => (
              <Playlist key={index} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
