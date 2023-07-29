import React from 'react';
import CommentDisplay from './comments/CommentDisplay.js';


const Comments = ({post}) => {
    return (
        <div>
            {   
                 
                post.comments.map(comment => (
                    <CommentDisplay key={comment._id} comment={comment} post={post} />
                ))

            }
        </div>
    )
}


export default Comments;