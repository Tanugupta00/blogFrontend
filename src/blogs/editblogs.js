import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { PutRequest } from "../utils/request";

const EditBlog = ({ open, handleClose, blog, refreshBlogs }) => {
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        description: "",
        publishedAt: "",
    });

    useEffect(() => {
        if (blog) {
            setFormData({
                id: blog._id || "", 
                author: blog.author || "",
                title: blog.title || "",
                description: blog.description || "",
                publishedAt: blog.publishedAt || "",
            });
        }
    }, [blog]);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await PutRequest(`${process.env.REACT_APP_API_URL}editBlog/${formData.id}`, formData);
            console.log("response",response)
            refreshBlogs(); 
            handleClose();
        } catch (error) {
            console.error("Error updating blog:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogContent>
                <TextField
                    label="Author"
                    name="author"
                    fullWidth margin="normal"
                    value={formData.author} onChange={handleChange} />
                <TextField
                    label="Title"
                    name="title"
                    fullWidth margin="normal"
                    value={formData.title}
                    onChange={handleChange} />
                <TextField
                    label="Description"
                    name="description"
                    fullWidth margin="normal"
                    multiline rows={3}
                    value={formData.description}
                    onChange={handleChange} />
                <TextField label="Published At" name="publishedAt" fullWidth margin="normal" type="date" InputLabelProps={{ shrink: true }} value={formData.publishedAt} onChange={handleChange} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">Save Changes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditBlog;
