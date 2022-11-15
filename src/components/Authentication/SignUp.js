import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Authentication.module.css';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { ProfileContext } from '../contexts/ProfileContext';



function SignUp() {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [passError, setPassError] = useState('');
    const navigate = useNavigate();
    const [userForDb, setUserForDb] = useState({});
    const [updateProfile, updating, errorUpdateProfile] = useUpdateProfile(auth);
    const [dbError, setDbError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [username, setUsername] = useState('');
    // const { userId, setUserId } = useContext(ProfileContext);
    // const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user) {
            // Saving the user to database
            axios.post('http://localhost:8000/api/users', userForDb).then(res => {
                console.log(res.data);

                const userId = res?.data.id;
                axios.post('http://localhost:8000/api/profiles', { user_id: res?.data?.id, username }).then(res => {
                    navigate(`/${userId}`);
                })

            });
        }
    }, [user]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        setUserForDb({ email, name });
        setUsername(username);

        if (password === confirmPassword) {
            // Registering user to firebase
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });

        } else {
            setPassError('Passwords do not match!');
        }
    }

    if (loading || updating) {
        return <h4>Loading...</h4>
    }



    const handleCheckIfUsernameIsUnique = (usernameInput) => {
        console.log(usernameInput);
        axios.get(`http://localhost:8000/api/profiles/searchWithUsername/${usernameInput}`)
            .then(res => {
                console.log(res.data);
                if (res.data?.length !== 0) {
                    setUsernameError('Username is already taken!')
                } else {
                    setUsernameError('')
                }
            });
    }

    return (
        <div className={styles.authenticationFormContainer}>
            <h3>Sign Up</h3>
            <form className={styles.authenticationForm} action="" onSubmit={handleRegister}>
                <input
                    type="text"
                    name='username'
                    placeholder='Enter Username'
                    onChange={(e) => handleCheckIfUsernameIsUnique(e.target.value)}
                    required
                />

                {usernameError && <small style={{ color: 'red' }}>{usernameError}</small>}

                <input
                    type="text"
                    name='name'
                    placeholder='Enter Name'
                    required
                />

                <input
                    type="email"
                    name='email'
                    placeholder='Enter Email'
                    required
                />

                <input
                    type="password"
                    name='password'
                    placeholder='Enter Password'
                    required
                />

                <input
                    type="password"
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    required
                />

                {passError && <small style={{ color: 'red' }}>{passError}</small>}
                {error && <small style={{ color: 'red' }}>{error.message}</small>}
                {errorUpdateProfile && <small style={{ color: 'red' }}>{errorUpdateProfile.message}</small>}
                {dbError && <small style={{ color: 'red' }}>{dbError.message}</small>}

                <div className={styles.termsAndCondition}>
                    <input type="checkbox" name="policy" id="" required />
                    <small>Accept terms & conditions!</small>
                </div>
                <input type="submit" value="Register" disabled={usernameError} />
            </form>
            <h4>Already have an account? <Link to={'/login'}>Login</Link></h4>

        </div>
    )
}

export default SignUp;