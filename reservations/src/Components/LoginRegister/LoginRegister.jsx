import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); 

    const registerLink = () => {
        setAction('active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const loginObj = { username, password };

        fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginObj),
        })
        .then((response) => {
            if (response.ok) {
                toast.success('Login successful!');
                navigate('/reservations');
            } else {
                throw new Error('Login failed');
            }
        })
        .catch((err) => {
            toast.error('Failed: ' + err.message);
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const regObj = { username, email, password };

        fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regObj),
        })
        .then((response) => {
            if (response.ok) {
                toast.success('Registration successful!');
                setUsername('');
                setEmail('');
                setPassword('');
                setAction('');
            } else {
                throw new Error('Registration failed');
            }
        })
        .catch((err) => {
            toast.error('Failed: ' + err.message);
        });
    };

    return (
        <div className={`wrapper ${action}`}>
            {/* Login form */}
            <div className='form-box login'>
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className='remember-forgot'>
                        <label>
                            <input type='checkbox' />
                            Remember me
                        </label>
                        <a href='#'>Forgot password?</a>
                    </div>
                    <button type='submit'>Login</button>

                    <div className='register-link'>
                        <p>
                            Don't have an account?
                            <a href='#' onClick={registerLink}>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            {/* Register form */}
            <div className='form-box register'>
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className='input-box'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username' required />
                        <FaUser className='icon' />
                    </div>
                    <div className='input-box'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
                        <FaEnvelope className='icon' />
                    </div>
                    <div className='input-box'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                        <FaLock className='icon' />
                    </div>

                    <div className='remember-forgot'>
                        <label>
                            <input type='checkbox' />
                            I agree to the terms and conditions
                        </label>
                    </div>
                    <button type='submit'>Register</button>

                    <div className='register-link'>
                        <p>
                            Already have an account?
                            <a href='#' onClick={loginLink}>
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
