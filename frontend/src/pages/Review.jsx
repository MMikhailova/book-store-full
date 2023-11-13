import axios from 'axios';
import NavBar from '../components/NavBar';
import ReviewForm from '../components/ReviewForm.jsx';
import { useState } from 'react';
import Loading from '../components/Loading.jsx';

const Review = () => {
    const [loading, setLoading] = useState(true);
    const [book, setBook] = useState([]);

    const getBook = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5002/get-book/${id}`);
            if (res.status !== 200) {
                throw new Error(
                    `Failed to fetch data with status: ${res.status}`
                );
            } else {
                setBook(res.data.book);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    localStorage.getItem('id') && getBook(localStorage.getItem('id'));

    return (
        <div>
            {loading && <Loading />}
            <NavBar />
            <ReviewForm book={book} />
        </div>
    );
};

export default Review;
