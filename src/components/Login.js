import React from 'react';

function Login() {

  const client_id = '63b963509ce94361be2659a9a6328ed3';
  const redirect_uri = 'http://localhost:3002/callback';
  const scope = 'user-read-private user-read-email';


  let url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += `&client_id=${encodeURIComponent(client_id)}`;
  url += `&scope=${encodeURIComponent(scope)}`;
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  //url += `&state=${encodeURIComponent(state)}`;

  const handleClick = () => {
    window.open(url);
  }

  return (
    <div className="Login">
        <button onClick={handleClick}>Login to Spotify</button>
    </div>
  );
}

export default Login;
