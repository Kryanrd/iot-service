import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Header from './Components/Header/Header';
import DevicesPage from './Components/DevicesPage/DevicesPage';
import Footer from './Components/Footer/Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('start');
  const [activeDeviceId, setActiveDeviceId] = useState(null); // New state

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // This function will reset the active device when the logo is clicked
  const handleLogoClick = () => {
    setCurrentPage('start');
    setActiveDeviceId(null);  // Reset the active device
  };

  return (
    <Router>
      <div>
        {isAuthenticated && <Header setCurrentPage={handleLogoClick} />} {/* Update the handler */}
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsAuthenticated(true)} onLogout={handleLogout} />} 
          />
          <Route 
            path="/devices" 
            element={isAuthenticated ? (
              <DevicesPage 
                currentPage={currentPage} 
                setCurrentPage={setCurrentPage} 
                activeDeviceId={activeDeviceId}  // Pass the active device ID
                setActiveDeviceId={setActiveDeviceId} // Pass the setter for active device ID
              />
            ) : (
              <Navigate to="/login" />
            )} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
}

export default App;
