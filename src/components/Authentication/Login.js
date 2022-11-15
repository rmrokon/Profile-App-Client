import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Authentication.module.css';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axios from 'axios';



function Login() {
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const navigate = useNavigate();
    const location = useLocation();

    // const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:8000/api/users/search/${user?.user?.email}`).then(res => {
                if (res.status === 200) {
                    const userFromDb = res.data[0];
                    navigate(`/${userFromDb?.id}`);
                } else {
                    console.log(res);
                    alert('Something went wrong!')
                }
            })

        }
    }, [user])

    const handleLogin = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(email, password);
    }

    if (loading) {
        return <h4>Loading...</h4>
    }


    return (
        <div className={styles.authenticationFormContainer}>
            <h3>Login</h3>
            <form className={styles.authenticationForm} action="" onSubmit={handleLogin}>
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
                <small><Link to={'/forgotPassword'}>Forgot Password?</Link></small>
                <input type="submit" value="Login" />
            </form>
            {error && <small style={{ color: 'red' }}>{error.message}</small>}
            <h4>New User? <Link to={'/signUp'}>Sign Up</Link></h4>
        </div>
    )
}

export default Login