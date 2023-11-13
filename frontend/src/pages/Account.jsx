import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import BookCard from "../components/BookCard";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar"

const Account = () => {
     const [books, setBooks] = useState([]);
     const [error, setError] = useState('');
     const [loading, setLoading] = useState(true);
     //get user_id
    const parts = document.cookie.split('=');

    // Access the second part which contains the number
    const numberString = parts[1];

        const getBooks = async () => {
            try {
           
                const res = await axios.get(`http://localhost:5002/get-user-books/${numberString}`,
                    {withCredentials:true}
                );
               
                if (res.status !== 200) {
                    throw new Error(
                        `Failed to fetch data with status: ${res.status}`
                    );
                } else {
                    setBooks(res.data.books);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getBooks();

  return (
      <div>
     
          {loading && <Loading />}
          {error && <p>{error}</p>}
          <Box
              sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#345456',
                  height:"6000px"
              }}
          >
              <NavBar />
              <Grid width={'100%'} container rowSpacing={4}>
                  {books.map((book) => (
                      <Grid
                          item
                          key={book.id}
                          lg={4}
                          md={4}
                          sm={6}
                          xs={12}
                          sx={{
                              flexWrap: 'wrap',
                              justifyContent: 'space-around',
                              textAlign: 'center',
                              // margin: 'auto',
                              padding: 4
                          }}
                      >
                          <BookCard key={book.id} book={book} />
                      </Grid>
                  ))}
              </Grid>
          </Box>
      </div>
  );
}

export default Account
