import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import RegistrationStep1 from './RegistrationStep1';
import RegistrationStep2 from './RegistrationStep2';

interface RegistrationScreenState {
    step: number;
    formData: any;
}

class RegistrationScreen extends React.Component<{}, RegistrationScreenState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            step: 1,
            formData: {},
        };
    }

    handleNext = (data: any) => {
        this.setState({ formData: data, step: 2 });
    };

    handleSubmit = (data: any) => {
        console.log('Final Registration Data:', data);
        this.setState({ step: 1, formData: {} });
    };

    render() {
        const { step, formData } = this.state;
        return (
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh" bgcolor="#011226" color="#fff">
                {step === 1 && <RegistrationStep1 onNext={this.handleNext} />}
                {step === 2 && <RegistrationStep2 onSubmit={this.handleSubmit} previousData={formData} />}
            </Box>
        );
    }
}

export default RegistrationScreen;
