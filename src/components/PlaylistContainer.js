/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import PlaylistTitle from './PlaylistTitle';
import TrackContainer from './TrackContainer';
import "../styles/PlaylistContainer.css"


const PlaylistContainer = ({playlist, hash, setQueryData}) => {

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
        //addPlaylist()
        e.currentTarget.classList.toggle("active");
    }

    const handleMouseOver = (e) => {
        
    }

    const addPlaylist = () => {
        let tracksInfo = [];
    
        // Limited to 2 songs due to googleJSON daily throttle
        for (let i = 0; i < 2; i++) {
            tracksInfo.push(`${tracks.items[i].track.name}, ${tracks.items[i].track.artists[0].name}`)
        }
        setQueryData((currentData) => [...currentData, ...tracksInfo])
    }

    return (
        <div className='PlaylistContainer' onClick={handleClick}>
            <PlaylistTitle 
                title={playlist.name}
            />

            <div>
                <img src={playlist.images[0].url} alt = "album cover"/>
                
                <TrackContainer 
                    tracks={tracks}
                    setQueryData={setQueryData}
                />
                
            </div>
        </div>
    );
}

export default PlaylistContainer;