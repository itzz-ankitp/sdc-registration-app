import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, get } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, User, Mail, GraduationCap, Building, Phone, LogOut, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import sdcLogo from '../assets/sdc.png';

const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';
const ADMIN_EMAIL = 'sdcmvjce@gmail.com';
const ADMIN_PASSWORD = 'admin#001';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ email: '', password: '' });
  const [authenticating, setAuthenticating] = useState(false);
  const [dbError, setDbError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && user.uid === ADMIN_UID) {
      loadUsers();
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      setDbError(null);
      const usersRef = ref(realtimeDb, 'users');
      
      // First try to get the data once to check access
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUsers(Object.values(data));
      } else {
        setUsers([]);
      }

      // Then set up real-time listener
      const unsubscribe = onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsers(Object.values(data));
        } else {
          setUsers([]);
        }
      }, (error) => {
        console.error('Database access error:', error);
        setDbError('Failed to access user data. Please check database rules.');
      });

      return () => unsubscribe();
    } catch (err) {
      console.error('Error loading users:', err);
      setDbError('Failed to load user data. Please check your admin permissions.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthenticating(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (err) {
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
      </div>
    );
  }

  if (!user || user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <Card className="card-dark border-gray-800 w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <img src={sdcLogo} alt="SDC Logo" className="w-12 h-12 mr-3" />
                <div>
                  <h1 className="text-xl font-bold text-white">SDC Admin</h1>
                  <p className="text-sm text-gray-400">Administrator Access</p>
                </div>
              </div>
              <CardTitle className="text-white">Admin Login</CardTitle>
              <CardDescription className="text-gray-400">
                Enter your admin credentials to access the dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert className="border-red-500/50 bg-red-500/10">
                    <AlertDescription className="text-red-400">{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="input-field"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full btn-primary" disabled={authenticating}>
                  {authenticating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Logging in...
                    </>
                  ) : (
                    'Login as Admin'
                  )}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
                  ← Back to Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-400">User Management</p>
            </div>
          </div>
          
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="sm"
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 sdc-text-gradient">
            Registered Users
          </h2>
          <p className="text-lg text-gray-400">
            Manage and view all registered SDC members
          </p>
        </div>

        {/* Stats Card */}
        <Card className="card-dark border-gray-800 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)] flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{users.length}</p>
                <p className="text-gray-400">Total Registered Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card className="card-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
              User Details
            </CardTitle>
            <CardDescription className="text-gray-400">
              Complete list of all registered users
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {dbError && (
              <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{dbError}</AlertDescription>
              </Alert>
            )}
            
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 px-4 text-gray-300 font-medium">Full Name</th>
                    <th className="py-3 px-4 text-gray-300 font-medium">Email</th>
                    <th className="py-3 px-4 text-gray-300 font-medium">Year</th>
                    <th className="py-3 px-4 text-gray-300 font-medium">Department</th>
                    <th className="py-3 px-4 text-gray-300 font-medium">Student ID</th>
                    <th className="py-3 px-4 text-gray-300 font-medium">Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-400">
                        {dbError ? 'Unable to load users' : 'No users found. Users will appear here once they register.'}
                      </td>
                    </tr>
                  ) : (
                    users.map((u, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4 text-white">{u.fullName || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-300">{u.email || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-300">Year {u.yearOfStudy || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-300">{u.department || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-300">{u.studentId || 'N/A'}</td>
                        <td className="py-3 px-4 text-gray-300">{u.contactNumber || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Admin; 