/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import uniqid from 'uniqid'
import './PlaylistContainer'
import PlaylistContainer from "./PlaylistContainer";
import Nav from "./Nav";

const Home = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [asins, setAsins] = useState([]);

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

  const createAmazonLink = () => {
    let baseUrl = 'https://www.amazon.com/gp/aws/cart/add.html?';

    for (let i=0; i < asins.length; i++) {
      baseUrl += `ASIN.1=${asins[i]}&`;
    }
    return baseUrl
  }

  const createLink = () => {
    const link = createAmazonLink();
    window.open(link);
    setAsins([]);
  }

  return (
    <div className="Home">
      <SkeletonTheme width="95%" baseColor="#f3f4f6" highlightColor="#d1d5db">
      
      {user ? 
        <Nav 
          name={user.display_name}
          createLink={createLink}
        />
        :
        <Skeleton />
      }
      <div>{asins}</div>
      
        
      {playlists && playlists.items.map((item) => {
          return (
              <PlaylistContainer 
                  playlist={item} 
                  hash={hash}
                  key={uniqid()}
                  setAsins={setAsins}
                  asins={asins}
              />
          )
      })}

        
      </SkeletonTheme>
      
    </div>
  );
};

export default Home;
