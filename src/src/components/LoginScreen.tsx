import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import RoadEyeLogoRB from '../assets/img/roadEyeiLogo-removebg.png';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'admin1234') {
            setIsLoggedIn(true);
        } else {
            alert('Incorrect email or password');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#011226" color="#fff">
            <img src={RoadEyeLogoRB} alt={'road eye logo'} />
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#ff5252' }}>Log in to RoadEye</Typography>
            <Box width="300px">
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href='/'>
                    <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#ff5252' }} onClick={handleLogin}>Log In</Button>
                </a>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="inherit">
                        Don't have an account? <Link href="/sign-up" color="inherit" style={{ color: '#ff5252' }}>Sign up</Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginScreen;
