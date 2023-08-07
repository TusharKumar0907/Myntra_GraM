import React, { useState, useEffect } from 'react';
import { getDataAPI } from '../../utils/fetchData.js';
import { GLOBALTYPES } from '../../redux/actions/globalTypes.js';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard.js';

const LeftSide = () => {

    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);
    
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const handleAddUser = (user) => {
        console.log(user);
    }

    useEffect(() => {
        
        if(search && auth.token) {
            getDataAPI(`search?username=${ search }`, auth.token)
            .then(res => {
                console.log(res);
                setSearchUsers(res.data.users)
            })
            .catch(err => {
                dispatch({
                    type: GLOBALTYPES.ALERT , payload: {error: err.response.data.msg}
                });
            })
        } else {
            setSearchUsers([]);
        }
    }, [search, auth.token, dispatch]);

    // console.log(searchUsers);

    return (
       <>
            <form className="message_header">
                <input type="text" value={search}
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />
                <button type="submit" style={{display: 'none'}}>Search</button>
            </form>

            <div className="message_chat_list">
                
                {
                    
                    searchUsers.length !== 0
                    ? <>
                    {   
                        searchUsers.map(user => (
                            <div key={user._id} className="message_user"
                            onClick={() => handleAddUser(user)}>
                                <UserCard user = {user} />
                            </div>
                        ))
                    }
                    </>
                    : <>
                    </>

                }

            </div>


       </>
    )
}

export default LeftSide;