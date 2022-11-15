import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { ProfileContext } from '../contexts/ProfileContext';
import SingleInterest from '../SingleInterest/SingleInterest';

function Interests() {
    const { profile } = useContext(ProfileContext);
    const [interests, setInterests] = useState([]);
    const formRef = useRef();
    const [profileAttribute, setProfileAttribute] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/profileAttributes/search/${profile?.id}`)
            .then(res => setProfileAttribute(res.data[0]));
    }, [profile?.id]);

    useEffect(() => {
        if (profileAttribute) {
            axios.get(`http://localhost:8000/api/interests/search/${profileAttribute?.id}`).then(res => {
                console.log('get interests response', res);
                if (res.status === 200) {
                    setInterests(res.data);
                }
            })
        }
    }, [profileAttribute]);

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
                    const newInterests = [...interests, {
                        id: 1,
                        interest
                    }];
                    setInterests(newInterests);

                    console.log(res);
                    alert('Interest Added');
                    formRef.current.reset();
                } else {
                    console.log('failed', res.data);
                }
            })
        } else {
            axios.post('http://localhost:8000/api/interests', {
                interest,
                profile_attributes_id: profileAttribute?.id
            }).then(res => {
                console.log(res);
                if (res.status === 201) {
                    const newInterests = [...interests, {
                        id: 1,
                        interest
                    }];
                    setInterests(newInterests);

                    alert('Interest Added');
                    formRef.current.reset();
                } else {
                    console.log('failed', res.data);
                }
            })
        }
    }


    return (
        <div>
            <div>
                <form action="" onSubmit={handleSubmit} ref={formRef}>
                    <input type="text" name="interest" required />
                    <input type="submit" value="Add Interest" />
                </form>
            </div>
            <div>
                {noInterestMessage && <span>{noInterestMessage}</span>}
                {
                    interests?.map(interest => <SingleInterest
                        key={interest?.id}
                        interest={interest}
                        interests={interests}
                        setInterests={setInterests}
                    />)
                }
            </div>
        </div>
    )
}

export default Interests