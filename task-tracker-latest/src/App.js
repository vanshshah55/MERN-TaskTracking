import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import OwnerDashboard from './pages/OwnerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Navbar from './components/Navbar';

function App() {
  const [userType, setUserType] = useState(null); // Manages user type ('owner' or 'employee')

  return (
    <Router>
      {userType && <Navbar userType={userType} setUserType={setUserType} />}
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login setUserType={setUserType} />} />

        {/* Protected Routes: Owner and Employee Dashboards */}
        <Route
          path="/owner-dashboard"
          element={
            userType === 'owner' ? (
              <OwnerDashboard />
            ) : (
              <Login setUserType={setUserType} />
            )
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            userType === 'employee' ? (
              <EmployeeDashboard />
            ) : (
              <Login setUserType={setUserType} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
