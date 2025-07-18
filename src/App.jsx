import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import './App.css';

// Import components (we'll create these)
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import About from './components/About';
import LoadingSpinner from './components/LoadingSpinner';
import TermsAndConditions from './components/TermsAndConditions';
import Admin from './components/Admin';
import AdminDashboard from './components/AdminDashboard';
import Profile from './components/Profile';
import MigrateUsers from './components/MigrateUsers';
import DatabaseTest from './components/DatabaseTest';
import FirebaseTest from './components/FirebaseTest';
import DataRecovery from './components/DataRecovery';
import Tasks from './components/Tasks';
import UserTasks from './components/UserTasks';
import FormspreeTest from './components/FormspreeTest';

// Admin UID constant
const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Helper function to check if user is admin
  const isAdmin = (user) => {
    return user && user.uid === ADMIN_UID;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="relative min-h-screen bg-[var(--color-sdc-dark)] overflow-hidden">
        {/* Hexagon SVG Background */}
        <svg
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.10 }}
        >
          <defs>
            <pattern id="hexPattern" width="80" height="92" patternUnits="userSpaceOnUse">
              <polygon points="40,6 75,27 75,65 40,86 5,65 5,27" fill="none" stroke="#7C3AED" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
        {/* Main App Content */}
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/migrate-users" element={<MigrateUsers />} />
          <Route path="/database-test" element={<DatabaseTest />} />
          <Route path="/firebase-test" element={<FirebaseTest />} />
          <Route path="/data-recovery" element={<DataRecovery />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/user-tasks" element={<UserTasks />} />
          <Route path="/formspree-test" element={<FormspreeTest />} />
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/timeline" 
            element={user ? <Timeline user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/contact" 
            element={user ? <Contact /> : <Navigate to="/login" />} 
          />
          {/* Default route */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

