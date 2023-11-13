import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import IsLoggedContext from './context/isLogged';
import Home from './pages/Home';
import Connection from './pages/Connection.jsx';
import Book from './pages/Book.jsx';

import Account from './pages/Account';

import Review from './pages/Review.jsx';


function App() {
    const [isLogged, setIsLogged] = useState(false)
    const [isRegistered, setRegistered] = useState(false);
    const [isBookId, setBookId] = useState(null)

    if (isBookId) {
           localStorage.setItem('id', isBookId);
    }

    return (
        <div>
            <IsLoggedContext.Provider
                value={{
                    isLogged: isLogged,
                    setIsLogged: setIsLogged,
                    isRegistered: isRegistered,
                    setRegistered: setRegistered,
                    isBookId: isBookId,
                    setBookId: setBookId
                

                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/connection" element={<Connection />} />
                        <Route path="/book" element={<Book />} />
                        <Route
                            path="/review"
                            element={isLogged ? <Review/> : <Connection />}
                        />
                        <Route
                            path="/account"
                            element={isLogged ? <Account /> : <Connection />}
                        />
                    </Routes>
                </Router>
            </IsLoggedContext.Provider>
        </div>
    );
}

export default App;
