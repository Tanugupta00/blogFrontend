import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { PostRequest } from '../utils/request';
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from '../common/toastify';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Fields must not be empty!");
            return;
        }
        setLoading(true);

        try {
            const response = await PostRequest(`${process.env.REACT_APP_API_URL}login`, {
                email,
                password
            });
            if (response?.status) {
                localStorage.setItem("user", JSON.stringify(response.data.data));
                notifySuccess('User login successfully!');
                navigate("/addpost");
                setError("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            console.log("err",err)
            notifyError(err?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                {error && typeof error === "string" && (
                    <Typography color="error" variant="body2" align="center">
                        {error}
                    </Typography>
                )}

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                variant="outlined"
                                type="email"
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
                                {loading ? 'Login...' : 'Login'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
