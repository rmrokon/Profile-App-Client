import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { ProfileContext } from '../contexts/ProfileContext';

function SingleProfile({ profile }) {
    const { username, active, user_id, id } = profile;
    const { setProfileId } = useContext(ProfileContext);

    if (id) {
        setProfileId(id);
    }

    console.log(id);

    console.log(profile);
    return (
        <div>
            <Link to={`/userProfile/${id}`}><h3>{username}</h3></Link>
            <small>{active ? 'Active' : 'Deactivated'}</small>
            <button onClick={() => signOut(auth)}>Logout</button>
        </div>
    )
}

export default SingleProfile