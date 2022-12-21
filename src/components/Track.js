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

    const shortenString = (string) => {

        if (string.length > 20) {
            const substring = string.substring(0,17) + "...";
            return substring
        }
        return string


    };

    const handleClick = async (e) => {
        e.stopPropagation();
        e.currentTarget.classList.toggle("activeTrack");       
        //setQueryData((currentData) => [...currentData, info])
    }

    return (
        <div className='Track' onClick={handleClick} >
            {shortenString(track.name)}
            <div >
                <div>{msConvert(track.duration_ms)}</div>
                <div>{shortenString(track.artists[0].name)}</div>
                <div>{shortenString(track.album.name)}</div>
            </div>
        </div>
    )
}

export default Track;