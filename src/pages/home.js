import React from 'react';
import Status from '../components/home/Status';
import Posts from '../components/home/Posts';
import { useSelector } from 'react-redux';


const Home = () => {
    const { homePost } = useSelector(state => state);
    console.log(homePost);
    return (
        <div>
            <Status />

            {
                homePost.result === 0 ? <h2 className='text-center'>No Post</h2> : <Posts />
                
            }
            <Posts />
        </div>
    )
}


export default Home