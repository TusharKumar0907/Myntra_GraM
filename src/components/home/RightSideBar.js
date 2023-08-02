import React from 'react'
import { useSelector, useDispatch } from 'react-redux'; 

import UserCard from '../UserCard.js';
import FollowBtn from '../FollowBtn.js';

const RightSideBar = () => {
    
    const { auth, suggestions } = useSelector(state => state);

    return (
        <div>
            
            <div>
                <h5>Suggestions</h5>
            </div>

            {
                <div className="suggestions">
                    {
                        suggestions.users.map(user => (
                            <UserCard key={user._id} user ={user} >
                                <FollowBtn user={user} /> 
                            </UserCard>
                        ))
                    }
                </div>
            }

        </div>
    )
}


export default RightSideBar;