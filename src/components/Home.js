/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import PlaylistContainer from "./PlaylistContainer";
import Nav from "./Nav";
import "../styles/Home.css";

const Home = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [queryData, setQueryData] = useState([]);

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

  const toggleQuery = (queries) => {
    let tmp = [...queryData];
    queries.forEach((item) => {
      if (tmp.includes(item)) {
        tmp.splice(tmp.indexOf(item), 1);
      } else {
        tmp.push(item);
      }
    });
    setQueryData(tmp);
  };

  return (
    <div className="Home">
      <SkeletonTheme width="95%" baseColor="#f3f4f6" highlightColor="#d1d5db">
        {user ? (
          <Nav name={user.display_name} queryData={queryData} />
        ) : (
          <Skeleton />
        )}

        <div className="Scrollbox">
          <div className="Disclaimer">
            <div>Select any desired playlists for download.</div>
            <div>
              Note: TuneTurner is still in a proof-of-concept phase. Playlists
              are limited to two songs.
            </div>
          </div>
          {playlists &&
            playlists.items.map((item, index) => {
              return (
                <PlaylistContainer
                  playlist={item}
                  hash={hash}
                  key={index}
                  toggleQuery={toggleQuery}
                />
              );
            })}
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default Home;
