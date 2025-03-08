import React, { useState } from "react";
import { Container, TextField, Grid, Button, Typography, Paper, Box, Toolbar } from "@mui/material";
import { PostRequest } from '../utils/request';
import Sidebar from "../common/sidebar";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from '../common/toastify';

const AddBlog = ({ setTrigger }) => {
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [publishedAt, setPublishedAt] = useState("");
    const [error, setError] = useState("");

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
        console.log("User logged out");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setError("");

        if (!title || !author || !publishedAt || !description) {
            setError("Fields must not be empty!");
            setDisabled(false);
            return;
        }

        try {            
            const response = await PostRequest(`${process.env.REACT_APP_API_URL}addPosts`, {
                title,
                author,
                publishedAt,
                description
            });
            
            console.log("response", response);
            notifySuccess('Blog Added Successfully!');

            setTitle("");
            setAuthor("");
            setPublishedAt("");
            setDescription("");
            setTrigger((prev) => prev + 1);
        } catch (error) {
            console.error("Error adding blog:", error);
            notifyError(error.response?.data?.message );
        }
        setDisabled(false);
    };

    return (
        <Sidebar>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="primary" variant="contained" onClick={handleLogout}>
                    Logout
                </Button>
            </Toolbar>
            <Container>
                <Paper elevation={3} sx={{ p: 4, m: 4, borderRadius: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Add New Blog
                    </Typography>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} disabled={disabled} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Author" variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)} disabled={disabled} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label="Published At" type="date" variant="outlined" InputLabelProps={{ shrink: true }} value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} disabled={disabled} />
                            </Grid>
                        </Grid>
                        <Grid item xs={6} mt={2}>
                            <TextField fullWidth label="Description" type="text" variant="outlined" multiline minRows={13} maxRows={10} InputLabelProps={{ shrink: true }} value={description} onChange={(e) => setDescription(e.target.value)} disabled={disabled} />
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={disabled}>
                            Add Blog
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Sidebar>
    );
};

export default AddBlog;
