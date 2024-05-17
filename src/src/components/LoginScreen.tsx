import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import RoadEyeLogoRB from '../assets/img/roadEyeiLogo-removebg.png'


const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (email === 'admin@gmail.com' && password === 'admin1234') {
            setIsLoggedIn(true);
        } else {
            alert('Niepoprawny email lub hasło');
        }
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#011226" color="#fff">
            {/*<BluetoothDriveIcon fontSize="large" style={{ color: '#ff5252' }} />*/}
            <img src={RoadEyeLogoRB} alt={'royal eye logo'} />
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#ff5252' }}>Zaloguj się do RoadEye</Typography>
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
                    label="Hasło"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ style: { color: '#fff' } }}
                    InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href='/dashboard'>
                    <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#ff5252' }} onClick={handleLogin}>Zaloguj się</Button>
                </a>
            </Box>
        </Box>
    );
};

export default LoginScreen;
