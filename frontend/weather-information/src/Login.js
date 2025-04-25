import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();  // Replace useHistory with useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Using environment variable to access API URL
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
            await localStorage.setItem('token', response.data.token);
            navigate('/home');  // Use navigate() instead of history.push()
        } catch (err) {
            setErrorMessage(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    Don't have an account?{' '}
                    <Link href="/register" variant="body2">
                        Sign up
                    </Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default Login;
