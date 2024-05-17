import React, { Component } from 'react';
import { Box, List, ListItem, ListItemText, TextField, Button, Typography } from '@mui/material';

interface CommentsSectionProps {
    comments: string[];
    newComment: string;
    onCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onAddComment: () => void;
}

class CommentsSection extends Component<CommentsSectionProps> {
    render() {
        const { comments, newComment, onCommentChange, onAddComment } = this.props;

        return (
            <Box width="99%" bgcolor="#333" p={2} borderRadius="8px" marginLeft={5} marginRight={5}>
                <Typography variant="h6" gutterBottom>
                    Comments
                </Typography>
                <List>
                    {comments.map((comment, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={comment} />
                        </ListItem>
                    ))}
                </List>
                <Box display="flex" mt={2}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={newComment}
                        onChange={onCommentChange}
                        placeholder="Add a comment"
                        InputProps={{
                            style: {
                                color: '#fff',
                            },
                        }}
                        style={{
                            marginRight: '8px',
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#ff5252', color: '#fff' }}
                        onClick={onAddComment}
                    >
                        Add
                    </Button>
                </Box>
            </Box>
        );
    }
}

export default CommentsSection;
