import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UserCard = ({children, user, border, handleClose, setShowFollowers, setShowFollowing, msg}) => {

    const handleCloseAll = () => {
        if(handleClose) handleClose()
        if(setShowFollowers) setShowFollowers(false)
        if(setShowFollowing) setShowFollowing(false)
    }

    const showMsg = (user) => {
        return(
            <>
                <div>
                    {user.text}
                </div>
            </>
        )
    }

    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
            <div>

                <Link to={`/profile/${user._id}`} onClick={handleCloseAll}
                className="d-flex align-items-center">
                    
                    <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                  
                        <span className="d-block">{user.username}</span>
                        
                        <small style={{opacity: 0.7}}>
                            {
                                msg 
                                ? showMsg(user)
                                : user.fullname
                            }
                        </small>
                    </div>
                </Link>
            </div>
            {children}
        </div>
    )
}

export default UserCard