import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MsgDisplay from './MsgDisplay.js';


const RightSide = () => {
    
    const { auth, message } = useSelector(state => state);
    const dispatch = useDispatch();

    const { id } = useParams();
    const [user, setUser] = useState([]);

    const[text, setText] = useState('');


    useEffect(() => {
        const newUser = message.users.find(user => user._id === id)
        if(newUser) {
            setUser(newUser)
        }
    }, [message.users, id])
    
    
    return (
        <>
            <div className="message_header">
                <UserCard user = {user}>
                    
                </UserCard>
            </div>

            <div className='chat_container'>
                <div className="chat_display">
                    <div className="chat_row other_message">
                        <MsgDisplay user={user} msg={message.users}/>
                    </div>
                </div>
            </div>

            <form className='chat_input'>
                <input type="text" placeholder="Enter your message..."
                value={text} onChange={e => setText(e.target.value)} />

                <button>Send</button>
            </form>

        </>
    )
}

export default RightSide;