import React, { useState, useEffect } from 'react';
import { getDataAPI } from '../../utils/fetchData.js';
import { GLOBALTYPES } from '../../redux/actions/globalTypes.js';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard.js';
import { useNavigate,useParams } from "react-router-dom";
import { MESS_TYPES, getConversations } from '../../redux/actions/messageAction'


const LeftSide = () => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const { auth, message } = useSelector(state => state);

    const { id } = useParams()
    
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])
    
    
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
    
    const handleAddUser = (user) => {
        
        // console.log(message);

        setSearch('');
        setSearchUsers([]);
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}});
        return history(`/message/${user._id}`)

    }

    const isActive = (user) => {
        if(id === user._id) return 'active';
        return ''
    }


    
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
                        {                    
                            message.users.map(user => (
                                <div key={user._id} className={`message_user ${isActive(user)}`}
                                onClick={() => handleAddUser(user)}>
                                    <UserCard user={user} msg={true}>
                                        {/* {
                                            user.online
                                            ? <i className="fas fa-circle text-success" />
                                            : auth.user.following.find(item => 
                                                item._id === user._id
                                            ) && <i className="fas fa-circle" />
                                                
                                        }
                                         */}
                                    </UserCard>
                                </div>
                            ))
                        }
                    </>

                }

            </div>


       </>
    )
}

export default LeftSide;