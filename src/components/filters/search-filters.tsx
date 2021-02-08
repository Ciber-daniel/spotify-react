import { useRecoilState } from "recoil";
// recoil
import {
  album as albumAtom,
  artist as artistAtom,
  playlist as playlistAtom,
} from "../../recoil/songs/atoms";
// styles
import "../../styles/search-page.css";

export default function Filters() {
  const [album, setAlbum] = useRecoilState(albumAtom);
  const [artist, setArtist] = useRecoilState(artistAtom);
  const [playlist, setPlaylist] = useRecoilState(playlistAtom);

  return (
    <div className="search-filters">
      <label style={{ width: "100%" }}>
        Album
        <input
          type="checkbox"
          name="album"
          checked={!!album}
          onChange={({ target }) => setAlbum(target.checked ? "album" : null)}
          style={{ marginLeft: "2%" }}
        />
      </label>
      <label style={{ width: "100%" }}>
        Artista
        <input
          type="checkbox"
          name="artist"
          checked={!!artist}
          onChange={({ target }) => setArtist(target.checked ? "artist" : null)}
          style={{ marginLeft: "2%" }}
        />
      </label>
      <label style={{ width: "100%" }}>
        Playlist
        <input
          type="checkbox"
          name="playlist"
          checked={!!playlist}
          onChange={({ target }) =>
            setPlaylist(target.checked ? "playlist" : null)
          }
          style={{ marginLeft: "2%" }}
        />
      </label>
    </div>
  );
}
