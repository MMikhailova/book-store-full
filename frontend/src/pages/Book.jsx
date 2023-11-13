import axios from 'axios';
import {  useState } from 'react';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import { Box } from '@mui/system';
import { Rating, Typography } from '@mui/material';


const Book = () => {
    const [book, setBook] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

        const getBook = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5002/get-book/${localStorage.getItem('id')}`
                );
                if (res.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${res.status}`
                    );
                } else {
                    setBook(res.data.book);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

     getBook();

    return (
        <div>
            {loading && <Loading />}
            {error && <p>{error}</p>}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#345456',
                    alignItems: 'center',
                    pb: 5,
                    height: 'fit-content'
                }}
            >
                <NavBar />
                <Typography pb={3} variant="h4">
                    {book.title}
                </Typography>
                <Typography pb={3} variant="h4">
                    {book.author}
                </Typography>
                <Box
                    sx={{
                        width: '50vw',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'beige'
                    }}
                >
                    <img
                        style={{
                            width: '50%',
                            height: 'auto',
                            objectFit: 'cover'
                        }}
                        alt={book.rating}
                        src={book.url}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: 3
                        }}
                    >
                        {book.rating && (
                            <>
                                <Typography component="legend">
                                    Rating
                                </Typography>
                                <Rating
                                    name="read-only"
                                    value={book.rating}
                                    readOnly
                                />
                            </>
                        )}
                        <Typography
                            textAlign="center"
                            variant="body1"
                            sx={{ ml: 0.5 }}
                        >
                            {book.description}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default Book;
