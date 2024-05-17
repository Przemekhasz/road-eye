import React, { ChangeEvent, FormEvent } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Link } from '@mui/material';
import RoadEyeLogoRB from '../assets/img/roadEyeiLogo-removebg.png';

interface RegistrationStep2Props {
    onSubmit: (data: any) => void;
    previousData: any;
}

interface RegistrationStep2State {
    avatar: File | null;
    carBrand: string;
    customCarBrand: string;
    carModel: string;
    customCarModel: string;
    dashcam: string;
    customDashcam: string;
}

class RegistrationStep2 extends React.Component<RegistrationStep2Props, RegistrationStep2State> {
    constructor(props: RegistrationStep2Props) {
        super(props);
        this.state = {
            avatar: null,
            carBrand: '',
            customCarBrand: '',
            carModel: '',
            customCarModel: '',
            dashcam: '',
            customDashcam: '',
        };
    }

    handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState({[name]: value} as unknown as Pick<RegistrationStep2State, keyof RegistrationStep2State>);
    };

    handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            this.setState({ avatar: e.target.files[0] });
        }
    };

    handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const combinedData = { ...this.props.previousData, ...this.state };
        this.props.onSubmit(combinedData);
    };

    render() {
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#011226" color="#fff">
                <img src={RoadEyeLogoRB} alt="road eye logo" />
                <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', color: '#ff5252' }}>Register with RoadEye - Step 2</Typography>
                <Box component="form" onSubmit={this.handleSubmit} width="400px">
                    <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="avatar"
                            type="file"
                            onChange={this.handleFileChange}
                        />
                        <label htmlFor="avatar">
                            <Button variant="contained" component="span" style={{ backgroundColor: '#ff5252' }}>
                                Choose Avatar
                            </Button>
                        </label>
                        <Typography style={{ marginLeft: '10px' }}>{this.state.avatar ? this.state.avatar.name : "No file chosen"}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="Car Brand"
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="carBrand"
                            value={this.state.carBrand}
                            onChange={this.handleChange}
                            style={{ marginRight: '10px' }}
                        >
                            <MenuItem value="">Select brand</MenuItem>
                            <MenuItem value="audi">Audi</MenuItem>
                            <MenuItem value="bmw">BMW</MenuItem>
                            <MenuItem value="mercedes">Mercedes</MenuItem>
                            <MenuItem value="other">Other (enter below)</MenuItem>
                        </TextField>
                        {this.state.carBrand === 'other' && (
                            <TextField
                                label="Other Car Brand"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                                name="customCarBrand"
                                value={this.state.customCarBrand}
                                onChange={this.handleChange}
                            />
                        )}
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="Car Model"
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="carModel"
                            value={this.state.carModel}
                            onChange={this.handleChange}
                            style={{ marginRight: '10px' }}
                        >
                            <MenuItem value="">Select model</MenuItem>
                            <MenuItem value="other">Other (enter below)</MenuItem>
                        </TextField>
                        {this.state.carModel === 'other' && (
                            <TextField
                                label="Other Car Model"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                                name="customCarModel"
                                value={this.state.customCarModel}
                                onChange={this.handleChange}
                            />
                        )}
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            label="Dashcam"
                            select
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                            name="dashcam"
                            value={this.state.dashcam}
                            onChange={this.handleChange}
                            style={{ marginRight: '10px' }}
                        >
                            <MenuItem value="">Select dashcam</MenuItem>
                            <MenuItem value="garmin">Garmin</MenuItem>
                            <MenuItem value="nextbase">Nextbase</MenuItem>
                            <MenuItem value="viofo">Viofo</MenuItem>
                            <MenuItem value="other">Other (enter below)</MenuItem>
                        </TextField>
                        {this.state.dashcam === 'other' && (
                            <TextField
                                label="Other Dashcam"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ style: { color: '#fff' } }}
                                InputProps={{ style: { color: '#fff', borderColor: '#000' } }}
                                name="customDashcam"
                                value={this.state.customDashcam}
                                onChange={this.handleChange}
                            />
                        )}
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: '#ff5252' }}>Register</Button>
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

export default RegistrationStep2;
