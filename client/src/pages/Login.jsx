import React, { useState } from 'react';
import '../css/Login.css';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isLoginSuccessful = await checkLogin(username, password);
            if (isLoginSuccessful) {
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="success">
                        This is a filled success Alert.
                    </Alert>
                </Stack>
                onLogin(true);
            } else {
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert variant="filled" severity="info">
                        This is a filled info Alert.
                    </Alert>
                </Stack>
                console.error('Invalid email or password');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const checkLogin = async (username, password) => {
        try {
            const response = await fetch('http://localhost:3360/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            return response.ok;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Email:
                        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </label>
                    <label>Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
        </div>
    );
};

export default Login;
