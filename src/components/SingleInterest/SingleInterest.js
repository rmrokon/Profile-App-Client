import axios from 'axios';
import React from 'react';
import styles from './SingleInterest.module.css';

function SingleInterest({ interest, interests, refetch }) {

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/interests/${id}`)
            .then(res => {
                if (res.status === 200) {
                    // const newInterests = interests.filter(int => int.id !== id);
                    // setInterests(newInterests);
                    refetch();
                    alert('Deleted!');
                } else {
                    console.log('failed', res.data);
                }
            });
    }

    return (
        <div className={styles.singleInterestContainer}>
            <input
                type={'text'}
                defaultValue={interest?.interest}
                disabled={true}
            />
            <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(interest?.id)}><i class="fas fa-trash"></i></button>
        </div>
    )
}

export default SingleInterest