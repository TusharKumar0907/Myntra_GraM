import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { follow } from '../redux/actions/ProfileAction.js'

const FollowBtn = ({ user }) => {

    const [followed, setFollowed] = useState(false);

    const { auth, profile } = useSelector(state => state);
    const dispatch = useDispatch();

    const handleFollow = () => {
        setFollowed(true);
        dispatch(follow({users: profile.users, user, auth}));
    }

    const handleUnFollow = () => {
        setFollowed(false);
    }

    return (
        <div>
            
            {
            
            followed
            
            ? <button className="btn btn-outline-danger"
            onClick={ handleUnFollow }>
                UnFollow
            </button>
            
            : <button className="btn btn-outline-info"
            onClick={ handleFollow }>
                Follow
            </button>
            
            }

        </div>
    )

}


export default FollowBtn;