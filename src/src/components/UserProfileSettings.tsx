import React, { Component } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    Tabs,
    Tab
} from '@mui/material';
import { DrawerBox } from './DrawerBox';

type UserProfileState = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    avatar: File | null;
    carBrand: string;
    customCarBrand: string;
    carModel: string;
    customCarModel: string;
    dashcam: string;
    customDashcam: string;
    tabValue: number;
};

class UserProfileSettings extends Component<{}, UserProfileState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            avatar: null,
            carBrand: '',
            customCarBrand: '',
            carModel: '',
            customCarModel: '',
            dashcam: '',
            customDashcam: '',
            tabValue: 0,
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'avatar' && files) {
            this.setState({ avatar: files[0] });
        } else {
            this.setState({ [name]: value } as unknown as UserProfileState);
        }
    };

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ tabValue: newValue });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logic to handle form submission, e.g., API call
    };

    render() {
        const { tabValue } = this.state;

        return (
            <>
                <DrawerBox />
                <Container maxWidth="lg">
                    <Box
                        component="form"
                        onSubmit={this.handleSubmit}
                        sx={{
                            mt: 4,
                            p: 4,
                            bgcolor: '#333',
                            color: '#fff',
                            borderRadius: 2,
                            boxShadow: 1,
                        }}
                    >
                        <Typography variant="h4" component="h1" color="#ff5252" gutterBottom>
                            User Profile Settings
                        </Typography>
                        <Tabs
                            value={tabValue}
                            onChange={this.handleTabChange}
                            indicatorColor="primary"
                            textColor="inherit"
                            variant="fullWidth"
                            sx={{ color: '#fff' }}
                        >
                            <Tab label="Personal Info" sx={{ color: '#fff' }} />
                            <Tab label="Car Details" sx={{ color: '#fff' }} />
                        </Tabs>
                        <Box sx={{ mt: 2 }}>
                            {tabValue === 0 && (
                                <>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Username"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="First Name"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Last Name"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Confirm Password"
                                        type="password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        type="file"
                                        name="avatar"
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                </>
                            )}
                            {tabValue === 1 && (
                                <>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Car Brand"
                                        name="carBrand"
                                        value={this.state.carBrand}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Custom Car Brand"
                                        name="customCarBrand"
                                        value={this.state.customCarBrand}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Car Model"
                                        name="carModel"
                                        value={this.state.carModel}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Custom Car Model"
                                        name="customCarModel"
                                        value={this.state.customCarModel}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Dashcam"
                                        name="dashcam"
                                        value={this.state.dashcam}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Custom Dashcam"
                                        name="customDashcam"
                                        value={this.state.customDashcam}
                                        onChange={this.handleChange}
                                        InputLabelProps={{ style: { color: '#fff' } }}
                                        InputProps={{
                                            style: { color: '#fff' },
                                            sx: { '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' } } }
                                        }}
                                    />
                                </>
                            )}
                        </Box>
                        <Box mt={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ bgcolor: '#ff5252', color: '#fff', '&:hover': { bgcolor: '#ff4040' } }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </>
        );
    }
}

export default UserProfileSettings;
