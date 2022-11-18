import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import ProfileNavBar from '../ProfileNavBar/ProfileNavBar';
import styles from './UserProfile.module.css';
import axios from 'axios';
import { ProfileContext } from '../contexts/ProfileContext';

function UserProfile() {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const { setProfile, profile } = useContext(ProfileContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const imageInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const imageAPIkey = "ba174ce3bc57048f9cd66363c4b7ddfe";

    useEffect(() => {
        const url = `http://localhost:8000/api/profiles/${id}`;
        axios.get(url).then(res => {
            setProfile(res?.data)
        });
    }, [id]);

    console.log(profile);

    if (loading) {
        return <h3>Loading...</h3>
    }
    const handleLogOut = () => {
        signOut(auth);
    }


    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const handleChoosePhoto = () => {
        return imageInputRef.current?.click();
    }

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile, selectedFile.name);
        const url = `https://api.imgbb.com/1/upload?key=${imageAPIkey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            const image = result?.data?.url;
            console.log(image);
            setImageUrl(image);
        })
    }

    return (
        <div className={styles.profileContainer}>
            <button onClick={handleLogOut}>Logout</button>
            <header className={styles.profileHeaderContainer}>
                <div className={styles.coverPic}>
                    <div className={styles.proPicAndNameContainer}>
                        <div className={styles.proPic}>

                            <img src={imageUrl} alt="" />
                            <input onChange={handleImageChange} style={{ display: 'none' }} type="file" name="" id="" placeholder='' ref={imageInputRef} />
                            <div>
                                <button className={styles.choosePhoto} onClick={handleChoosePhoto}>
                                    Choose
                                </button>
                                <button className={styles.uploadPhoto} onClick={handleFileUpload}>Upload</button>
                            </div>
                        </div>
                        <h4 className={styles.profileName}>{user?.displayName}</h4>
                    </div>
                </div>
                <ProfileNavBar />
            </header>
            <main className={styles.profileInformation}>
                <Outlet />
            </main>
        </div>
    )
}

export default UserProfile;