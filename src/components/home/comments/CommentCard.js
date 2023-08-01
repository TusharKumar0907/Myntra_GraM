import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton.js';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import CommentMenu from './CommentMenu.js';
import { updateComment, likeComment, UnLikeComment } from '../../../redux/actions/CommentAction.js';
import InputComment from '../InputComment.js';

const CommentCard = ({children, comment, post, commentId}) => {

    // console.log(comment);
    // console.log(commentId);

    const { auth } = useSelector(state => state);

    const dispatch = useDispatch();
    
    const[content, setContent] = useState('');
    const[isLike, setIsLike] = useState(false);
    const[onEdit, setOnEdit] = useState(false);
    const[loadLike, setLoadLike] = useState();
    
    useEffect(() => {
        setContent(comment.content);
        if(comment.likes.find(like => like._id === auth.user._id)) {
            setIsLike(true);
        } else {
            setIsLike(false);
        }
    }, [comment, auth.user._id])


    const handleLike = () => {
        if(loadLike) return;
        setIsLike(true);

        setLoadLike(true);
        dispatch(likeComment({comment, post, auth}));
        setLoadLike(false);
    }

    const handleUnLike = () => {
        if(loadLike) return;
        setIsLike(false);

        setLoadLike(true);
        dispatch(UnLikeComment({comment, post, auth}));
        setLoadLike(false);
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
                    :<small>

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