import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import { useRecoilState } from "recoil";
// components
import Loading from "../../components/loading";
import Track from "../../components/track";
// interfaces
import { SpotifySearchResponse } from "../../interfaces/spotify-search-response.interface";
// recoil
import { spotifyTokenResponse } from "../../recoil/auth/atoms";
// styles
import "../../styles/search-page.css";
// utils
import { spotifySearchCall } from "../../utils";

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [filterType] = useState();
  const [tracksData, setTracksData] = useState<SpotifySearchResponse>();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    let type = filterType ?? "track";
    const paramsArray = [
      {
        q: searchText,
      },
      {
        type,
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

    if (response) {
      setTracksData(response.tracks);
    }
    setLoading(false);
    console.log("res", response);
  };

  async function loadMoreData(
    dataSource: SpotifySearchResponse,
    stateKey: string
  ): Promise<void> {
    try {
      if (!dataSource.next) {
        return;
      }

      const response = await fetch(dataSource.next, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const body = await response.json();

      switch (stateKey) {
        case "tracks":
          setTracksData({
            ...body.tracks,
            items: [...(tracksData?.items || []), ...body.tracks.items],
          });
          break;
        default:
          break;
      }
    } catch (e) {
      throw new Error("Error 404 NOT FOUND");
    }
  }

  return (
    <div className="search-page">
      <h2>Busca tu cancion favorita</h2>
      <form className="searchbox" onSubmit={handleSearch}>
        <input
          type="text"
          className="searchbox-input"
          value={searchText}
          onChange={({ target: { value } }) => setSearchText(value)}
        />
        <Button variant="success" className="search-btn" type="submit">
          Search
        </Button>
      </form>

      {loading && <Loading />}

      {tracksData?.items && (
        <div className="home-tracks-container ">
          <p className="home-tracks-title">Canciones</p>
          <div className="home-tracks-container-items row">
            {tracksData?.items?.map((item: any, index: any) => (
              <Track key={index} {...item} />
            ))}
          </div>
          <Button
            className="pagination-btn"
            onClick={() => loadMoreData(tracksData, "tracks")}
          >
            Cargar más canciones
          </Button>
        </div>
      )}
    </div>
  );
}
