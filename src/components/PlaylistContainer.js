/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import PlaylistTitle from './PlaylistTitle';
import TrackContainer from './TrackContainer';
import "../styles/PlaylistContainer.css"


const PlaylistContainer = React.memo(({playlist, hash, toggleQuery}) => {

    const [tracks, setTracks] = useState();
    const [selected, setSelected] = useState(false);
    const [expand, setExpand] = useState(false);
    const [className, setClassName] = useState("PlaylistContainer");
    
    // useEffect must be used to perform any side-effect like fetching data from an API.
    useEffect(() => {
        // if (tracks !== undefined) {
        //     console.log("Tracks loaded");
            
        //     console.log("reset tracks");
        // }
        
        if (!expand && selected === true) {
            const queries = buildQuery();
            toggleQuery(queries)
        };
        
        
    },[tracks, expand])

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
    const handleTracks = async () => {
        let a = await getTracks();
        setTracks(await a);
    }  

    const handleExpand = (e) => {
        e.stopPropagation();
        setExpand(prevData => !prevData);
        if (!selected) {
            handleTracks();
        }
        
    }

    const buildQuery = () => {
        let queryArr = [];
        for (let i = 0; i < 2; i++){
            console.log(tracks);
            const info = `${tracks.items[i].track.name}, ${tracks.items[i].track.artists[0].name}`
            queryArr.push(info);
        }
        return queryArr;
    }

    const handleClick = (e) => {
        setClassName(prevName => prevName + " active");
        if (selected === false) {
          handleTracks();
        } else {
            setClassName("PlaylistContainer");
            const queries = buildQuery();
            toggleQuery(queries);
        }
        setSelected(true);          
    }


    return (
        <div className={className} onClick={handleClick}>
            <PlaylistTitle 
                title={playlist.name}
            />
            

            <div>
                <img src={playlist.images[0].url} alt = "album cover"/>
                {tracks && expand && <TrackContainer 
                    tracks={tracks}
                    selected={selected}
                    toggleQuery={toggleQuery}
                />}
                <button onClick={handleExpand}> X </button>
                
            </div>
        </div>
    );
});

export default PlaylistContainer;