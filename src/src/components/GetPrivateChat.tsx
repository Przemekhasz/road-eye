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
// @ts-ignore
import { format } from 'date-fns';

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
}

interface PrivateChatProps {
    chatId: number;
    chatName: string;
    onBack: () => void;
}

interface PrivateChatState {
    messages: Message[];
    newMessage: string;
    selectedFile: File | null;
    replyToMessageId: string | null;
    isRecording: boolean;
    mediaRecorder: MediaRecorder | null;
    audioChunks: Blob[];
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
    width: '30%',
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
    accentColor: '#ff5252 #0000ff', // Red and blue accent
});

const StyledGif = styled('img')({
    maxWidth: '100%',
    borderRadius: '8px',
    marginTop: '10px',
});

class PrivateChat extends Component<PrivateChatProps, PrivateChatState> {
    constructor(props: PrivateChatProps) {
        super(props);
        this.state = {
            messages: [
                {
                    id: uuidv4(),
                    text: "Sukces",
                    sender: {
                        name: "Krzysztof Kononowicz",
                        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Krzysztof_Kononowicz_w_2000.jpg/189px-Krzysztof_Kononowicz_w_2000.jpg"
                    },
                    timestamp: format(new Date(), 'PPpp'),
                    likes: 0,
                },
                {
                    id: uuidv4(),
                    text: "zesrac sie w gacie",
                    sender: {
                        name: "Major",
                        avatar: "https://i1.sndcdn.com/avatars-xngZB5yZzCiDRCSL-u5YmVg-t240x240.jpg"
                    },
                    timestamp: format(new Date(), 'PPpp'),
                    likes: 0,
                }
            ],
            newMessage: '',
            selectedFile: null,
            replyToMessageId: null,
            isRecording: false,
            mediaRecorder: null,
            audioChunks: [],
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

    render() {
        const { chatName, onBack } = this.props;
        const { messages, newMessage, replyToMessageId, isRecording } = this.state;

        return (
            <Container maxWidth={false} sx={{ bgcolor: '#333', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', p: 2 }}>
                <Button variant="contained" sx={{ bgcolor: '#ff5252', color: '#fff', mb: 2 }} onClick={onBack}>
                    Back
                </Button>
                <Typography variant="h4" gutterBottom>
                    {chatName}
                </Typography>
                <List sx={{ bgcolor: '#444', mb: 2, borderRadius: 1, p: 2, flexGrow: 1, overflowY: 'scroll' }}>
                    {messages.map((message) => (
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
                            {message.replyTo && (
                                <Typography variant="caption" sx={{ color: '#ccc', display: 'block' }}>
                                    Replying to: {messages.find((msg) => msg.id === message.replyTo)?.text || 'Unknown message'}
                                </Typography>
                            )}
                            <IconButton onClick={() => this.handleReply(message.id)}>
                                <DirectionsCarIcon sx={{ color: '#ff5252' }} />
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
            </Container>
        );
    }
}

export default PrivateChat;
