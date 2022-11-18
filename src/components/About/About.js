import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ProfileContext } from '../contexts/ProfileContext';
import styles from './About.module.css';

function About() {
    const { profile, profileId } = useContext(ProfileContext);
    const [editAbout, setEditAbout] = useState(false);
    const [aboutInput, setAboutInput] = useState('');
    const [profileAttribute, setProfileAttribute] = useState(0);



    useEffect(() => {
        axios.get(`http://localhost:8000/api/profileAttributes/search/${profile?.id}`)
            .then(res => setProfileAttribute(res.data[0]));
    }, [profile?.id]);


    const handleUpdateAbout = () => {
        const url = `http://localhost:8000/api/profileAttributes/${profileAttribute?.id}`;
        if (profileAttribute?.id) {
            axios.put(url, { about: aboutInput, profile_id: profile?.id }).then(res => {
                setEditAbout(false);
            });
        }
    }


    const handleCancelEditAbout = () => {
        setEditAbout(false);

    }

    const handleAddAbout = () => {
        const url = 'http://localhost:8000/api/profileAttributes';
        axios.post(url, { about: aboutInput, profile_id: profile?.id }).then(res => {
            if (res.status === 201) {
                setEditAbout(false);
            }
        });
    }
    return (
        <div className={styles.aboutContainer}>
            <textarea
                style={{
                    border: `${!editAbout ? 'none' : ''}`,
                    resize: `${!editAbout ? 'none' : ''}`,
                }}
                className={styles.aboutText}
                name="about"
                disabled={!editAbout}
                defaultValue={profileAttribute?.about}
                onChange={(e) => setAboutInput(e.target.value)}
            />
            <div className={styles.aboutBtns}>
                {!profileAttribute && <p>Nothing to show! Update your about.</p>}
                <button onClick={() => setEditAbout(true)}>Edit</button>

                {!profileAttribute && editAbout &&
                    <button
                        onClick={handleAddAbout}>Add About
                    </button>}

                {editAbout && profileAttribute &&
                    <button
                        onClick={handleUpdateAbout}
                        className={styles.updateBtn}>Update
                    </button>}

                {editAbout &&
                    <button
                        onClick={handleCancelEditAbout}
                        className={styles.cancelBtn}>Cancel
                    </button>}
            </div>
        </div >
    )
}

export default About