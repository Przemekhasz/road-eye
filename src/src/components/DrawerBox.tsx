import React from "react";
import {
    AppBar, Box,
    Divider, Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {
    Comment,
    Dashboard as DashboardIcon, Equalizer, Group, History,
    ListAlt as ListAltIcon,
    Menu as MenuIcon, Notifications,
    Settings, SettingsApplications,
    Share
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export class DrawerBox extends React.Component {
    render() {
        return(
            <>
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
                    <List sx={{ backgroundColor: "#222", color: "#fff" }}>
                        <ListItem>
                            <ListItemText primary="RoadEye" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/video-eksploer" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemIcon><ListAltIcon /></ListItemIcon>
                            <ListItemText primary="Eksplorator nagrań" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/profile" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemIcon><Settings /></ListItemIcon>
                            <ListItemText primary="Ustawienia profilu" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon><Share /></ListItemIcon>
                            <ListItemText primary="Udostępnianie" />
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="/notifications" sx={{ textDecoration: 'none', color: 'inherit' }}>
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
                        <ListItem button component={Link} to="/chats" sx={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItemIcon><Group /></ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemIcon><SettingsApplications /></ListItemIcon>
                            <ListItemText primary="Zaawansowane ustawienia" />
                        </ListItem>
                    </List>
                </Drawer>
            </>
        );
    }
}
