import React from 'react'

const UserCard = ({user, border}) => {
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
        <div>
               <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    
                    <small style={{opacity: 0.7}}>
                        {
                           user.fullname
                        }
                    </small>
                </div>
        </div>
    </div>
    )
}


export default UserCard