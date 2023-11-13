import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import Message from '../components/message';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import PropTypes from 'prop-types';


function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {'Copyright © '}
            <Link color="inherit" href="/">
                Magic Book
            </Link>
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const ReviewForm = ({book}) => {
    const parts = document.cookie.split('=');

    // Access the second part which contains the number
    const numberString = parts[1];

    // Convert the number string to a number
    const idNumber = parseInt(numberString, 10);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: book?.title || 'fdf',
        author: book?.author || 'd',
        description:book?.description || 'd',
        url: book?.url || 'd',
        rating: book?.rating || 1,
        user_id: idNumber
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value =
            e.target.name === 'rating'
                ? parseInt(e.target.value, 10)
                : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            book ? await updateBook(formData) : await postBook(formData);
            setFormData({
                title:'',
                author: '',
                description: '',
                url:  '',
                rating: 1,
                user_id: idNumber
            });
        } catch (err) {
            setError(err);
        }
    };

    const postBook = async (formData) => {
        try {
            const res = await axios.post(
                'http://localhost:5002/add-book',
                formData,
                { withCredentials: true }
            );
            if (res.status !== 201) {
                throw new Error('Error while log in');
            }
        } catch (err) {
            setError(err);
            navigate('/');
        }
    };
    const updateBook = async (formData) => {
        try {
            const res = await axios.put(
                `http://localhost:5002/update-book/${localStorage.getItem(
                    'id'
                )}`,
                formData,
                { withCredentials: true }
            );
            if (res.status !== 200) {
                throw new Error('Error while log in');
            }
        } catch (err) {
            setError(err);
            navigate('/');
        }
    };
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Leave your review
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="title"
                                        name="title"
                                        label="Title"
                                        type="text"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="author"
                                        label="Author"
                                        type="text"
                                        id="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="description"
                                        label="Description"
                                        type="text"
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="url"
                                        label="Image"
                                        type="url"
                                        id="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Rating
                                        label="Rating"
                                        type="number"
                                        id="rating"
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            {!book && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add a review
                                </Button>
                            )}
                            {book && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Update a review
                                </Button>
                            )}
                            {error && <Message errorText={error} />}
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        </>
    );
 }

export default ReviewForm; 
ReviewForm.propTypes = {
    book: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.number,
        length: PropTypes.number
    })
};
