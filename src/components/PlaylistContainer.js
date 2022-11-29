import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid'
import "../styles/PlaylistContainer.css"

const PlaylistContainer = ({playlist, hash}) => {

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

    

    return (
        <div className='PlaylistContainer'>
            <div>
                <div>
                    <img src={playlist.images[0].url} alt = "album cover"/>
                </div>
                <div>
                    {playlist.name}
                </div>
                <div>
                    {playlist.description}
                </div>
            </div>

            <div>
                {tracks && tracks.items.slice(0, 10).map((item) => {
                    return (
                        <div 
                            key={uniqid()} 
                        >
                        {item.track.name}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default PlaylistContainer;