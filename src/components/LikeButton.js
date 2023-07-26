import React from 'react';

const LikeButton = ({isLike, handleLike, handleUnLike}) => {
    
    return (
        
        <div>
            {
                isLike
                ?     <span className="material-icons text-danger" onClick={handleUnLike} >favorite</span>
                :     <span className="material-icons text-black" onClick={handleLike} >favorite</span>
            }
        </div>
    )
}


export default LikeButton;