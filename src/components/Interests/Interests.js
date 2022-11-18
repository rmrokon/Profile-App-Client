import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query';
import { ProfileContext } from '../contexts/ProfileContext';
import SingleInterest from '../SingleInterest/SingleInterest';
import styles from './Interests.module.css';

function Interests() {
    const { profile } = useContext(ProfileContext);
    const formRef = useRef();
    const [profileAttribute, setProfileAttribute] = useState(0);

    const { data: interests, isLoading, refetch } = useQuery(['profileAttribute', profileAttribute], () => fetch(`http://localhost:8000/api/interests/search/${profileAttribute?.id}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));



    useEffect(() => {
        axios.get(`http://localhost:8000/api/profileAttributes/search/${profile?.id}`)
            .then(res => setProfileAttribute(res.data[0]));
    }, [profile?.id]);

    if (isLoading) {
        return <h3>Loading...</h3>
    }

    const noInterestMessage = interests?.length === 0 ? "Add new Interest!" : '';
    console.log(interests);

    const handleSubmit = (e) => {
        e.preventDefault();

        const interest = e.target.interest.value;

        if (!profileAttribute) {
            console.log('With profile Id');
            axios.post('http://localhost:8000/api/profileAttributes/', {
                profile_id: profile?.id,
                interest
            }).then(res => {
                if (res.status === 200) {
                    refetch();
                    alert('Interest Added');
                    formRef.current.reset();
                } else {
                    alert('Something Went wrong!');
                }
            })
        } else {
            axios.post('http://localhost:8000/api/interests', {
                interest,
                profile_attributes_id: profileAttribute?.id
            }).then(res => {
                if (res.status === 201) {
                    alert('Interest Added');
                    refetch();
                    formRef.current.reset();
                } else {
                    alert('Something Went wrong!');
                }
            })
        }
    }


    return (
        <div className={styles.interestsContainer}>
            <form className={styles.addInterestForm} action="" onSubmit={handleSubmit} ref={formRef}>
                <input type="text" name="interest" required />
                <input type="submit" value="Add Interest" />
            </form>
            <div className={styles.interests}>
                {noInterestMessage && <span>{noInterestMessage}</span>}
                {
                    interests?.map(interest => <SingleInterest
                        key={interest?.id}
                        interest={interest}
                        interests={interests}
                        refetch={refetch}
                    />)
                }
            </div>
        </div>
    )
}

export default Interests