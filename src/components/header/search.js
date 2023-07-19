import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData.js';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { Link } from "react-router-dom";
import UserCard from '../UserCard';




const Search = () => {

    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const { auth } = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        
        if(search && auth.token) {
            getDataAPI(`search?username=${ search }`, auth.token)
            .then(res => setUsers(res.data.users))
            .catch(err => {
                dispatch({
                    type: GLOBALTYPES.ALERT , payload: {error: err.response.data.msg}
                });
            })
        } else {
            setUsers([]);
        }
    }, [search, auth.token, dispatch]);


    const handleclose = () => {
        setSearch('')
        setUsers([])
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!search) return;

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    return (
       
       <form className="search_form">
            
            <input type="text" name="search" value={search}  id="search"
            onChange={e => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))} />

            <div className="search_icon" style={{opacity: search ? 0 : 0.3}}>
                <span className="material-icons">search</span>
                <span>Enter to Search</span>
            </div>


            <div className="users">
                {
                    search && users.map(user => (
                        <Link key={user._id} to={ `/profile/${user._id}` } onClick={ handleclose }>
                            <UserCard user={user} border="border"/>
                        </Link>
                    ))
                }
            </div>

            

       </form>
    )
}


export default Search