import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Button, CardActionArea, Rating, Stack } from '@mui/material';
import IsLoggedContext from '../context/isLogged.js';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';

export default function BookCard({ book }) {
    const navigate = useNavigate();
    const location = useLocation();
    const data = useContext(IsLoggedContext);
    const handleClick = async (id) => {
        data.setBookId(id);
        navigate('book');
    };
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:5002/delete-book/${id}`,
                {
                    withCredentials: true
                }
            );
            if (res.status !== 200) {
                throw new Error(
                    `Failed to delete book with status: ${res.status}`
                );
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Card
            sx={{ height: '300px', minWidth: '400px', maxWidth: 'fit-content' }}
        >
            <CardActionArea
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    height: '100%',
                    width: '100%'
                }}
            >
                <img
                    style={{
                        objectFit: 'cover',
                        height: '100%',
                        width: 'auto'
                    }}
                    src={book.url}
                    title="product image"
                />
                <CardContent
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flexGrow: 1,
                        width: '50%',
                        alignItems: 'center',
                        p: 1
                    }}
                >
                    <Typography
                        variant="h5"
                        display="block"
                        gutterBottom
                        component="div"
                    >
                        {book.title}
                    </Typography>
                    <Typography
                        variant="h6"
                        display="block"
                        gutterBottom
                        component="div"
                    >
                        {book.author}
                    </Typography>
                    {book.rating && (
                        <Rating name="read-only" value={book.rating} readOnly />
                    )}
                    <Button onClick={() => handleClick(book.id)} size="small">
                        Read Review
                    </Button>
                    {location.pathname === '/account' && (
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                p: 3,
                                width: '100%',
                                justifyContent: 'space-evenly'
                            }}
                        >
                            <EditIcon onClick={() => navigate('/review')} />
                            <DeleteOutlineIcon
                                onClick={() => handleDelete(book.id)}
                            />
                        </Stack>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        author: PropTypes.string,
        id: PropTypes.number,
        rating: PropTypes.number
    })
};
