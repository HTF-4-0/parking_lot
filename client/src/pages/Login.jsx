import React, { useState } from 'react';
import '../css/Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(true);
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:
                        <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>Password:
                        <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Login;
