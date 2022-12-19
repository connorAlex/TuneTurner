import React from 'react';
import "../styles/Track.css";

const Track = ({track, info, setQueryData}) => {
    const msConvert = (ms) => {
        let totalSeconds = ms / 1000
        let minutes = Math.floor(totalSeconds / 60); 
        let seconds = Math.floor(totalSeconds % 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return (`${minutes}:${seconds}`);
    }

    const handleClick = async (e) => {
        // add a check to see if the info is already in the queryData. Remove if so, add if not.
        e.stopPropagation();        
        setQueryData((currentData) => [...currentData, info])
    }

    return (
        <div className='Track' onClick={handleClick} >
            {track.name}
            <div >
                <div>{msConvert(track.duration_ms)}</div>
                <div>{track.artists[0].name}</div>
                <div>{track.album.name}</div>
            </div>
        </div>
    )
}

export default Track;