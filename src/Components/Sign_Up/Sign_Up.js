import React, { useState } from 'react';
import './Sign_Up.css';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    // State variables
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // To show error messages
    const navigate = useNavigate();

    // Validation function for phone number
    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault();

        // Basic front-end validations
        if (!name || !email || !phone || !password) {
            setShowerr('All fields are required!');
            return;
        }
        if (!validatePhone(phone)) {
            setShowerr('Phone number must be exactly 10 digits.');
            return;
        }
        if (password.length < 6) {
            setShowerr('Password must be at least 6 characters long.');
            return;
        }

        // API call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password,
            }),
        });

        const json = await response.json();

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem('auth-token', json.authtoken);
            sessionStorage.setItem('name', name);
            sessionStorage.setItem('phone', phone);
            sessionStorage.setItem('email', email);

            // Redirect to the home page
            navigate('/');
            window.location.reload();
        } else {
            if (json.errors) {
                setShowerr(json.errors[0]?.msg || 'Something went wrong!');
            } else {
                setShowerr(json.error);
            }
        }
    };

    // JSX to render the Sign-Up form
    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Enter your password"
                            />
                        </div>
                        {showerr && (
                            <div className="err" style={{ color: 'red', marginTop: '10px' }}>
                                {showerr}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;
