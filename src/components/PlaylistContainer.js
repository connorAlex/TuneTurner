/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import Track from './Track';
import "../styles/PlaylistContainer.css"

const PlaylistContainer = ({playlist, hash, queryData, setQueryData}) => {

    const [tracks, setTracks] = useState();

    useEffect(() => {
        const getTracks = async () => {
            const trackObject = await fetch(playlist.tracks.href,{
                method: "GET",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + hash,
                },
              });
            setTracks(await trackObject.json());
        }
        getTracks();
    }, []);


    const handleClick = (e) => {
        // for every track in the Track Container, search the song and add it to the state
        const trackContainer = e.currentTarget.lastChild.lastChild;
        console.log(trackContainer)

    }

    return (
        <div className='PlaylistContainer' onClick={handleClick}>
            <div> 
                {playlist.name}
            </div>

            <div>
                <div>
                    <img src={playlist.images[0].url} alt = "album cover"/>
                </div>
                <div className='TrackContainer'>
                    {tracks && tracks.items.slice(0, 2).map((item) => {
                        
                        return (
                            <Track
                                key={uniqid()}
                                track={item.track}
                                info={`${item.track.name}, ${item.track.artists[0].name}`}
                                queryData={queryData}
                                setQueryData={setQueryData}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlaylistContainer;