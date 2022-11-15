import React from 'react';
import styles from './Authentication.module.css';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
    const navigate = useNavigate();

    if (sending) {
        return <p>Sending...</p>;
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        await sendPasswordResetEmail(email);
        alert('Sent email');
        navigate('/login');

    }
    return (
        <div className={styles.authenticationFormContainer}>
            <h3>Enter your email address so that we can send you the password reset email!</h3>
            <form className={styles.authenticationForm} action="" onSubmit={handleForgotPassword}>
                <input type="email" name='email' placeholder='Your Email' required />
                <input type="submit" value="Send password reset email" />
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    )
}

export default ForgotPassword