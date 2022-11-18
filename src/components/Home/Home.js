import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import SingleProfile from '../SingleProfile/SingleProfile';
import styles from './Home.module.css';

function Home() {
    const [profiles, setProfiles] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/profiles/search/${userId}`)
            .then(res => {
                setProfiles(res.data);
            })
    }, [userId]);

    return (
        <div className={styles.profilesContainer}>
            {
                profiles?.map(profile => <SingleProfile key={profile?.id} profile={profile} />)
            }
        </div>
    )
}

export default Home