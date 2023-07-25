import React from 'react';
import Carousel from '../../Carousel.js';


const CardBody = ({post}) => {
    return (
        <div className="card_body">
            <div className="card_body-content">
                <span>{ post.content }</span>
            </div>

            {
                <Carousel images={post.images} id={post._id}/>
            }

        </div>
    )
}


export default CardBody;