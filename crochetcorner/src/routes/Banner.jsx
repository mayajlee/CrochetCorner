import React from 'react';
import {Outlet, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// Crochet Corner Banner
const Banner = () => {
    const userID = uuidv4().slice(0, 5);

    return(
        <>
        <div className="banner" id="banner">
            <Link to='/'>
                <div id='bannerTitle'>
                    <h1>Crochet Corner</h1>
                    <h4>For Crocheters. By Crocheters</h4>
                </div>
            </Link>
        </div>
         <div id='bannerNav'>
            <h3>USERID: {userID}</h3>
            <Link to={`/NewPost/${userID}`} style={{color: 'black'}}>
            <h3><strong>New Post +</strong></h3>
            </Link>
        </div>
        <Outlet />
     </>
    );
};

export default Banner;
