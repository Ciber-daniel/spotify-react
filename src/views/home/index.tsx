import React, { useEffect, useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
// recoil
import {
  isAuthenticated as isAuthenticatedAtom,
  spotifyRefreshToken as spotifyRefreshTokenAtom,
  spotifyTokenResponse as spotifyTokenResponseAtom,
} from "../../recoil/auth/atoms";
import "../../styles/home.css";
// utils
import { spotifyAuthCall } from "../../utils";
// api
import { spotifyUrl } from "../../api/api-login-spotify";
// assets
import homeImage from "../../assets/img/backgroundHome.png";

export default function Home(): JSX.Element {
  const location = useLocation();
  const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(
    isAuthenticatedAtom
  );
  const [spotifyRefreshToken, setSpotifyRefreshToken] = useRecoilState(
    spotifyRefreshTokenAtom
  );
  const [spotifyTokenResponse, setSpotifyTokenResponse] = useRecoilState(
    spotifyTokenResponseAtom
  );

  const authenticateUser = useCallback(
    async (code) => {
      try {
        let response;

        if (spotifyRefreshToken)
          response = await spotifyAuthCall({
            refresh_token: spotifyRefreshToken,
            grant_type: "refresh_token",
          });
        else
          response = await spotifyAuthCall({
            code,
            grant_type: "authorization_code",
          });

        if (response.access_token) {
          setSpotifyRefreshToken(response?.refresh_token);
          setSpotifyTokenResponse(response);
          setIsAuthenticated(true);

          history.replace("/search/songs");
        } else {
          throw new Error("Usuario no fue logeado");
        }
      } catch (error) {
        alert("Usuario no fue logeado");
        setSpotifyTokenResponse(null);
        setSpotifyRefreshToken(null);
        setIsAuthenticated(false);
      }
    },
    [
      setSpotifyRefreshToken,
      setSpotifyTokenResponse,
      setIsAuthenticated,
      spotifyRefreshToken,
    ]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const spotifyCode = urlParams.get("code");

    if (spotifyCode || isAuthenticated) authenticateUser(spotifyCode);
  }, [location.search]);

  const handleLoginClick = () => {
    window.location.replace(spotifyUrl);
  };

  return (
    <div className="home-container">
      <div className="home-left-child">
        <h3>Bienvenido a Spotify</h3>
        <h6>Musica en todo momento</h6>
        <Button onClick={handleLoginClick} variant="outline-success">
          Iniciar sesion
        </Button>
      </div>
      <div
        className="home-right-child"
        style={{
          backgroundImage: `url(${homeImage})`,
        }}
      ></div>
    </div>
  );
}
