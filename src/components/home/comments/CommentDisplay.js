import React from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({comment, post}) => {
    
    console.log(comment);
    // console.log(comment.commentId)

    return (
        <div className="comment_dispaly">
 
            <CommentCard comment={comment} post={post} commentId={ comment._id }>
            
            </CommentCard>

        </div>
    )
}


export default CommentDisplay;