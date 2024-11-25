import React, { useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './Components/Navbar/Navbar';
import Landing_page from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login';
import Sign_Up from "./Components/Sign_Up/Sign_Up";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Landing_page/>}/>
                <Route path="/login" element= {<Login/>} />
                <Route path="/signup" element= {<Sign_Up/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;