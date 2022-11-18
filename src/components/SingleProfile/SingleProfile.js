import { signOut } from 'firebase/auth';
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from './SingleProfile.module.css';

function SingleProfile({ profile }) {
    const { username, active, user_id, id } = profile;
    const { setProfileId } = useContext(ProfileContext);

    if (id) {
        setProfileId(id);
    }

    console.log(id);

    console.log(profile);
    return (
        <div className={styles.singleProfileContainer}>
            <Link to={`/userProfile/${id}`}><h3>{username}</h3></Link>
            <small
                style={{ color: `${active ? 'green' : 'red'}`, marginRight: '10px' }}
            >
                {active ? 'Active' : 'Deactivated'}</small>
            <button
                onClick={() => signOut(auth)}
            >Logout</button>
        </div>
    )
}

export default SingleProfile