import React, { Component } from 'react';
import {
    Box,
    Container,
    TextField,
    List,
    ListItem,
    ListItemText,
    Typography,
    InputAdornment,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel, SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {DrawerBox} from "./DrawerBox";

interface Notification {
    id: number;
    title: string;
    date: string;
    category: string;
}

interface NotificationListState {
    notifications: Notification[];
    searchQuery: string;
    filterCategory: string;
}

class NotificationList extends Component<{}, NotificationListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            notifications: [
                { id: 1, title: 'System Update', date: '2024-05-15', category: 'System' },
                { id: 2, title: 'New Message', date: '2024-05-14', category: 'Messages' },
                { id: 3, title: 'Meeting Reminder', date: '2024-05-13', category: 'Reminders' },
                { id: 4, title: 'System Maintenance', date: '2024-05-12', category: 'System' },
                { id: 5, title: 'New Comment', date: '2024-05-11', category: 'Messages' },
            ],
            searchQuery: '',
            filterCategory: '',
        };
    }

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchQuery: event.target.value });
    };

    handleCategoryChange = (event: SelectChangeEvent<string>) => {
        this.setState({ filterCategory: event.target.value as string });
    };

    getFilteredNotifications = () => {
        const { notifications, searchQuery, filterCategory } = this.state;
        return notifications.filter(notification => {
            const matchesSearchQuery = notification.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = filterCategory ? notification.category === filterCategory : true;
            return matchesSearchQuery && matchesCategory;
        });
    };

    render() {
        const { searchQuery, filterCategory } = this.state;
        const filteredNotifications = this.getFilteredNotifications();

        return (
            <>
                <DrawerBox />
                <Container maxWidth="lg">
                    <Box sx={{ mt: 4, p: 2, bgcolor: '#333', color: '#fff', borderRadius: 2 }}>
                        <Typography variant="h4" component="h1" color="#ff5252" gutterBottom>
                            Notifications
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Search"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton>
                                            <SearchIcon style={{ color: '#ff5252' }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                style: { color: '#fff' },
                            }}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                            <InputLabel style={{ color: '#fff' }}>Category</InputLabel>
                            <Select
                                value={filterCategory}
                                onChange={this.handleCategoryChange}
                                style={{ color: '#fff' }}
                                inputProps={{ style: { color: '#fff' } }}
                            >
                                <MenuItem value="">
                                    <em>All</em>
                                </MenuItem>
                                <MenuItem value="System">System</MenuItem>
                                <MenuItem value="Messages">Messages</MenuItem>
                                <MenuItem value="Reminders">Reminders</MenuItem>
                            </Select>
                        </FormControl>
                        <List>
                            {filteredNotifications.map(notification => (
                                <ListItem key={notification.id} sx={{ bgcolor: '#444', mb: 1, borderRadius: 1 }}>
                                    <ListItemText
                                        primary={notification.title}
                                        secondary={`${notification.date} - ${notification.category}`}
                                        primaryTypographyProps={{ style: { color: '#fff' } }}
                                        secondaryTypographyProps={{ style: { color: '#ccc' } }}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Container>
            </>
        );
    }
}

export default NotificationList;
