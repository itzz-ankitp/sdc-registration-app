import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

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
import ProjectSubmissionDetail from './components/ProjectSubmissionDetail';

// Admin UID constant
const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';

// Background Component - must be inside Router context
const Background = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    // Hex pattern background for login/register pages
    return (
      <svg
        className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.15 }}
      >
        <defs>
          <pattern id="hexPattern" width="80" height="92" patternUnits="userSpaceOnUse">
            <polygon points="40,6 75,27 75,65 40,86 5,65 5,27" fill="none" stroke="#7C3AED" strokeWidth="2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>
    );
  }

  // Geometric background for other pages
  return (
    <div className="geometric-background">
      {/* Dark gradient background */}
      <div className="geometric-gradient"></div>
      
      {/* Concentric Circles */}
      <div className="concentric-circles">
        <div className="concentric-circle concentric-circle-1"></div>
        <div className="concentric-circle concentric-circle-2"></div>
        <div className="concentric-circle concentric-circle-3"></div>
      </div>
      
      {/* Solid Circles */}
      <div className="solid-circle solid-circle-1"></div>
      <div className="solid-circle solid-circle-2"></div>
      <div className="solid-circle solid-circle-3"></div>
      
      {/* Patterned Circles */}
      <div className="patterned-circle patterned-circle-1"></div>
      <div className="patterned-circle patterned-circle-2"></div>
      
      {/* Abstract Polygons */}
      <div className="abstract-polygon polygon-1"></div>
      <div className="abstract-polygon polygon-2"></div>
      <div className="abstract-polygon polygon-3"></div>
      <div className="abstract-polygon polygon-4"></div>
      
      {/* Small Geometric Elements - Dots */}
      <div className="geometric-dot dot-1"></div>
      <div className="geometric-dot dot-2"></div>
      <div className="geometric-dot dot-3"></div>
      <div className="geometric-dot dot-4"></div>
      <div className="geometric-dot dot-5"></div>
      <div className="geometric-dot dot-6"></div>
      <div className="geometric-dot dot-7"></div>
      <div className="geometric-dot dot-8"></div>
      <div className="geometric-dot dot-9"></div>
      <div className="geometric-dot dot-10"></div>
      
      {/* Small Geometric Elements - Lines */}
      <div className="geometric-line line-1"></div>
      <div className="geometric-line line-2"></div>
      <div className="geometric-line line-3"></div>
      <div className="geometric-line line-4"></div>
    </div>
  );
};

// App Content Component - must be inside Router context
const AppContent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

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
    <div className={`relative min-h-screen overflow-hidden ${!isAuthPage ? 'bg-[var(--color-sdc-dark)]' : ''}`}>
      <Background />
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
        <Route path="/project-submission/:uid" element={<ProjectSubmissionDetail />} />
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
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

