import React from "react";
import "../styles/Login.css";

function Login() {
  const client_id = "63b963509ce94361be2659a9a6328ed3";
  const redirect_uri = "https://tune-turner.vercel.app/home";
  const scope = "user-read-private user-read-email";

  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += `&client_id=${encodeURIComponent(client_id)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  //url += `&state=${encodeURIComponent(state)}`;

  const handleClick = () => {
    window.location.replace(url);
  };

  return (
    <div className="Login">
      <div>Welcome to Tune Tuner</div>
      <div>Stop Searching. Start Playing.</div>
      <button className="LoginButton" onClick={handleClick}>
        Login To Spotify
      </button>
    </div>
  );
}

export default Login;
