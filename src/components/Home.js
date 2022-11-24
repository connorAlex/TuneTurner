import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Home = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();

  const hash = new URLSearchParams(window.location.hash.substring(1)).get(
    "access_token"
  );
  const base = "https://api.spotify.com/v1";

  useEffect(() => {
    const setState = async () => {
      const user = await callSpotify("/me");
      setUser(await user);
      setPlaylists(await callSpotify(`/users/${user.id}/playlists`));
    };
    setState();
  }, []);

  const callSpotify = async (endpoint) => {
    let response = await fetch(base + endpoint, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + hash,
      },
    });

    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <div className="Home">
      <SkeletonTheme width="95%" baseColor="#f3f4f6" highlightColor="#d1d5db">
        <div>{user ? <div>{user.display_name}</div> : <Skeleton />}</div>
      </SkeletonTheme>
    </div>
  );
};

export default Home;
