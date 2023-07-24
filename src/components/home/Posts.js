import React from 'react';
import { useSelector } from 'react-redux';
import CardBody from './post_card/CardBody';
import CardFooter from './post_card/CardFooter';
import CardHeader from './post_card/CardHeader';

 
const Posts = () => {
    
    const { homePost } = useSelector(state => state);

    return (
        <div className="posts">
            {
                homePost.posts.map(post => (
                    <div key={post._id} className="card my-3">
                        <CardHeader post={post} />
                        <CardBody post={post} />
                        <CardFooter post={post} />
                    </div>
                ))
            }
        </div>
    )
}


export default Posts;