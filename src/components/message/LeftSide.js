import React, { useState } from 'react';
import { getDataAPI } from '../../utils/fetchData.js';
import { GLOBALTYPES } from '../../redux/actions/globalTypes.js';
import { useDispatch } from 'react-redux';

const LeftSide = () => {

    const dispatch = useDispatch();
    const { auth } = useState();
    
    const [search, setSearch] = useState('')
    const [searchUsers, setSearchUsers] = useState([])

    const handleSearch = async e => {
        e.preventDefault()
        if(!search) return setSearchUsers([]);

        try {
            const res = await getDataAPI(`search?username=${search}`, auth.token)
            setSearchUsers(res.data.users)
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT, payload: {error: err.response.data.msg}
            })
        }
    }

    return (
       <>
            <form className="message_header" onSubmit={handleSearch} >
                <input type="text" value={search}
                placeholder="Enter to Search..."
                onChange={e => setSearch(e.target.value)} />
                <button type="submit" style={{display: 'none'}}>Search</button>
            </form>


       </>
    )
}

export default LeftSide;