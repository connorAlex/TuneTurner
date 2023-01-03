import React from 'react';
import uniqid from 'uniqid';
import Track from './Track';
import '../styles/TrackContainer.css'

const TrackContainer = ({tracks,setQueryData, queryData, selected}) => {

    const handleRemoveItem = (index) => {
        setQueryData(queryData.filter(item => queryData.indexOf(item) !== index))
    }

    return (
        <div className='TrackContainer'>
            {/* Limited to 2 songs due to googleJSON daily throttle */}
            {tracks && tracks.items.slice(0, 2).map((item) => {

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
                    <Track
                        key={uniqid()}
                        track={item.track}
                        info={`${item.track.name}, ${item.track.artists[0].name}`}
                        setQueryData={setQueryData}
                        selected={selected}
                        toggleQuery={toggleQuery}
                    />
                );
            })}
        </div>
    );
};

export default TrackContainer;