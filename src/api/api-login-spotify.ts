export const spotifyUrl = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_SPOTIFY_CLIENT_ID
}&response_type=code&redirect_uri=${"https://spotify-react-challenge.herokuapp.com/"}&scope=user-read-private`;
