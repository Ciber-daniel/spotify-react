import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRecoilState } from 'recoil';
import Album from '../../components/album';
import Artist from '../../components/artist';
// components
import Filters from '../../components/filters/search-filters';
import Loading from '../../components/loading';
import Playlist from '../../components/playlist';
import Track from '../../components/track';
// interfaces
import { SpotifySearchResponse } from '../../interfaces/spotify-search-response.interface';
import { spotifyTokenResponse } from '../../recoil/auth/atoms';
// recoil
import { filterType as filterTypeSelector } from '../../recoil/songs/selectors';
// styles
import '../../styles/search-page.css';
// utils
import { spotifySearchCall } from '../../utils';

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [tokenResponse] = useRecoilState(spotifyTokenResponse);
  const [filterType] = useRecoilState(filterTypeSelector);
  const [tracksData, setTracksData] = useState<SpotifySearchResponse>();
  const [artistsData, setArtistsData] = useState<SpotifySearchResponse>();
  const [playlistsData, setPlaylistsData] = useState<SpotifySearchResponse>();
  const [albumsData, setAlbumsData] = useState<SpotifySearchResponse>();
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    let type = filterType ?? 'track';
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
        next: '',
      },
      {
        previous: '',
      },
    ];

    const response = await spotifySearchCall(
      paramsArray,
      tokenResponse.access_token
    );

    if (response) {
      setAlbumsData(response.albums);
      setArtistsData(response.artists);
      setPlaylistsData(response.playlists);
      setTracksData(response.tracks);
    }
    setLoading(false);
    console.log('res', response);
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
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });

      const body = await response.json();

      switch (stateKey) {
        case 'albums':
          setAlbumsData({
            ...body.albums,
            items: [...(albumsData?.items || []), ...body.albums.items],
          });
          break;
        case 'tracks':
          setTracksData({
            ...body.tracks,
            items: [...(tracksData?.items || []), ...body.tracks.items],
          });
          break;
        case 'playlists':
          setPlaylistsData({
            ...body.playlists,
            items: [...(playlistsData?.items || []), ...body.playlists.items],
          });
          break;
        case 'artists':
          setArtistsData({
            ...body.artists,
            items: [...(artistsData?.items || []), ...body.artists.items],
          });
          break;
        default:
          break;
      }
    } catch (e) {
      throw new Error('Error 404 NOT FOUND');
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
      <Filters />

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
            onClick={() => loadMoreData(tracksData, 'tracks')}
          >
            Cargar más canciones
          </Button>
        </div>
      )}

      {albumsData?.items && (
        <div className="home-albums-container">
          <p className="home-albums-title">Album</p>
          <div className="home-albums-container-items row">
            {albumsData?.items?.map((item: any, index: any) => (
              <Album key={index} {...item} />
            ))}
          </div>
          <Button
            className="pagination-btn"
            onClick={() => loadMoreData(albumsData, 'albums')}
          >
            Cargar más álbumes
          </Button>
        </div>
      )}

      {artistsData?.items && (
        <div className="home-artists-container">
          <p className="home-artists-title">Artista</p>
          <div className="home-artist-container-items row">
            {artistsData?.items?.map((item: any, index: any) => (
              <Artist key={index} {...item} />
            ))}
          </div>
          <Button
            className="pagination-btn"
            onClick={() => loadMoreData(artistsData, 'artists')}
          >
            Cargar más artistas
          </Button>
        </div>
      )}

      {playlistsData?.items && (
        <div className="home-playlists-container">
          <p className="home-playlists-title">Playlists</p>
          <div className="home-playlists-container-items row">
            {playlistsData?.items?.map((item: any, index: any) => (
              <Playlist key={index} {...item} />
            ))}
          </div>
          <Button
            className="pagination-btn"
            onClick={() => loadMoreData(playlistsData, 'playlists')}
          >
            Cargar más playlists
          </Button>
        </div>
      )}
    </div>
  );
}
