import axios from 'axios';
import { useEffect, useState } from 'react';

function useUserFromDb(user) {
    const [userFromDb, setUserFromDb] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/v1/users?email[eq]=${user?.email}`).then(res => {
            setUserFromDb(res.data.data[0]);
        })
    }, [user]);

    return userFromDb;
}

export default useUserFromDb