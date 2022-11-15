import { useEffect, useState } from 'react';
import axios from 'axios';

function useSaveUserInfo(user) {
    const [token, setToken] = useState('');
    useEffect(() => {
        console.log('inside use token!');
        const email = user?.user?.email;
        const name = user?.user?.displayName;
        console.log({ email, name })
        // if (email && name) {
        //     // Saving the user to database
        //     axios.post('http://localhost:8000/api/v1/users', { email, name });
        // }
    }, [user])
    return [token]
}

export default useSaveUserInfo