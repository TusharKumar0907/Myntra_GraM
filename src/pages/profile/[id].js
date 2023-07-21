import React from 'react'
import Post from '../../components/profile/Posts.js';
import Info from '../../components/profile/Info.js';


const Profile = () => {
    return (
        <div className='profile'>
            <Info/>
            <Post/>
        </div>
    )
}


export default Profile;