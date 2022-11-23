import React from 'react';

const Home = () => {

    
    const hash = new URLSearchParams(window.location.hash.substring(1)).get("access_token");
    const base = 'https://api.spotify.com/v1';

    const getUser = async () => {
        const info = await fetch(base + "/me", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hash,
            }
        });

        return info.json();

    }
    console.log(getUser());

    return (
        <div className='Home'>
            this is home
        </div>  
    );
}

export default Home;