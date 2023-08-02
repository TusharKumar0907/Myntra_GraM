import React from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import { useSelector } from 'react-redux';
import RightSideBar from '../components/home/RightSideBar.js';

const Home = () => {
  
    const { homePost } = useSelector(state => state);
  
    return (
        
        <div className='home row mx-0'>
        <div className='col-md-8'>
            <Status />

            {
                
                homePost.result === 0 ? <h2 className='text-center'>No Post</h2> : <Posts />
                
            }
        </div>

        <div className='col-md-4'>
            <RightSideBar />
        </div>

        </div>

    )
}


export default Home