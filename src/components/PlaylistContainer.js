import React, { useState, useEffect } from "react";
import PlaylistTitle from "./PlaylistTitle";
import "../styles/PlaylistContainer.css";

const PlaylistContainer = ({ playlist, hash, toggleQuery }) => {
  let mouseEnterStyle = {
    backgroundImage: ` linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(64,64,64,0.5) 50%, rgba(0,0,0,1) 100%), url(${playlist.images[0].url}) `,
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "white",
  };
  let mouseLeaveStyle = {
    backgroundImage: `url(${playlist.images[0].url})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "transparent",
  };

  const [tracks, setTracks] = useState();
  const [selected, setSelected] = useState(false);
  const [className, setClassName] = useState("PlaylistContainer");
  const [divStyle, setDivStyle] = useState(mouseLeaveStyle);

  useEffect(() => {
    if (selected === true) {
      const queries = buildQuery();
      toggleQuery(queries);
    }
  }, [tracks]);

  const handleTracks = async () => {
    let a = await getTracks();
    setTracks(await a);
  };

  const getTracks = async () => {
    const trackObject = await fetch(playlist.tracks.href, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + hash,
      },
    });

    const data = await trackObject.json();
    return data;
  };

  const buildQuery = () => {
    let queries = [];
    for (let i = 0; i < 2; i++) {
      const info = `${tracks.items[i].track.name}, ${tracks.items[i].track.artists[0].name}`;
      queries.push(info);
    }
    return queries;
  };

  const handleClick = (e) => {
    setClassName((prevName) => prevName + " active");
    if (!selected) {
      handleTracks();
      setDivStyle(mouseEnterStyle);
    } else {
      setClassName("PlaylistContainer");
      setDivStyle(mouseLeaveStyle);
      const queries = buildQuery();
      toggleQuery(queries);
    }
    setSelected(true);
  };

  const handleMouseChange = (style) => {
    if (!selected) setDivStyle(style);
  };

  return (
    <div
      className={className}
      onClick={handleClick}
      style={divStyle}
      onMouseEnter={() => handleMouseChange(mouseEnterStyle)}
      onMouseLeave={() => handleMouseChange(mouseLeaveStyle)}
    >
      <PlaylistTitle title={playlist.name} />
    </div>
  );
};

export default PlaylistContainer;
