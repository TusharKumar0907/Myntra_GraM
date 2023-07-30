import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton.js';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu.js';
import { updateComment } from '../../../redux/actions/CommentAction.js';


const CommentCard = ({comment, post}) => {

    const { auth } = useSelector(state => state);

    const dispatch = useDispatch();
    
    const[content, setContent] = useState('');
    const[isLike, setIsLike] = useState(false);
    const[onEdit, setOnEdit] = useState(false);

    
    

    const handleLike = () => {

    }

    const handleUnLike = () => {
        
    }

    const handleUpdate = () => {
        if(comment.content == content) {
            setOnEdit(false);
        } else {
            dispatch(updateComment({comment, post, content, auth}));
        }
    }

    return (
      
      <div className="comment_card mt-2">

            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <h6 className="mx-1">{ comment.user.username }</h6>
            </Link>

            <div className='comment_content'>

                {
                    onEdit
                    ? <textarea rows = "5" value = { content }
                    onChange={e => setContent(e.target.value) } /> 
                    : comment.content

                }
            

                <small className="font-weight-bold">
                    {moment(comment.createdAt).fromNow()}
                </small>

                <small className="font-weight-bold">
                    { comment.likes.length } likes
                </small>



                {
                    onEdit
                    ?<>
                    <small className="font-weight-bold" style={{cursor: 'pointer'}} onClick={handleUpdate} >
                        update
                    </small>
                    <small className="font-weight-bold"  style={{cursor: 'pointer'}}
                    onClick={e => setOnEdit(false)}>
                        cancel
                    </small>
                    
                    </>
                    : <small className="font-weight-bold">
                        reply
                    </small>
                }

                <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                </div>

                <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                    <CommentMenu post={post} comment={comment} auth={auth} setOnEdit = {setOnEdit} />  
                </div>          

            </div>

        </div>
    )
}


export default CommentCard;