import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import Track from './Track';
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

    const searchSong = async (song) => {
        const uri = 'https://www.googleapis.com/customsearch/v1?';
        const cx = "d047d17383e574d7a";
        const key = process.env.GOOGLE_KEY;
        const query = "test123";

        const searchResults = await fetch(`${uri}key=${key}&cx=${cx}&q=${query}`, {
            method: 'GET',
            mode: 'cords',
        });

        return await searchResults.json();
    };

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
                {tracks && tracks.items.slice(0, 1).map((item) => {
                    return (
                        <Track
                            key={uniqid()}
                            track={item.track}
                            onClick={searchSong}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default PlaylistContainer;