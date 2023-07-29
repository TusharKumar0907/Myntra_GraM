import React from 'react';
import CardBody from './home/post_card/CardBody.js';
import CardFooter from './home/post_card/CardFooter.js';
import CardHeader from './home/post_card/CardHeader.js';

import Comments from './home/Comments.js';
import InputComment from './home/InputComment.js';
 
const PostCard = ({post}) => {
    
    return (
        
        <div className="card my-5">
            
            <CardHeader post={post}/>
            <CardBody post={post}/>
            <CardFooter post={post}/>
            <Comments post={post} />
            <InputComment post={post}/>
            

        </div>

    ) 
}


export default PostCard;