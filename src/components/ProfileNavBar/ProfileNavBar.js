import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './ProfileNavBar.module.css';

function ProfileNavBar() {
    return (
        <nav className={styles.linksContainer}>
            <NavLink
                style={({ isActive }) => {
                    return {
                        color: isActive ? "blue" : "gray",
                    };
                }}
                to='about'
            >About</NavLink>
            <NavLink
                style={({ isActive }) => {
                    return {
                        color: isActive ? "blue" : "gray",
                    };
                }}
                to='socialLinks'
            >Social Links</NavLink>
            <NavLink
                style={({ isActive }) => {
                    return {
                        color: isActive ? "blue" : "gray",
                    };
                }}
                to='interests'
            >Interests</NavLink>

        </nav>
    )
}

export default ProfileNavBar