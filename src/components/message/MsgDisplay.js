import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMessages } from '../../redux/actions/messageAction';


const MsgDisplay = ({user, msg, data}) => {

    const { auth } = useSelector(state => state)
    const dispatch = useDispatch()

    const handleDeleteMessages = () => {
        if(!data) return;
        dispatch(deleteMessages({msg, data, auth}))
    }

    return (
        <>
            <div className="chat_title">
                <span>{user.username}</span>
            </div>

            <div className="you_content">
                { 
                    user._id === auth.user._id && 
                    <button onClick={handleDeleteMessages}>
                        Delete
                    </button>
                }

                <div>
                    {
                        msg.text && 
                        <div className="chat_text">
                            {msg.text}
                        </div>
                    }
                </div>

                <div className='chat_time'>
                    8 August 2023
                </div>

            </div>
        </>
    )
}

export default MsgDisplay