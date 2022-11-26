import React, {useState} from 'react';

const PlaylistContainer = ({playlist, callSpotify}) => {

    const [tracks, setTracks] = useState();

    const getTracks = async () => {
        const trackObject = await callSpotify(playlist.tracks);
        setTracks(await trackObject);
    }

    return (
        <div className='PlaylistContainer'>
            <div>
                <div>
                    <img src={playlist.images[0]} alt = "album cover"/>
                </div>
                <div>
                    {playlist.name}
                </div>
                <div>
                    {playlist.description}
                </div>
            </div>

            <div>
                {tracks && console.log(tracks)}
            </div>
        </div>
    );
}

export default PlaylistContainer;