import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import apiCall from '../../api';
import {
  Artist,
  Track,
} from '../../interfaces/spotify-search-response.interface';
import { spotifyTokenResponse } from '../../recoil/auth/atoms';
import '../../styles/search-page.css';

export default function SearchDetail() {
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [track, setTrack] = useState<Track>();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        let url = window.location.href.split('/');
        const response = await apiCall({
          method: 'GET',
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
    <div>
      <div className="col-md-3 p-4 container-fluid">
        {' '}
        <div className="list-item card card-body">
          <div className="main-section">
            <img
              className="list-img d-flex justify-content-between"
              src={track?.album.images[1].url}
              style={{
                width: track?.album.images[1].width,
                height: track?.album.images[1].height,
              }}
              alt={track?.id}
            />
            <h4>{track?.album.name}</h4>
          </div>
          <p className="list-item-artist">
            <span>Artistas</span>:
            {track?.artists.map((artist: Artist) => {
              return <span> {artist.name}</span>;
            })}
          </p>
          <p className="list-item-artist">
            <span>Popularidad</span>:
            {track?.popularity ? track?.popularity : 'Not exist'}
          </p>
          <p className="list-item-artist">
            <span>Disco</span>: {track?.disc_number}
          </p>
          <p className="list-item-release-date">
            <span>Tracks numbers</span>: {track?.track_number}
          </p>
        </div>
      </div>
    </div>
  );
}
