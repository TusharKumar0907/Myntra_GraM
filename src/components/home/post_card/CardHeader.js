import React from 'react';
import { Link } from 'react-router-dom';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes.js';
import { deletePost } from '../../../redux/actions/postAction.js';

const CardHeader = ({post}) => {
    
    const { auth } = useSelector(state => state);

    const dispatch = useDispatch();

    const handleEditPost = () => {
        dispatch({ type: GLOBALTYPES.STATUS, payload: {...post, onEdit: true}})
    }

    const handleDeletePost = () => {
        dispatch(deletePost({post, auth}));
    }

    return (
        <div className="card_header">
          
            <div className="d-flex">
                <div className="card_name">
                    <h6>
                        
                        <Link to={`/profile/${post.user._id}`} className="text-dark">
                            { post.user.username }
                        </Link>

                    </h6>
                    
                    <small className="text-muted">
                        {moment(post.createdAt).fromNow()}
                    </small>

                </div>
            </div>



            <div className="nav-item dropdown">
                
                <span className="material-icons" id="moreLink" data-toggle="dropdown">
                    more_horiz
                </span>

                <div className="dropdown-menu">
                    
                    {
                        auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-icons">create</span> Edit Post
                            </div>
                            <div className="dropdown-item" onClick={handleDeletePost}>
                                <span className="material-icons">delete_outline</span> Remove Post
                            </div>
                        </>
                    }

                </div>
                
            </div>






        </div>
    )
}


export default CardHeader;