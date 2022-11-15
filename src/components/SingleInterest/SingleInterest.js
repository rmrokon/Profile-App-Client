import axios from 'axios';
import React from 'react'

function SingleInterest({ interest, interests, setInterests }) {

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/interests/${id}`)
            .then(res => {
                if (res.status === 200) {
                    const newInterests = interests.filter(int => int.id !== id);
                    setInterests(newInterests);
                    alert('Deleted!');
                } else {
                    console.log('failed', res.data);
                }
            });
    }

    return (
        <div>
            <input
                type={'text'}
                defaultValue={interest?.interest}
                disabled={true}
            />
            <button onClick={() => handleDelete(interest?.id)}>X</button>
        </div>
    )
}

export default SingleInterest