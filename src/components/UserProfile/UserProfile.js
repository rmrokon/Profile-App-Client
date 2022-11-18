import { signOut } from 'firebase/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import ProfileNavBar from '../ProfileNavBar/ProfileNavBar';
import styles from './UserProfile.module.css';
import axios from 'axios';
import { ProfileContext } from '../contexts/ProfileContext';
import { useQuery } from 'react-query';

function UserProfile() {
    const { id } = useParams();
    const [user, loading] = useAuthState(auth);
    const { setProfile, profile } = useContext(ProfileContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const imageInputRef = useRef(null);
    const imageAPIkey = "ba174ce3bc57048f9cd66363c4b7ddfe";

    const { isLoading, refetch } = useQuery(['id', id], () => fetch(`http://localhost:8000/api/profiles/${id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(data => setProfile(data)));



    if (loading || isLoading) {
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

    const handleFileUpload = (picType) => {
        const formData = new FormData();
        formData.append('image', selectedFile, selectedFile.name);
        const url = `https://api.imgbb.com/1/upload?key=${imageAPIkey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            const image = result?.data?.url;
            console.log(image);

            if (picType === 'propic') {

                axios.patch(`http://localhost:8000/api/profiles/${id}`, {
                    profile_photo_url: image,
                }).then(res => {
                    refetch();
                    console.log(res.data);
                });
            };
            if (picType === 'cover') {

                axios.patch(`http://localhost:8000/api/profiles/${id}`, {
                    cover_photo_url: image,
                }).then(res => {
                    refetch();
                    console.log(res.data);
                });
            };
        })
    }

    return (
        <div className={styles.profileContainer}>
            <button onClick={handleLogOut}>Logout</button>
            <header className={styles.profileHeaderContainer}>

                <div className={styles.coverPic}>
                    <img src={profile?.cover_photo_url} alt="" />
                    <input onChange={handleImageChange} style={{ display: 'none' }} type="file" name="" id="" placeholder='' ref={imageInputRef} />
                    <div className={styles.changeCoverPhoto}>
                        <button onClick={handleChoosePhoto}>
                            Choose Cover Photo
                        </button>
                        <button onClick={() => handleFileUpload('cover')}>Upload</button>
                    </div>

                    <div className={styles.proPicAndNameContainer}>
                        <div className={styles.proPic}>
                            <img src={profile?.profile_photo_url} alt="" />
                            <input onChange={handleImageChange} style={{ display: 'none' }} type="file" name="" id="" placeholder='' ref={imageInputRef} />
                            <div className={styles.changeProfilePhoto}>
                                <button onClick={handleChoosePhoto}>
                                    Choose
                                </button>
                                <button onClick={() => handleFileUpload('propic')}>Upload</button>
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