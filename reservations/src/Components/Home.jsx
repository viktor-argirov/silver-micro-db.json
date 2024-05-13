import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'; 

const Home = () => {
    return (
        <div className="home-wrapper">
            <h1 className="home-title">Reservations</h1>
            <div className="button-container">
                <Link to="/login">
                    <button className="login-button">Login</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
