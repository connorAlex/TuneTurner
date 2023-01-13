/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import uniqid from 'uniqid';
import '../styles/Home.css';
import PlaylistContainer from "./PlaylistContainer";
import Nav from "./Nav";

const Home = () => {
  const [user, setUser] = useState();
  const [playlists, setPlaylists] = useState();
  const [queryData, setQueryData] = useState([]);
  const [key, setKey] = useState(uniqid());

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
      //if the query exists, remove it
      if (tmp.includes(item)) {
        tmp.splice(tmp.indexOf(item),1);
      } else {
        tmp.push(item);
      }
    });
    setQueryData(tmp);
    
  }

  return (
    <div className="Home">
      <SkeletonTheme width="95%" baseColor="#f3f4f6" highlightColor="#d1d5db">
      
      {user ? <Nav name={user.display_name} queryData={queryData}/> : <Skeleton /> }
        

        {playlists && playlists.items.map((item, index) => {
          
            return (
                <PlaylistContainer
                    playlist={item}
                    hash={hash}
                    key={index}
                    toggleQuery={toggleQuery}
                />
            )
        })}
      

        
      </SkeletonTheme>
      
    </div>
  );
};

export default Home;
