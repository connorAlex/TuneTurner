/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import PlaylistTitle from './PlaylistTitle';
import TrackContainer from './TrackContainer';
import "../styles/PlaylistContainer.css"


const PlaylistContainer = ({playlist, hash, setQueryData, toggleQuery}) => {

    const [tracks, setTracks] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        const handleTracks = async () => {
            setTracks(await getTracks());
        }
        if (selected || selected === undefined) handleTracks();
    }, [selected])

    const getTracks = async () => {
        const trackObject = await fetch(playlist.tracks.href,{
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + hash,
            },
          });
        const data = await trackObject.json();
        return data;
    }


    const handleClick = (e) => {
        e.currentTarget.classList.toggle("active");
        setSelected(!selected);
        let queries = [];
        for (let i = 0; i < 2; i++){
            const info = `${tracks.items[i].track.name}, ${tracks.items[i].track.artists[0].name}`
            queries.push(info);
        }
        toggleQuery(queries);
    }


    return (
        <div className='PlaylistContainer' onClick={handleClick}>
            <PlaylistTitle 
                title={playlist.name}
            />

            <div>
                <img src={playlist.images[0].url} alt = "album cover"/>
                
                {/* {tracks && <TrackContainer 
                    tracks={tracks}
                    selected={selected}
                    toggleQuery={toggleQuery}
                />} */}
                
            </div>
        </div>
    );
};

export default PlaylistContainer;