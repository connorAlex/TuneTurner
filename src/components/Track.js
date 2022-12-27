import React, {useEffect, useState} from 'react';
import "../styles/Track.css";

const Track = ({track, info, setQueryData,queryData, selected}) => {

    const [active, setActive] = useState(false);
    
    useEffect(() => {
        if (!selected) {
            setActive(false);
        }
    }, [selected])
   

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
        toggleActive(e.currentTarget);
        toggleQuery(info);
    }

    const toggleActive = (target) => {
        target.classList.toggle("activeTrack");
    };

    const handleRemoveItem = (index) => {
        setQueryData(queryData.filter(item => queryData.indexOf(item) !== index))
    }

    const toggleQuery = (info) => {
        // if track is already selected, remove from cart
        let queryIndex = queryData.indexOf(info);
        if (queryIndex === -1) {
            setQueryData((currentData) => [...currentData,info]);
        } else {
            handleRemoveItem(queryIndex);
        }
    }

    return (
        <div className={'Track ' + (selected || active ? "activeTrack": "")} onClick={handleClick} >
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