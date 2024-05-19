import React, { Component } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Avatar, SelectChangeEvent
} from '@mui/material';
import GetGroupChat from "./GetGroupChat";
import GetPrivateChat from "./GetPrivateChat";
import {DrawerBox} from "./DrawerBox";

interface ChatGroup {
    id: number;
    name: string;
    image: string;
    members: number;
    activity: 'Dead' | 'Active' | 'Hyperactive';
    isPublic: boolean;
}

interface PrivateChat {
    id: number;
    name: string;
    image: string;
}

interface ChatAppState {
    tabValue: number;
    groupChats: ChatGroup[];
    privateChats: PrivateChat[];
    dialogOpen: boolean;
    newGroupName: string;
    newGroupImage: string;
    newGroupMembers: number;
    newGroupActivity: 'Dead' | 'Active' | 'Hyperactive';
    newGroupIsPublic: string;
    currentGroupId: number | null;
    currentPrivateChatId: number | null;
}

class ChatApp extends Component<{}, ChatAppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tabValue: 0,
            groupChats: [
                { id: 1, name: 'Public Group', image: '', members: 10, activity: 'Active', isPublic: true },
                { id: 2, name: 'Private Group', image: '', members: 5, activity: 'Dead', isPublic: false },
            ],
            privateChats: [
                { id: 1, name: 'Krzysztof Kononowicz', image: '' },
                { id: 2, name: 'Jane Smith', image: '' },
            ],
            dialogOpen: false,
            newGroupName: '',
            newGroupImage: '',
            newGroupMembers: 0,
            newGroupActivity: 'Active',
            newGroupIsPublic: 'true',
            currentGroupId: null,
            currentPrivateChatId: null,
        };
    }

    handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ tabValue: newValue });
    };

    handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };

    handleDialogClose = () => {
        this.setState({
            dialogOpen: false,
            newGroupName: '',
            newGroupImage: '',
            newGroupMembers: 0,
            newGroupActivity: 'Active',
            newGroupIsPublic: 'true',
        });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as unknown as Pick<ChatAppState, keyof ChatAppState>);
    };

    handleSelectChange = (event: SelectChangeEvent<"Dead" | "Active" | "Hyperactive">) => {
        this.setState({ newGroupActivity: event.target.value as 'Dead' | 'Active' | 'Hyperactive' });
    };

    handleCreateGroup = () => {
        const { newGroupName, newGroupImage, newGroupMembers, newGroupActivity, newGroupIsPublic, groupChats } = this.state;
        const newGroup: ChatGroup = {
            id: groupChats.length + 1,
            name: newGroupName,
            image: newGroupImage,
            members: newGroupMembers,
            activity: newGroupActivity,
            isPublic: newGroupIsPublic === 'true',
        };
        this.setState({ groupChats: [...groupChats, newGroup] });
        this.handleDialogClose();
    };

    enterGroupChat = (groupId: number) => {
        this.setState({ currentGroupId: groupId });
    };

    enterPrivateChat = (chatId: number) => {
        this.setState({ currentPrivateChatId: chatId });
    };

    handleBack = () => {
        this.setState({ currentGroupId: null, currentPrivateChatId: null });
    };

    render() {
        const { tabValue, groupChats, privateChats, dialogOpen, newGroupName, newGroupImage, newGroupMembers, newGroupActivity, newGroupIsPublic, currentGroupId, currentPrivateChatId } = this.state;

        const currentGroup = groupChats.find(group => group.id === currentGroupId);
        const currentPrivateChat = privateChats.find(chat => chat.id === currentPrivateChatId);

        if (currentGroup) {
            return <GetGroupChat
                groupId={currentGroup.id}
                groupName={currentGroup.name}
                onBack={this.handleBack}
                activeMembers={13}
                members={19}
            />;
        }

        if (currentPrivateChat) {
            return <GetPrivateChat chatId={currentPrivateChat.id} chatName={currentPrivateChat.name} onBack={this.handleBack} />;
        }

        return (
           <>
            <DrawerBox />
               <Container maxWidth="lg" sx={{ bgcolor: '#333', color: '#fff', borderRadius: 2, mt: 4, p: 2}} >
                   <Typography variant="h4" color="#ff5252" gutterBottom>
                       Rotuj z innymi marszałkami
                   </Typography>
                   <Tabs value={tabValue} onChange={this.handleTabChange} textColor="inherit" indicatorColor="primary" centered>
                       <Tab label="Group Chats" />
                       <Tab label="Private Chats" />
                   </Tabs>
                   {tabValue === 0 && (
                       <Box>
                           <Button
                               variant="contained"
                               sx={{ bgcolor: '#ff5252', color: '#fff', my: 2 }}
                               onClick={this.handleDialogOpen}
                           >
                               Create Group
                           </Button>
                           <List>
                               {groupChats.map((group) => (
                                   <ListItem key={group.id} sx={{ bgcolor: '#444', mb: 1, borderRadius: 1 }} button onClick={() => this.enterGroupChat(group.id)}>
                                       <Avatar src={group.image} sx={{ bgcolor: '#ff5252', mr: 2 }} />
                                       <ListItemText
                                           primary={group.name}
                                           secondary={`Members: ${group.members} - Activity: ${group.activity}`}
                                           primaryTypographyProps={{ style: { color: '#fff' } }}
                                           secondaryTypographyProps={{ style: { color: '#ccc' } }}
                                       />
                                   </ListItem>
                               ))}
                           </List>
                       </Box>
                   )}
                   {tabValue === 1 && (
                       <Box>
                           <List>
                               {privateChats.map((chat) => (
                                   <ListItem key={chat.id} sx={{ bgcolor: '#444', mb: 1, borderRadius: 1 }} button onClick={() => this.enterPrivateChat(chat.id)}>
                                       <Avatar src={chat.image} sx={{ bgcolor: '#ff5252', mr: 2 }} />
                                       <ListItemText
                                           primary={chat.name}
                                           primaryTypographyProps={{ style: { color: '#fff' } }}
                                           secondaryTypographyProps={{ style: { color: '#ccc' } }}
                                       />
                                   </ListItem>
                               ))}
                           </List>
                       </Box>
                   )}
                   <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
                       <DialogTitle sx={{ bgcolor: '#333', color: '#ff5252' }}>Create Group</DialogTitle>
                       <DialogContent sx={{ bgcolor: '#333', color: '#fff' }}>
                           <TextField
                               autoFocus
                               margin="dense"
                               label="Group Name"
                               name="newGroupName"
                               value={newGroupName}
                               onChange={this.handleInputChange}
                               fullWidth
                               InputLabelProps={{ style: { color: '#fff' } }}
                               InputProps={{ style: { color: '#fff' } }}
                               sx={{ mb: 2 }}
                           />
                           <TextField
                               margin="dense"
                               label="Group Image URL"
                               name="newGroupImage"
                               value={newGroupImage}
                               onChange={this.handleInputChange}
                               fullWidth
                               InputLabelProps={{ style: { color: '#fff' } }}
                               InputProps={{ style: { color: '#fff' } }}
                               sx={{ mb: 2 }}
                           />
                           <TextField
                               margin="dense"
                               label="Number of Members"
                               name="newGroupMembers"
                               type="number"
                               value={newGroupMembers}
                               onChange={this.handleInputChange}
                               fullWidth
                               InputLabelProps={{ style: { color: '#fff' } }}
                               InputProps={{ style: { color: '#fff' } }}
                               sx={{ mb: 2 }}
                           />
                           <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                               <InputLabel style={{ color: '#fff' }}>Activity</InputLabel>
                               <Select
                                   value={newGroupActivity}
                                   onChange={this.handleSelectChange}
                                   style={{ color: '#fff' }}
                                   inputProps={{ style: { color: '#fff' } }}
                               >
                                   <MenuItem value="Dead">Dead</MenuItem>
                                   <MenuItem value="Active">Active</MenuItem>
                                   <MenuItem value="Hyperactive">Hyperactive</MenuItem>
                               </Select>
                           </FormControl>
                           <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
                               <InputLabel style={{ color: '#fff' }}>Visibility</InputLabel>
                               <Select
                                   value={newGroupIsPublic}
                                   onChange={(e) => this.setState({ newGroupIsPublic: e.target.value as string })}
                                   style={{ color: '#fff' }}
                                   inputProps={{ style: { color: '#fff' } }}
                               >
                                   <MenuItem value="true">Public</MenuItem>
                                   <MenuItem value="false">Private</MenuItem>
                               </Select>
                           </FormControl>
                       </DialogContent>
                       <DialogActions sx={{ bgcolor: '#333' }}>
                           <Button onClick={this.handleDialogClose} sx={{ color: '#ff5252' }}>
                               Cancel
                           </Button>
                           <Button onClick={this.handleCreateGroup} sx={{ color: '#ff5252' }}>
                               Create
                           </Button>
                       </DialogActions>
                   </Dialog>
               </Container>
           </>
        );
    }
}

export default ChatApp;
