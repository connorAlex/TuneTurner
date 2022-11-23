import React from 'react';

const Home = () => {

    
    const hash = new URLSearchParams(window.location.hash.substring(1)).get("access_token");
    console.log(hash);

    return (
        <div className='Home'>
            this is home
        </div>  
    );
}

export default Home;