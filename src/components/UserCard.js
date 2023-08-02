import React from 'react'

const UserCard = ({user, border, children}) => {
    return (
        <div className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}>
        <div>
               <div className="ml-1" style={{transform: 'translateY(-2px)'}}>
                    <span className="d-block">{user.username}</span>
                    
                    <small style={{opacity: 1}}>
                        {
                           user.fullname
                        }
                    </small>
                </div>
        </div>
        <div style={{ paddingLeft: '20px' }} >
        { children }
        </div>
        </div>
    )
}


export default UserCard