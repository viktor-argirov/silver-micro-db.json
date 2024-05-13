import React, { useState, useEffect } from 'react';
import './Reservations.css';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newReservation, setNewReservation] = useState({
        restaurant: '',
        date: '',
        time: '',
        people: '',
        tableDetails: '',
        comments: ''
    });

    useEffect(() => {
        fetch('http://localhost:8000/reservations')
            .then(response => response.json())
            .then(data => setReservations(data))
            .catch(error => console.error('Error fetching reservations:', error));
    }, []);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation({ ...newReservation, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8000/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        })
        .then(response => response.json())
        .then(data => {
            setReservations([...reservations, data]);
            setNewReservation({
                restaurant: '',
                date: '',
                time: '',
                people: '',
                tableDetails: '',
                comments: ''
            });
            setShowModal(false);
        })
        .catch(error => console.error('Error posting reservation:', error));
    };

    return (
        <div className='reservations-wrapper'>
            {/* Display the reservations table */}
            <table className='reservations-table'>
                <thead>
                    <tr>
                        <th>Restaurant</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>People</th>
                        <th>Table Details</th>
                        <th>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td>{reservation.restaurant}</td>
                            <td>{reservation.date}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.people}</td>
                            <td>{reservation.tableDetails}</td>
                            <td>{reservation.comments}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Button to open the reservation modal */}
            <button className='make-reservation-btn' onClick={handleShowModal}>
                Make a Reservation
            </button>

            {/* Reservation modal */}
            {showModal && (
                <div className='modal show'>
                    <div className='modal-content'>
                        <h2>Make a Reservation</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className='form-group'>
                                <label htmlFor='restaurant'>Restaurant:</label>
                                <input
                                    type='text'
                                    id='restaurant'
                                    name='restaurant'
                                    value={newReservation.restaurant}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='date'>Date:</label>
                                <input
                                    type='date'
                                    id='date'
                                    name='date'
                                    value={newReservation.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='time'>Time:</label>
                                <input
                                    type='time'
                                    id='time'
                                    name='time'
                                    value={newReservation.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='people'>People:</label>
                                <input
                                    type='number'
                                    id='people'
                                    name='people'
                                    value={newReservation.people}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='tableDetails'>Table Details:</label>
                                <input
                                    type='text'
                                    id='tableDetails'
                                    name='tableDetails'
                                    value={newReservation.tableDetails}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='comments'>Comments:</label>
                                <textarea
                                    id='comments'
                                    name='comments'
                                    value={newReservation.comments}
                                    onChange={handleInputChange}
                                ></textarea>
                            </div>
                            <div className='modal-footer'>
                                <button type='submit'>Submit</button>
                                <button type='button' onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Reservations;
