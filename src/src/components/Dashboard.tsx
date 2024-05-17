import React from 'react';
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import {
    Menu as MenuIcon,
    ListAlt as ListAltIcon,
    Dashboard as DashboardIcon,
    Settings, Share, Notifications, History, Equalizer, Comment, Group, SettingsApplications
} from '@mui/icons-material';
import {Link} from "react-router-dom";

const Dashboard: React.FC = () => {
    return (
        <Box bgcolor="#222" color="#fff">
            <AppBar position="static" sx={{ bgcolor: '#222', marginLeft: '290px' }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Witaj,
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" anchor="left" sx={{
                backgroundColor: "#222",
                color: "#fff",
                '& .MuiListItemIcon-root': {
                    color: '#ff5252',
                },
            }}>
                <List sx={{
                    backgroundColor: "#222",
                    color: "#fff"
                }}>
                    <ListItem button>
                        <ListItemText primary="RoadEye" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <Divider />
                    <Link to={'/video-eksploer'}>
                        <ListItem button>
                            <ListItemIcon><ListAltIcon /></ListItemIcon>
                            <ListItemText primary="Eksplorator nagran" />
                        </ListItem>
                    </Link>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Settings /></ListItemIcon>
                        <ListItemText primary="Ustawienia profilu" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Share /></ListItemIcon>
                        <ListItemText primary="Udostępnianie" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Notifications /></ListItemIcon>
                        <ListItemText primary="Powiadomienia" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><History /></ListItemIcon>
                        <ListItemText primary="Historia" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Equalizer /></ListItemIcon>
                        <ListItemText primary="Statystyki" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Comment /></ListItemIcon>
                        <ListItemText primary="Komentarze" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><Group /></ListItemIcon>
                        <ListItemText primary="Grupy" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemIcon><SettingsApplications /></ListItemIcon>
                        <ListItemText primary="Zaawansowane ustawienia" />
                    </ListItem>
                </List>
            </Drawer>

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
