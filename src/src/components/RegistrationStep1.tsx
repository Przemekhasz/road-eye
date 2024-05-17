import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import RoadEyeLogoRB from '../assets/img/roadEyeiLogo-removebg.png';

interface RegistrationStep1Props {
    onNext: (data: any) => void;
}

interface RegistrationStep1State {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

class RegistrationStep1 extends React.Component<RegistrationStep1Props, RegistrationStep1State> {
    constructor(props: RegistrationStep1Props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({ [name]: value } as Pick<RegistrationStep1State, keyof RegistrationStep1State>);
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        this.props.onNext(this.state);
    };

    render() {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#011226" color="#fff">
                <img src={RoadEyeLogoRB} alt="road eye logo" />
                <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#ff5252' }}>Register with RoadEye - Step 1</Typography>
                <Box component="form" onSubmit={this.handleSubmit} width="400px">
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ style: { color: '#fff' } }}
                        InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        required
                    />
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                        />
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                            style={{ marginRight: '10px' }}
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="confirmPassword"
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            required
                        />
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#ff5252' }}>Next</Button>
                </Box>
                <Box mt={2} textAlign="center">
                    <Typography variant="body2" color="inherit">
                        Already have an account? <Link href="/sign-in" color="inherit" style={{ color: '#ff5252' }}>Log in</Link>
                    </Typography>
                </Box>
            </Box>
        );
    }
}

export default RegistrationStep1;
