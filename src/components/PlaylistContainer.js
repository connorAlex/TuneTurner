/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import uniqid from 'uniqid';
import Track from './Track';
import "../styles/PlaylistContainer.css"

const PlaylistContainer = ({playlist, hash, setAsins, asins}) => {

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

    const searchSong = async (query) => {
        const uri = 'https://www.googleapis.com/customsearch/v1?';
        const cx = "d047d17383e574d7a";
        const key = 'AIzaSyBqmZ730rjITUPla3QPb23PmILw_xw_L30';

        const searchResults = await fetch(`${uri}key=${key}&cx=${cx}&q=${query}`, {
            method: 'GET',
            mode: 'cors',
        });

        const searchResultsJSON = await searchResults.json();
        const uriAsin = await searchResultsJSON.items[0].formattedUrl.match(/[^dp/]*$/g)[0];

        if ((/^(B[\dA-Z]{9}|\d{9}(X|\d))/g).test(uriAsin)) {
            // add asin to state 
            setAsins(asins => [...asins, uriAsin]);

        } else{
            
            // going to need a way to track what tracks were not found and display them to the user
            // store the track "info" prop

            console.error("ASIN NOT FOUND");
        };

    };

    return (
        <div className='PlaylistContainer' >
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
                                searchSong={searchSong}
                                info={`${item.track.name}, ${item.track.artists[0].name}`}
                    
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlaylistContainer;