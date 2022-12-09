import React from 'react';
import '../styles/Nav.css';

const Nav = ({name, createLink}) => {

    return (
        <div className='Nav'>
            <div> Welcome, {name}. </div>
            <div onClick={createLink}> Checkout </div>
        </div>
    );
}

export default Nav;