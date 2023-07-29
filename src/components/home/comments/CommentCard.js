import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton.js';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu.js';

const CommentCard = ({comment, post}) => {

    const { auth } = useSelector(state => state);

    const[isLike, setIsLike] = useState(false);

    const handleLike = () => {

    }

    const handleUnLike = () => {
        
    }

    return (
      
      <div className="comment_card mt-2">

            <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
                <h6 className="mx-1">{ comment.user.username }</h6>
            </Link>

            <div className='comment_content'>
                
                { comment.content }

                <div>
                
                <small className="font-weight-bold mr-3">
                    {moment(comment.createdAt).fromNow()}
                </small>

                <small className="font-weight-bold">
                    { comment.likes.length } likes
                </small>

                <div className="d-flex align-items-center" style={{cursor: 'pointer'}}>
                    <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                    <CommentMenu post={post} comment={comment} auth={auth} />
                </div>

            </div>

            </div>

        </div>
    )
}


export default CommentCard;