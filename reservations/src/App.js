import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Reservations from './Components/Reservations/Reservations';



function App() {
    return (
        <Router>
            <div>
                <ToastContainer />

                {/* Define Routes */}
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/login" element={<LoginRegister />} />

                    <Route path="/reservations" element={<Reservations />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
