import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import {DrawerBox} from "./DrawerBox";

const Dashboard: React.FC = () => {
    return (
        <Box bgcolor="#222" color="#fff">
            <DrawerBox />

            <Box p={2} ml={37} mr={2} mt={5} sx={{
                bgcolor: "#222",
                color: "#fff",
                borderRadius: 8,
            }}>
                <Typography variant="h4" gutterBottom sx={{ color: '#ff5252' }}>Dashboard</Typography>
            </Box>
        </Box>
    );
};

export default Dashboard;
