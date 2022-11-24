import React, { useEffect, useState } from 'react';

const Home = () => {
    const [user, setUser] = useState();
    
    const hash = new URLSearchParams(window.location.hash.substring(1)).get("access_token");
    const base = 'https://api.spotify.com/v1';

    useEffect( () => {
        getUser();
    }, []);

    const getUser = async () => {
        let response = await fetch(base + "/me", {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + hash,
            }
        });

        const data = await response.json();
        setUser(await data);
    }
    

    return (
        <div className='Home'>
            this is home {user.country}
        </div>  
    );
}

export default Home;