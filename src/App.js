import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import DevicesPage from './Components/DevicesPage/DevicesPage';
import Footer from './Components/Footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('start'); // 'start' or 'devices'

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('start');
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <Header setCurrentPage={setCurrentPage} />}
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsAuthenticated(true)} />} 
          />
          <Route 
            path="/devices" 
            element={isAuthenticated ? <DevicesPage currentPage={currentPage} setCurrentPage={setCurrentPage} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
