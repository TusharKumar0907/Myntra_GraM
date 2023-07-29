import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from '../postcard.js';

 
const Posts = () => {
    
    const { homePost } = useSelector(state => state);

    return (
        <div className="posts">
            {
                homePost.posts.map(post => (
                    <div key={post._id} className="card my-3">
                        < PostCard post = { post } />
                    </div>
                ))
            }
        </div>
    )
}


export default Posts;