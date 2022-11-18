import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { ProfileContext } from '../contexts/ProfileContext';
import styles from './SocialLinks.module.css';

function SocialLinks() {
    const { profile } = useContext(ProfileContext);
    const [edit, setEdit] = useState(false);
    const [profileAttribute, setProfileAttribute] = useState(0);

    const { isLoading, refetch } = useQuery(['profile', profile], () => fetch(`http://localhost:8000/api/profileAttributes/search/${profile?.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()).then(data => setProfileAttribute(data[0])));

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/profileAttributes/search/${profile?.id}`)
    //         .then(res => setProfileAttribute(res.data[0]));
    // }, [profile?.id]);

    console.log(profile);

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const facebook = e.target.facebook.value;
        const linkedin = e.target.linkedin.value;
        const instagram = e.target.instagram.value;

        if (!profileAttribute) {

            // Creating profile attribute in the profile for a new user.

            console.log('With profile Id');
            axios.post('http://localhost:8000/api/profileAttributes', {
                profile_id: profile?.id,
                facebook,
                linkedin,
                instagram
            }).then(res => {
                if (res.status === 201) {

                    setEdit(false);
                    refetch();
                } else {
                    alert('Something Went wrong!');
                }
            })
        } else {

            // Updating profile attributes value.

            console.log('With profile Attribute Id');
            const url = `http://localhost:8000/api/profileAttributes/${profileAttribute?.id}`;
            axios.put(url, {
                facebook,
                linkedin,
                instagram
            })
                .then(res => {
                    if (res.status === 200) {
                        setEdit(false);
                        refetch();
                    } else {
                        console.log('failed', res.data);
                    }
                })
        }
    }

    const isFacebookPrivate = profileAttribute?.is_facebook_private === 0 ? 'Public' : 'Private';
    const changeFacebookPrivacyBtnLabel = isFacebookPrivate === 'Public' ? 'Make Private' : 'Make Public';

    const isLinkedInPrivate = profileAttribute?.is_linkedin_private === 0 ? 'Public' : 'Private';
    const changeLinkedInPrivacyBtnLabel = isLinkedInPrivate === 'Public' ? 'Make Private' : 'Make Public';

    const isInstagramPrivate = profileAttribute?.is_instagram_private === 0 ? 'Public' : 'Private';
    const changeInstagramPrivacyBtnLabel = isLinkedInPrivate === 'Public' ? 'Make Private' : 'Make Public';


    const handlechangeFacebookPrivacy = () => {
        axios.patch(`http://localhost:8000/api/profileAttributes/${profileAttribute?.id}`, {
            is_facebook_private: !profileAttribute?.is_facebook_private
        }).then(res => {
            refetch();
            alert('Privacy changed!');
        })
    }
    const handlechangeLinkedInPrivacy = () => {
        axios.patch(`http://localhost:8000/api/profileAttributes/${profileAttribute?.id}`, {
            is_linkedin_private: !profileAttribute?.is_linkedin_private
        }).then(res => {
            refetch();
            alert('Privacy changed!');
        })
    }
    const handlechangeInstagramPrivacy = () => {
        axios.patch(`http://localhost:8000/api/profileAttributes/${profileAttribute?.id}`, {
            is_instagram_private: !profileAttribute?.is_instagram_private
        }).then(res => {
            refetch();
            alert('Privacy changed!');
        })
    }

    console.log(profileAttribute);
    return (
        <div>
            <div className={styles.socialLinkFormContainer}>
                <form className={styles.socialLinksForm} action="" onSubmit={handleSubmit}>
                    <div className={styles.socialHandles}>
                        <label>Facebook</label>
                        <input
                            type="text"
                            name='facebook'
                            defaultValue={profileAttribute?.facebook}
                            disabled={!edit}
                        />
                        <div className={styles.privacySetting}>
                            <span>{isFacebookPrivate}</span>
                            <button onClick={handlechangeFacebookPrivacy}>{changeFacebookPrivacyBtnLabel}</button>
                        </div>
                    </div>

                    <div className={styles.socialHandles}>
                        <label>LinkedIn</label>
                        <input
                            type="text"
                            name='linkedin'
                            defaultValue={profileAttribute?.linkedin}
                            disabled={!edit}
                        />

                        <div className={styles.privacySetting}>
                            <span>{isLinkedInPrivate}</span>
                            <button onClick={handlechangeLinkedInPrivacy}>{changeLinkedInPrivacyBtnLabel}</button>
                        </div>

                    </div>

                    <div className={styles.socialHandles}>
                        <label>Instagram</label>
                        <input
                            type="text"
                            name='instagram'
                            defaultValue={profileAttribute?.instagram}
                            disabled={!edit}
                        />

                        <div className={styles.privacySetting}>
                            <span>{isInstagramPrivate}</span>
                            <button onClick={handlechangeInstagramPrivacy}>{changeInstagramPrivacyBtnLabel}</button>
                        </div>

                    </div>


                    {
                        edit &&
                        <input
                            className={styles.saveBtn}
                            type="submit"
                            value="Save"
                        />
                    }

                </form>
                <button
                    className={styles.editBtn}
                    onClick={() => setEdit(true)}
                ><i class="fas fa-edit"></i> Edit
                </button>
                {
                    edit &&
                    <button
                        onClick={() => setEdit(false)}
                        className={styles.cancelBtn}>Cancel
                    </button>
                }

            </div>
        </div>
    )
}

export default SocialLinks