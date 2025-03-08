import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, Toolbar } from '@mui/material';
import { FiUser } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GetRequest } from '../utils/request';
import { useNavigate } from 'react-router-dom';

const Blogs = () => {
    const navigate = useNavigate();

    const [allBlogs, setAllBlogs] = useState([]);

    const fetchBlogs = async () => {
        const response = await GetRequest(`${process.env.REACT_APP_API_URL}posts`);
        const filteredData = response.data.data;
        const sortedBlogs = filteredData.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setAllBlogs(sortedBlogs);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear(); 

        return `${day}-${month}-${year}`; 
    };

    return (
        <Box sx={{ py: 5 }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="primary" variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/register')}>
                    Signup
                </Button>
                <Button color="primary" variant="contained" onClick={() => navigate('/login')}>
                    Login
                </Button>
            </Toolbar>
            
            <Typography variant="h4" align="center" gutterBottom>
                ALL Blogs
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {allBlogs?.map((item, i) => (
                    <Grid item xs={12} sm={5} md={5} key={i}>
                        <Card sx={{ boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent={'space-between'} mb={2}>
                                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                        <FiUser style={{ color: '#f48533', marginRight: 5 }} /> {item.author}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" display="flex" alignItems="center">
                                        <FaRegCalendarAlt style={{ color: '#f48533', marginRight: 5 }} /> 
                                        {formatDate(item.publishedAt)} 
                                    </Typography>
                                </Box>
                                <Typography variant="h6" gutterBottom sx={{ '&:hover': { color: '#f48533' } }}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Blogs;
