import React from 'react';
import uniqid from 'uniqid';
import Track from './Track';
import '../styles/TrackContainer.css'

const TrackContainer = ({tracks,setQueryData, selected}) => {
    
    return (
        <div className='TrackContainer'>
            {/* Limited to 2 songs due to googleJSON daily throttle */}
            {tracks && tracks.items.slice(0, 2).map((item) => {
                        
                        return (
                            <Track
                                key={uniqid()}
                                track={item.track}
                                info={`${item.track.name}, ${item.track.artists[0].name}`}
                                setQueryData={setQueryData}
                                selected={selected}
                            />
                        );
                    })}
        </div>
    );
}

export default TrackContainer;