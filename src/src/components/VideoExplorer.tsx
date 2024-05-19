import React, { Component } from 'react';
import {
    Box, List, ListItem, ListItemText, ListItemIcon, Typography, IconButton, Button, Slider, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ScissorsIcon from '@mui/icons-material/ContentCut';
import { Link } from 'react-router-dom';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { FileData } from '@ffmpeg/ffmpeg/dist/esm/types';
import CommentsSection from './CommentsSection';
import { DrawerBox } from './DrawerBox';

interface Video {
    title: string;
    url: string;
    date: string;
    author: string;
    likes: number;
    comments: string[];
}

interface VideoExplorerState {
    videos: Video[];
    currentVideo: Video | null;
    playing: boolean;
    currentTime: number;
    duration: number;
    newComment: string;
    startTime: number;
    endTime: number;
    processing: boolean;
    trimming: boolean;
    dialogOpen: boolean;
    fileName: string;
    trimmedUrl: string | null;
}

class VideoExplorer extends Component<{}, VideoExplorerState> {
    private readonly videoRef: React.RefObject<HTMLVideoElement>;
    private ffmpeg: FFmpeg;

    constructor(props: {}) {
        super(props);
        this.state = {
            videos: [],
            currentVideo: null,
            playing: false,
            currentTime: 0,
            duration: 0,
            newComment: '',
            startTime: 0,
            endTime: 0,
            processing: false,
            trimming: false,
            dialogOpen: false,
            fileName: '',
            trimmedUrl: null,
        };
        this.videoRef = React.createRef();
        this.ffmpeg = new FFmpeg();

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.handleTrimVideo = this.handleTrimVideo.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogSave = this.handleDialogSave.bind(this);
        this.toggleTrimmingMode = this.toggleTrimmingMode.bind(this);
    }

    private handleFileUpload(event: React.ChangeEvent<HTMLInputElement>): void {
        const files: FileList | null = event.target.files;
        if (files) {
            const newVideos: Video[] = [];
            Array.from(files).forEach((file: File): void => {
                const url: string = URL.createObjectURL(file);
                const date: string = new Date().toLocaleDateString();
                newVideos.push({ title: file.name, url, date, author: 'Przemysław', likes: 10, comments: [] });
            });
            this.setState((prevState) => ({
                videos: [...prevState.videos, ...newVideos],
            }));
        }
    }

    private handlePlay(video: Video): void {
        this.setState({ currentVideo: video, playing: true }, (): void => {
            if (this.videoRef.current) {
                this.videoRef.current.play();
            }
        });
    }

    private handlePause(): void {
        this.setState({ playing: false }, (): void => {
            if (this.videoRef.current) {
                this.videoRef.current.pause();
            }
        });
    }

    private handleStop(): void {
        this.setState({ currentVideo: null, playing: false, trimming: false }, () => {
            if (this.videoRef.current) {
                this.videoRef.current.pause();
                this.videoRef.current.currentTime = 0;
            }
        });
    }

    private handleTimeUpdate(): void {
        if (this.videoRef.current) {
            this.setState({
                currentTime: this.videoRef.current.currentTime,
                duration: this.videoRef.current.duration,
            });
        }
    }

    private handleSliderChange(event: Event, value: number | number[]): void {
        const newTime: number = value as number;
        if (this.videoRef.current) {
            this.videoRef.current.currentTime = newTime;
            this.setState({ currentTime: newTime });
        }
    }

    private handleLike(): void {
        if (this.state.currentVideo) {
            this.setState((prevState) => ({
                currentVideo: { ...prevState.currentVideo!, likes: prevState.currentVideo!.likes + 1 },
            }));
        }
    }

    private handleCommentChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ newComment: event.target.value });
    }

    private handleAddComment(): void {
        if (this.state.currentVideo && this.state.newComment.trim()) {
            this.setState((prevState) => ({
                currentVideo: {
                    ...prevState.currentVideo!,
                    comments: [...prevState.currentVideo!.comments, prevState.newComment.trim()],
                },
                newComment: '',
            }));
        }
    }

    private handleStartTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ startTime: Number(event.target.value) });
    }

    private handleEndTimeChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({ endTime: Number(event.target.value) });
    }

    private async handleTrimVideo(): Promise<void> {
        const { currentVideo, startTime, endTime } = this.state;
        if (currentVideo && startTime < endTime && endTime <= this.state.duration) {
            this.setState({ processing: true });
            await this.ffmpeg.load();

            await this.ffmpeg.writeFile('input.mp4', await fetchFile(currentVideo.url));
            await this.ffmpeg.exec(['-i', 'input.mp4', '-ss', `${startTime}`, '-to', `${endTime}`, '-c', 'copy', 'output.mov']);

            const data: FileData = await this.ffmpeg.readFile('output.mov');
            const trimmedUrl: string = URL.createObjectURL(new Blob([data], { type: 'video/quicktime' }));

            this.setState({ processing: false, dialogOpen: true, trimmedUrl });
        } else {
            alert('Invalid start or end time.');
        }
    }

    private handleDialogClose(): void {
        this.setState({ dialogOpen: false, fileName: '', trimmedUrl: null });
    }

    private handleDialogSave(): void {
        const { fileName, trimmedUrl } = this.state;
        if (fileName && trimmedUrl) {
            const link: HTMLAnchorElement = document.createElement('a');
            link.href = trimmedUrl;
            link.download = `${fileName}.mov`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.handleDialogClose();
        } else {
            alert('Please enter a valid file name.');
        }
    }

    private toggleTrimmingMode(): void {
        this.setState((prevState) => ({
            trimming: !prevState.trimming,
            startTime: prevState.currentTime,
            endTime: prevState.currentTime,
        }));
    }

    render() {
        const { videos, currentVideo, playing, currentTime, duration, newComment, startTime, endTime, processing, trimming, dialogOpen, fileName } = this.state;

        return (
            <>
                <DrawerBox />
                <Box display="flex" bgcolor="#222" color="#fff" p={2} height="110vh" ml={35}>
                    <Box width="300px" bgcolor="#333" p={2} borderRadius="8px" mr={2}>
                        <input
                            accept="video/*"
                            style={{ display: 'none' }}
                            id="upload-button"
                            multiple
                            type="file"
                            onChange={this.handleFileUpload}
                        />
                        <Link to="/">
                            <Button
                                variant="contained"
                                component="span"
                                style={{
                                    backgroundColor: '#ff5252',
                                    color: '#fff',
                                    marginBottom: '16px',
                                    marginRight: '10px',
                                }}
                            >
                                <ArrowBackIcon />
                            </Button>
                        </Link>
                        <label htmlFor="upload-button">
                            <Button
                                variant="contained"
                                component="span"
                                style={{
                                    backgroundColor: '#ff5252',
                                    color: '#fff',
                                    marginBottom: '16px',
                                }}
                            >
                                Upload Videos
                            </Button>
                        </label>
                        <Box
                            sx={{
                                maxHeight: 'calc(100vh - 200px)',
                                overflowY: videos.length > 18 ? 'scroll' : 'auto',
                            }}
                        >
                            <List>
                                {videos.map((video, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        onClick={() => this.handlePlay(video)}
                                        style={{
                                            backgroundColor: currentVideo?.url === video.url ? '#ff5252' : 'transparent',
                                            color: currentVideo?.url === video.url ? '#fff' : '#ccc',
                                            borderRadius: '4px',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        <ListItemIcon style={{ color: currentVideo?.url === video.url ? '#fff' : '#ff5252' }}>
                                            <PlayArrowIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={video.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        {currentVideo && (
                            <>
                                <Box position="relative" width="99%" maxHeight="80vh" mb={2}>
                                    <video
                                        ref={this.videoRef}
                                        src={currentVideo.url}
                                        controls={false}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '8px',
                                            backgroundColor: '#000',
                                        }}
                                        onTimeUpdate={this.handleTimeUpdate}
                                    />
                                    <Box position="absolute" bottom="0" width="100%" p={1} bgcolor="rgba(0, 0, 0, 0.5)">
                                        {trimming ? (
                                            <Slider
                                                value={[startTime, endTime]}
                                                max={duration}
                                                onChange={(event, newValue) => {
                                                    const [newStartTime, newEndTime] = newValue as number[];
                                                    this.setState({ startTime: newStartTime, endTime: newEndTime }, () => {
                                                        if (this.videoRef.current) {
                                                            this.videoRef.current.currentTime = newEndTime;
                                                        }
                                                    });
                                                }}
                                                valueLabelDisplay="auto"
                                                style={{ color: '#ff5252', width: '100%' }}
                                            />
                                        ) : (
                                            <Slider
                                                value={currentTime}
                                                max={duration}
                                                onChange={this.handleSliderChange}
                                                style={{ color: '#ff5252' }}
                                            />
                                        )}
                                        <Box display="flex" justifyContent="space-between">
                                            <IconButton onClick={playing ? this.handlePause : () => this.handlePlay(currentVideo)} style={{ color: '#ff5252' }}>
                                                {playing ? <PauseIcon /> : <PlayArrowIcon />}
                                            </IconButton>
                                            <IconButton onClick={this.handleStop} style={{ color: '#ff5252' }}>
                                                <StopIcon />
                                            </IconButton>
                                            <IconButton onClick={this.toggleTrimmingMode} style={{ color: '#ff5252' }}>
                                                <ScissorsIcon />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Box>
                                {trimming && (
                                    <Box width="99%" bgcolor="#333" p={2} borderRadius="8px" marginLeft={5} marginRight={5} mb={2}>
                                        <Typography variant="h6" gutterBottom>
                                            Trim Video
                                        </Typography>
                                        <Box display="flex" mb={2}>
                                            <TextField
                                                label="Start Time (seconds)"
                                                type="number"
                                                value={startTime}
                                                onChange={this.handleStartTimeChange}
                                                InputLabelProps={{
                                                    style: { color: '#fff' },
                                                }}
                                                InputProps={{
                                                    style: { color: '#fff' },
                                                }}
                                                style={{ marginRight: '16px' }}
                                            />
                                            <TextField
                                                label="End Time (seconds)"
                                                type="number"
                                                value={endTime}
                                                onChange={this.handleEndTimeChange}
                                                InputLabelProps={{
                                                    style: { color: '#fff' },
                                                }}
                                                InputProps={{
                                                    style: { color: '#fff' },
                                                }}
                                            />
                                        </Box>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#ff5252', color: '#fff' }}
                                            onClick={this.handleTrimVideo}
                                            disabled={processing}
                                        >
                                            {processing ? 'Processing...' : 'Trim and Download'}
                                        </Button>
                                    </Box>
                                )}
                                <Box width="99%" bgcolor="#333" p={2} borderRadius="8px" mb={2} marginLeft={5} marginRight={5}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Author: {currentVideo.author}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Date: {currentVideo.date}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        <Typography variant="subtitle1" gutterBottom>
                                            Likes: {currentVideo.likes}
                                        </Typography>
                                        <IconButton onClick={this.handleLike} style={{ color: '#ff5252' }}>
                                            <ThumbUpIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <CommentsSection
                                    comments={currentVideo.comments}
                                    newComment={newComment}
                                    onCommentChange={this.handleCommentChange}
                                    onAddComment={this.handleAddComment}
                                />
                            </>
                        )}
                    </Box>

                    <Dialog open={dialogOpen} onClose={this.handleDialogClose}>
                        <DialogTitle style={{ backgroundColor: '#333', color: '#ff5252' }}>Save Trimmed Video</DialogTitle>
                        <DialogContent style={{ backgroundColor: '#333' }}>
                            <DialogContentText style={{ color: '#fff' }}>
                                Please enter a name for the trimmed video file.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="File Name"
                                fullWidth
                                value={fileName}
                                onChange={(event) => this.setState({ fileName: event.target.value })}
                                InputLabelProps={{
                                    style: { color: '#fff' },
                                }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                            />
                        </DialogContent>
                        <DialogActions style={{ backgroundColor: '#333' }}>
                            <Button onClick={this.handleDialogClose} style={{ color: '#ff5252' }}>
                                Cancel
                            </Button>
                            <Button onClick={this.handleDialogSave} style={{ color: '#ff5252' }}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </>
        );
    }
}

export default VideoExplorer;
