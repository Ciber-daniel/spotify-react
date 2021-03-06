import apiCall from "../api";

const commonParams = {
  redirect_uri: "https://spotify-react-challenge.herokuapp.com/",
  client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  client_secret: process.env.REACT_APP_SPOTIFY_SECRET_ID,
};

export const spotifyAuthCall = async (requiredParams: any) => {
  try {
    const params = {
      ...requiredParams,
      ...commonParams,
    };

    const searchParams = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    const spotifyCall = await apiCall({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      body: searchParams,
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    return await spotifyCall.json();
  } catch (error) {
    console.log(error);
  }
};

export const spotifySearchCall = async (paramsArray: any, token: any) => {
  try {
    const url = new URL("https://api.spotify.com/v1/search");

    for (const item of paramsArray) {
      const key = Object.keys(item)[0];
      url.searchParams.append(key, item[key]);
    }

    const spotifyCall = await apiCall({
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await spotifyCall.json();
  } catch (error) {
    console.log(error);
  }
};
