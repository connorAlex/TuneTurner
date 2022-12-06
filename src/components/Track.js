import React from 'react';
import "../styles/Track.css";

const Track = ({track}) => {

    const msConvert = (ms) => {
        let totalSeconds = ms / 1000
        let minutes = Math.floor(totalSeconds / 60); 
        let seconds = Math.floor(totalSeconds % 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return (`${minutes}:${seconds}`);
    }

    return (
        <div className='Track'>
            {track.name}
            <div>
                <div>{msConvert(track.duration_ms)}</div>
                <div>{track.artists[0].name}</div>
                <div>{track.album.name}</div>
            </div>
        </div>
    )
}

export default Track;