/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import PlaylistTitle from './PlaylistTitle';
import "../styles/PlaylistContainer.css"


const PlaylistContainer = ({playlist, hash, toggleQuery}) => {

    const [tracks, setTracks] = useState();
    const [selected, setSelected] = useState(false);
    const [className, setClassName] = useState("PlaylistContainer");

    useEffect(() => {
        
       if (selected === true) {
            const queries = buildQuery();
            toggleQuery(queries);
       }
       
    }, [tracks])
    
    const handleTracks = async () => {
        let a  = await getTracks();
        setTracks(await a);
    }

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

    const buildQuery = () => {
        let queries = [];
        for (let i = 0; i < 2; i++){
            const info = `${tracks.items[i].track.name}, ${tracks.items[i].track.artists[0].name}`
            queries.push(info);
        }
        return queries;
    }

    const handleClick = (e) => {
        setClassName(prevName => prevName + " active");
        if (!selected) {
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
            </div>
        </div>
    );
};

export default PlaylistContainer;