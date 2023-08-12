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


    // console.log(msg);

    return (
        <>
            <div className="chat_title">
                <span>{ user.username }</span>
            </div>

            <div className="you_content">
            
                    {
                        msg.text && 
                        <div className="chat_text">
                            { msg.text }
                        </div>
                    }

            </div>
        </>
    )
}

export default MsgDisplay