import React from 'react';
import { Link } from 'react-router-dom';

const CardFooter = ({post}) => {
    return (
        <div className="card_footer">
            <div className="card_icon_menu">
               
                <div>

                    <span class="material-icons">favorite</span>

                    <Link to={`/post/${post._id}`} className="text-dark">
                        <span class="material-icons">comment</span>
                    </Link>

                </div>

                <div className="d-flex justify-content-between mx-0">
                    
                    <h6 style={{padding: '0 25px'}}>
                    { post.likes.length } Likes
                    </h6>

                    <h6 style={{padding: '0 25px'}}>
                    { post.comments.length } Comments
                    </h6>

                </div>

            </div>
        </div>
    )
}


export default CardFooter;