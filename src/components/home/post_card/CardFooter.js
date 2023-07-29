import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from '../../LikeButton.js';
import { useSelector, useDispatch } from 'react-redux';

import { likePost,unLikePost } from '../../../redux/actions/postAction.js';


const CardFooter = ({post}) => {

    const[isLike, setIsLike] = useState(false);
    const[loadlike, setLoadlike] = useState(false);

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    // loadlike --> during the time we are liking the post during that time only we can not dislike the post

    useEffect(() => {
        if(post.likes.find(like => like._id === auth.user._id)){
            setIsLike(true);
        }
    }, [post.likes, auth.user._id])



    const handleLike = async() => {
        if(loadlike)return;
        setIsLike(true);
        setLoadlike(true);
        await dispatch(likePost({post, auth}));
        setLoadlike(false);
    }

    const handleUnLike = async() => {
        if(loadlike)return;
        setIsLike(false);
        setLoadlike(true);
        await dispatch(unLikePost({post, auth}));
        setLoadlike(false);
    }

    return (
        
        <div className="card_footer">
            
            <div className="card_icon_menu">
               
                <div>

                    <LikeButton 
                    isLike = {isLike}
                    handleLike = {handleLike}
                    handleUnLike = {handleUnLike} 
                    />

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <span className="material-icons">comment</span>
                    </Link>

                </div>

                <div className="d-flex justify-content-between mx-0">
                    
                    <h6 style={{padding: '0 25px'}}>
                    { post.likes.length } Likes
                    </h6>

                    <h6 style={{padding: '0 25px'}}>
                    { post.comments.length } Comments
                    </h6>

                </div>

            </div>
        
        </div>
    )
}


export default CardFooter;