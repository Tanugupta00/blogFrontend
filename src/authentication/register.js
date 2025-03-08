import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { validateEmail, validatePassword } from '../utils/formfunction';
import { PostRequest } from '../utils/request';
import { useNavigate } from "react-router-dom"; 
import { notifySuccess, notifyError } from '../common/toastify';


const RegisterPage = () => {
    const navigate = useNavigate(); 
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        if (!email || !password || !username) {
            setError("Fields must not be empty!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Email is invalid!");
            return;
        }

        if (!validatePassword(password)) {
            setError("The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        setLoading(true);
        
        try {
            const response = await PostRequest(`${process.env.REACT_APP_API_URL}/register`, {
                username,
                email,
                password
            });

            if (response)  {
                setError(""); 
                notifySuccess('User register successfully!');
                navigate("/login"); 
                setUsername("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            console.log("err",err)
            notifyError(err.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>

                {error &&  (
                    <Typography color="error" variant="body2" align="left" marginBottom={2}>
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Registering...' : 'Register'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2" align="center">
                        Already have an account?{' '}
                        <Link href="/login" variant="body2">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;
