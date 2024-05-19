import React, { Component } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    IconButton,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    Toolbar
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SendIcon from '@mui/icons-material/Send';
import PhotoIcon from '@mui/icons-material/Photo';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import GifIcon from '@mui/icons-material/Gif';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import SearchIcon from '@mui/icons-material/Search';
import ForwardIcon from '@mui/icons-material/Forward';
import PushPinIcon from '@mui/icons-material/PushPin';
import { format } from 'date-fns';
import {DrawerBox} from "./DrawerBox";

interface Message {
    id: string;
    text?: string;
    imageUrl?: string;
    audioUrl?: string;
    videoUrl?: string;
    gifUrl?: string;
    sender: {
        name: string;
        avatar: string;
    };
    timestamp: string;
    likes: number;
    replyTo?: string;
    isPinned?: boolean;
    keywords?: string[];
}

interface GroupChatProps {
    groupId: number;
    groupName: string;
    members: number;
    activeMembers: number;
    onBack: () => void;
}

interface GroupChatState {
    messages: Message[];
    newMessage: string;
    selectedFile: File | null;
    replyToMessageId: string | null;
    isRecording: boolean;
    mediaRecorder: MediaRecorder | null;
    audioChunks: Blob[];
    searchQuery: string;
    showMediaDialog: boolean;
    showPinnedDialog: boolean;
    pinnedMessages: Message[];
    pinKeyword: string;
    pinnedSearchQuery: string;
}

const UploadButton = styled('input')({
    display: 'none',
});

const StyledImage = styled('img')({
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
});

const StyledAudio = styled('audio')({
    marginTop: '10px',
    width: '100%',
    accentColor: '#ff5252',
    '&::-webkit-media-controls-panel': {
        backgroundColor: '#FF6F6F',
    },
    '&::-webkit-media-controls-volume-slider': {
        backgroundColor: '#FFC1C1',
        borderRadius: '25px',
        paddingLeft: '8px',
        paddingRight: '8px',
    },
});

const StyledVideo = styled('video')({
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
    accentColor: '#ff5252',
});

const StyledGif = styled('img')({
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
});

const StyledDialogTitle = styled(DialogTitle)({
    backgroundColor: '#ff5252',
    color: '#fff',
});

const StyledDialogContent = styled(DialogContent)({
    backgroundColor: '#444',
    color: '#fff',
});

const StyledDialogActions = styled(DialogActions)({
    backgroundColor: '#444',
});

const StyledButton = styled(Button)({
    backgroundColor: '#ff5252',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#ff7b7b',
    },
});

class GroupChat extends Component<GroupChatProps, GroupChatState> {
    constructor(props: GroupChatProps) {
        super(props);
        this.state = {
            messages: [],
            newMessage: '',
            selectedFile: null,
            replyToMessageId: null,
            isRecording: false,
            mediaRecorder: null,
            audioChunks: [],
            searchQuery: '',
            showMediaDialog: false,
            showPinnedDialog: false,
            pinnedMessages: [],
            pinKeyword: '',
            pinnedSearchQuery: '',
        };
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newMessage: event.target.value });
    };

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({ selectedFile: event.target.files[0] }, this.handleSendMessage);
        }
    };

    handleSendMessage = () => {
        const { newMessage, selectedFile, replyToMessageId, audioChunks } = this.state;

        let newMessageObject: Message = {
            id: uuidv4(),
            sender: {
                name: "Krzysztof Kononowicz",
                avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Krzysztof_Kononowicz_w_2000.jpg/189px-Krzysztof_Kononowicz_w_2000.jpg"
            },
            timestamp: format(new Date(), 'PPpp'),
            likes: 0,
            replyTo: replyToMessageId || undefined,
        };

        if (newMessage) {
            newMessageObject.text = newMessage;
        }

        if (selectedFile) {
            const fileUrl = URL.createObjectURL(selectedFile);
            if (selectedFile.type.startsWith('image/')) {
                if (selectedFile.name.endsWith('.gif')) {
                    newMessageObject.gifUrl = fileUrl;
                } else {
                    newMessageObject.imageUrl = fileUrl;
                }
            } else if (selectedFile.type.startsWith('audio/')) {
                newMessageObject.audioUrl = fileUrl;
            } else if (selectedFile.type.startsWith('video/')) {
                newMessageObject.videoUrl = fileUrl;
            }
        } else if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            newMessageObject.audioUrl = audioUrl;
        }

        this.setState((prevState) => ({
            messages: [...prevState.messages, newMessageObject],
            newMessage: '',
            selectedFile: null,
            replyToMessageId: null,
            audioChunks: [],
        }));
    };

    handleReply = (messageId: string) => {
        this.setState({ replyToMessageId: messageId });
    };

    handleLike = (messageId: string) => {
        this.setState((prevState) => ({
            messages: prevState.messages.map((message) =>
                message.id === messageId ? { ...message, likes: message.likes + 1 } : message
            ),
        }));
    };

    handleRecord = () => {
        const { isRecording, mediaRecorder } = this.state;
        if (!isRecording) {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.ondataavailable = (event) => {
                        this.setState(prevState => ({
                            audioChunks: [...prevState.audioChunks, event.data]
                        }));
                    };
                    mediaRecorder.start();
                    this.setState({ mediaRecorder, isRecording: true });
                })
                .catch(error => {
                    console.error('Error accessing microphone:', error);
                });
        } else {
            if (mediaRecorder) {
                mediaRecorder.stop();
                this.setState({ isRecording: false });
            }
        }
    };

    handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchQuery: event.target.value });
    };

    handlePinnedSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ pinnedSearchQuery: event.target.value });
    };

    toggleMediaDialog = () => {
        this.setState((prevState) => ({
            showMediaDialog: !prevState.showMediaDialog
        }));
    };

    togglePinnedDialog = () => {
        this.setState((prevState) => ({
            showPinnedDialog: !prevState.showPinnedDialog
        }));
    };

    handleForwardMessage = (messageId: string) => {
        // Implement message forwarding logic here
        alert(`Forward message ID: ${messageId}`);
    };

    handlePinMessage = (messageId: string) => {
        const keyword = prompt("Enter keywords for this pinned message:");
        if (keyword) {
            this.setState((prevState) => {
                const isPinned = !prevState.messages.find(msg => msg.id === messageId)?.isPinned;
                const updatedMessages = prevState.messages.map((message) =>
                    message.id === messageId ? { ...message, isPinned, keywords: isPinned ? keyword.split(',').map(k => k.trim()) : [] } : message
                );
                return {
                    messages: updatedMessages,
                    pinnedMessages: isPinned
                        ? [...prevState.pinnedMessages, updatedMessages.find(msg => msg.id === messageId)!]
                        : prevState.pinnedMessages.filter(msg => msg.id !== messageId)
                };
            });
        }
    };

    render() {
        const { groupName, onBack, members, activeMembers } = this.props;
        const { messages, newMessage, replyToMessageId, isRecording, searchQuery, showMediaDialog, showPinnedDialog, pinnedMessages, pinnedSearchQuery } = this.state;

        const filteredMessages = messages.filter(message =>
            message.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            message.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filteredPinnedMessages = pinnedMessages.filter(message =>
            message.keywords?.some(keyword => keyword.toLowerCase().includes(pinnedSearchQuery.toLowerCase()))
        );

        return (
            <>
                <DrawerBox/>
                <Container maxWidth={'lg'} sx={{ bgcolor: '#333', color: '#fff', height: '85vh', display: 'flex', flexDirection: 'column', p: 2 }}>
                    <Button variant="contained" sx={{ bgcolor: '#ff5252', color: '#fff', mb: 2 }} onClick={onBack}>
                        Back
                    </Button>
                    <Typography variant="h4" gutterBottom>
                        {groupName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Members: {members}, Active: {activeMembers}
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            style: { color: '#fff' },
                        }}
                        InputLabelProps={{ style: { color: '#fff' } }}
                    />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Button variant="contained" sx={{ bgcolor: '#ff5252', color: '#fff' }} onClick={this.togglePinnedDialog}>
                            Pinned Messages
                        </Button>
                        <Button variant="contained" sx={{ bgcolor: '#ff5252', color: '#fff' }} onClick={this.toggleMediaDialog}>
                            Browse Media
                        </Button>
                    </Box>
                    <List sx={{ bgcolor: '#444', mb: 2, borderRadius: 1, p: 2, flexGrow: 1, overflowY: 'scroll' }}>
                        {filteredMessages.map((message) => (
                            <ListItem key={message.id} onDoubleClick={() => this.handleLike(message.id)} sx={{ display: 'block' }}>
                                <ListItemAvatar>
                                    <Avatar src={message.sender.avatar} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${message.sender.name} - ${message.timestamp}`}
                                    secondary={
                                        <>
                                            <Typography component="header" style={{ color: '#fff', marginTop: '10px' }}>
                                                <b>{message.text}</b>
                                            </Typography>
                                            {message.imageUrl && <StyledImage src={message.imageUrl} alt="sent image" />}
                                            {message.gifUrl && <StyledGif src={message.gifUrl} alt="sent gif" />}
                                            {message.audioUrl && <StyledAudio controls src={message.audioUrl} />}
                                            {message.videoUrl && <StyledVideo controls src={message.videoUrl} />}
                                        </>
                                    }
                                    primaryTypographyProps={{ style: { color: '#fff' } }}
                                    secondaryTypographyProps={{ style: { color: '#fff' } }}
                                />
                                <IconButton onClick={() => this.handleReply(message.id)}>
                                    <DirectionsCarIcon sx={{ color: '#ff5252' }} />
                                </IconButton>
                                <IconButton onClick={() => this.handleForwardMessage(message.id)}>
                                    <ForwardIcon sx={{ color: '#ff5252' }} />
                                </IconButton>
                                <IconButton onClick={() => this.handlePinMessage(message.id)}>
                                    <PushPinIcon sx={{ color: '#ff5252' }} />
                                </IconButton>
                                {message.likes > 0 && (
                                    <Typography variant="caption" sx={{ color: '#ff5252', marginLeft: '5px' }}>
                                        {message.likes} like{message.likes > 1 ? 's' : ''}
                                    </Typography>
                                )}
                            </ListItem>
                        ))}
                    </List>
                    <Box display="flex" alignItems="center">
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Type a message"
                            value={newMessage}
                            onChange={this.handleInputChange}
                            InputLabelProps={{ style: { color: '#fff' } }}
                            InputProps={{ style: { color: '#fff' } }}
                        />
                        <IconButton
                            sx={{ bgcolor: '#ff5252', color: '#fff', ml: 2 }}
                            onClick={this.handleSendMessage}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <label>
                            <UploadButton type="file" accept="image/*" onChange={this.handleFileChange} />
                            <IconButton component="span" sx={{ color: '#fff' }}>
                                <PhotoIcon />
                            </IconButton>
                        </label>
                        <label>
                            <UploadButton type="file" accept="audio/*" onChange={this.handleFileChange} />
                            <IconButton component="span" sx={{ color: '#fff' }}>
                                <AudiotrackIcon />
                            </IconButton>
                        </label>
                        <label>
                            <UploadButton type="file" accept="video/*" onChange={this.handleFileChange} />
                            <IconButton component="span" sx={{ color: '#fff' }}>
                                <VideocamIcon />
                            </IconButton>
                        </label>
                        <label>
                            <UploadButton type="file" accept="image/gif" onChange={this.handleFileChange} />
                            <IconButton component="span" sx={{ color: '#fff' }}>
                                <GifIcon />
                            </IconButton>
                        </label>
                        <IconButton
                            onClick={this.handleRecord}
                            sx={{ bgcolor: isRecording ? '#ff5252' : '#fff', color: isRecording ? '#fff' : '#000' }}
                        >
                            {isRecording ? <StopIcon /> : <MicIcon />}
                        </IconButton>
                    </Box>
                    <Dialog open={showMediaDialog} onClose={this.toggleMediaDialog}>
                        <StyledDialogTitle>Media Browser</StyledDialogTitle>
                        <StyledDialogContent>
                            {messages.map((message) => (
                                <Box key={message.id} mb={2}>
                                    {message.imageUrl && <StyledImage src={message.imageUrl} alt="sent image" />}
                                    {message.gifUrl && <StyledGif src={message.gifUrl} alt="sent gif" />}
                                    {message.audioUrl && <StyledAudio controls src={message.audioUrl} />}
                                    {message.videoUrl && <StyledVideo controls src={message.videoUrl} />}
                                </Box>
                            ))}
                        </StyledDialogContent>
                        <StyledDialogActions>
                            <StyledButton onClick={this.toggleMediaDialog}>Close</StyledButton>
                        </StyledDialogActions>
                    </Dialog>
                    <Dialog open={showPinnedDialog} onClose={this.togglePinnedDialog}>
                        <StyledDialogTitle>Pinned Messages</StyledDialogTitle>
                        <StyledDialogContent>
                            <TextField
                                fullWidth
                                margin="normal"
                                placeholder="Search pinned messages by keywords..."
                                value={pinnedSearchQuery}
                                onChange={this.handlePinnedSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    style: { color: '#fff' },
                                }}
                                InputLabelProps={{ style: { color: '#fff' } }}
                            />
                            {filteredPinnedMessages.map((message) => (
                                <ListItem key={message.id} sx={{ display: 'block' }}>
                                    <ListItemAvatar>
                                        <Avatar src={message.sender.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${message.sender.name} - ${message.timestamp}`}
                                        secondary={
                                            <>
                                                <Typography component="header" style={{ color: '#fff', marginTop: '10px' }}>
                                                    <b>{message.text}</b>
                                                </Typography>
                                                {message.imageUrl && <StyledImage src={message.imageUrl} alt="sent image" />}
                                                {message.gifUrl && <StyledGif src={message.gifUrl} alt="sent gif" />}
                                                {message.audioUrl && <StyledAudio controls src={message.audioUrl} />}
                                                {message.videoUrl && <StyledVideo controls src={message.videoUrl} />}
                                            </>
                                        }
                                        primaryTypographyProps={{ style: { color: '#fff' } }}
                                        secondaryTypographyProps={{ style: { color: '#fff' } }}
                                    />
                                    <IconButton onClick={() => this.handlePinMessage(message.id)}>
                                        <PushPinIcon sx={{ color: '#ff5252' }} />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </StyledDialogContent>
                        <StyledDialogActions>
                            <StyledButton onClick={this.togglePinnedDialog}>Close</StyledButton>
                        </StyledDialogActions>
                    </Dialog>
                </Container>
            </>
        );
    }
}

export default GroupChat;
