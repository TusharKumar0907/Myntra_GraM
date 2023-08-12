import React, { useState, useEffect } from 'react';
import UserCard from '../UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MsgDisplay from './MsgDisplay.js';
import { GLOBALTYPES } from '../../redux/actions/globalTypes.js';
import { addMessage, getMessages } from '../../redux/actions/messageAction.js';


const RightSide = () => {
    
    const { auth, message, socket } = useSelector(state => state);
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


    const handleSubmit = async (e) => {
        
        e.preventDefault()

        if(!text.trim()) return;
        
        setText('')

        let newArr = [];


        const msg = {
            sender: auth.user._id,
            recipient: id,
            text, 
            media: newArr,
            createdAt: new Date().toISOString()
        }


        dispatch(addMessage({msg, auth, socket}))
    }

    useEffect(() => {
        if(id) {
            const getMessagesData = async () => {
                await dispatch(getMessages({auth, id}))
            }
            getMessagesData()
        }
    },[id, dispatch, auth])
    
    
    return (
        <>
            <div className="message_header">
                <UserCard user = {user}>
                    
                </UserCard>
            </div>

            <div className='chat_container'>
                <div className="chat_display">
                    {
                        message.data.map((msg, index) => (
                            <div key ={index}>
                                {
                                    msg.sender !== auth.user._id &&
                                    <div className="chat_row other_message">
                                        <MsgDisplay user={ user } msg={ msg }/>
                                    </div>

                                }
                                {
                                    msg.sender === auth.user._id &&                                    
                                    <div className="chat_row you_message">
                                        <MsgDisplay user={ auth.user } msg={ msg }/>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>

            <form className="chat_input" onSubmit={handleSubmit} >

                <input type="text" placeholder="Enter your message..."
                value={text} onChange={e => setText(e.target.value)} />

                <button type="submit" className="material-icons"
                disabled={text ? false : true}>
                    near_me
                </button>

            </form>

        </>
    )
}

export default RightSide;