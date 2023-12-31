import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileUsers } from '../../redux/actions/ProfileAction.js';
import EditProfile from './EditProfile.js';
import FollowBtn from '../FollowBtn';
import Followers from './Followers.js';
import Following from './Following.js';



const Info = () => {
    

    const { id } = useParams();
    const { auth, profile } = useSelector(state => state);
    const dispatch = useDispatch();

    const [userData, setUserData] = useState([]);
    const [onEdit, setOnEdit] = useState(false);


    const [showFollowers, setShowFollowers] = useState(false);
    
    const [showFollowing, setShowFollowing] = useState(false);


    //     // Assuming getDataAPI returns a Promise
    //     getDataAPI(`user/${ id }`, auth.token)
    //       .then(res => {
    //         // Assuming the API response contains user data in the form of an object
    //         console.log(res.data.user);
    //         setUserData(res.data.user);
    //       })
    //       .catch(error => {
    //         // Handle any errors here
    //         console.error('Error fetching user data:', error);
    //       });
    //   }, [id, auth.token]


    useEffect(() => {
        if(id === auth.user._id){
            setUserData([auth.user])
        }else{
            dispatch(getProfileUsers({users: profile.users, id, auth}));
            const newData = profile.users.filter(user => user._id === id);
            const uniqueData = Array.from(new Set(newData.map(user => user._id))).map(id =>newData.find(user => user._id === id));
            setUserData(uniqueData);
        }
    }, [id, auth, dispatch, profile.users]);


    return ( 
      
      <div className="info">
      {
          userData.map((user) => (
              
              <div className="info_container" key={user._id}>

                  <div className="info_content">
                     
                      <div className="info_content_title">
                          <h2>{user.username}</h2>
                          {


                            user._id === auth.user._id
                            ?  <button className="btn btn-outline-info"
                                onClick={() => setOnEdit(true)}>
                                    Edit Profile
                                </button>    
                                : <FollowBtn
                                user = {user}
                                />

              
                          }
                                     
                      </div>

                      <div className="follow_btn">
                          <span className="mr-4" onClick={() => setShowFollowers(true)}>
                              {user.followers.length} Followers
                          </span>
                          <span className="ml-4" onClick={() => setShowFollowing(true)}>
                              {user.following.length} Following
                          </span>
                      </div>

                      <h6>{user.fullname} <span className="text-danger">{user.mobile}</span></h6>
                      <p className="m-0">{user.address}</p>
                      <h6 className="m-0">{user.email}</h6>
                      <a href={user.website} target="_blank" rel="noreferrer">
                          {user.website}
                      </a>
                  </div>


                  {
                    onEdit && 
                    
                    <EditProfile 
                    user = {user} 
                    setOnEdit = { setOnEdit }
                    />

                  }


                  {
                    
                    showFollowers &&
                    <Followers 
                    users = {user.followers}
                    setShowFollowers={setShowFollowers}
                    />

                  }


                  {
                    
                    showFollowing &&
                    <Following 
                    users = {user.following}
                    setShowFollowing={setShowFollowing}
                    />

                  }


              </div>
          ))
      }
  </div>

    )
}


export default Info;