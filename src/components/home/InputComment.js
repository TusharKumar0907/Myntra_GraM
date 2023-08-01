import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { createComment } from '../../redux/actions/CommentAction.js';

const InputComment = ( {post, children, onReply, setOnReply } ) => {

    const [content, setContent] = useState('');

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    const handlesubmit = (e) => {
        
        e.preventDefault();

        if(!content.trim()) return;

        const newComment = {
            content,
            likes: [],
            user: auth.user,
            createdAt: new Date().toISOString()
        }

        
        dispatch(createComment(post, newComment, auth));

    }
    
    return (

        <form className="card-footer comment_input" onSubmit={handlesubmit} >
            
           <input type="text" placeholder="Add your Comments..." 
            value={content} onChange={e => setContent(e.target.value)} /> 

            <button type="submit" className="postBtn">
                Post
            </button> 

        </form>
    )
}


export default InputComment;

