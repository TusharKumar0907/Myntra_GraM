import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes.js';
import { createPost,updatePost } from '../redux/actions/postAction.js';


const StatusModal = () => {

    const  { auth, status } = useSelector(state => state);

    const dispatch = useDispatch();

    const [content, setContent] = useState('');

    const [images, setImages] = useState([]);

    const handleChangeImages = (e) => {

        const files = [...e.target.files]
        let err = ""
        let newImages = []

        files.forEach(file => {
            return newImages.push(file);
        })

        setImages([...images, ...newImages]);

    }


    const handleSubmit = (e) => {

        e.preventDefault();

        if(status.onEdit){
            dispatch(updatePost({content, images, auth, status}))
        }else{
            dispatch(createPost({content, images, auth}))
        }

    }


    useEffect(() => {
        if(status.onEdit){
            setContent(status.content)
            setImages(status.images)
        }
    },[status])


    return (

        <div className="status_modal">
            <form onSubmit={handleSubmit}>

                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={() => dispatch({type:GLOBALTYPES.STATUS, payload: false})}>&times;</span>
                </div>

                <div className="status_body">
                    <textarea name="content" 
                    placeholder={`${auth.user.fullname}, what are you thinking ?`} 
                    onChange={e => setContent(e.target.value)} />


                    <div className="show_images">
                        {
                            images.map((img, index) => (
                                <div key ={index} id = "file_img"> 
                                <img src={img.url ? img.url:URL.createObjectURL(img)}
                                alt="images"
                                />
                                </div>
                            ))
                        }
                    </div>

                <div className="input_images">

                    <div className="file_upload">
                        <i className="fas fa-image" />
                        <input type="file" name="file" id="file" multiple accept="image/*" onChange={ handleChangeImages } />
                    </div>
                </div>

                </div>

                <div className="status_footer">
                    <button className="btn-btn-dark">Post</button>
                </div>



            </form>
        </div>
    )
}

export default StatusModal;