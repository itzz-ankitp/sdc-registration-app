import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onValue, get, update } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LogOut, 
  Clock, 
  User, 
  Users, 
  Settings, 
  Database, 
  Shield, 
  BarChart3, 
  FileText,
  MessageCircle,
  Building,
  Smartphone,
  Globe,
  Brain,
  Gamepad2,
  Code,
  Menu,
  X
} from 'lucide-react';
import sdcLogo from '../assets/sdc.png';
import { Switch } from '@/components/ui/switch';

const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [dbError, setDbError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
      updateGreeting();
    }
  }, [user]);

  const updateGreeting = () => {
    const now = new Date();
    const hour = now.getHours();
    
    let timeGreeting;
    if (hour < 12) {
      timeGreeting = 'Good morning';
    } else if (hour < 17) {
      timeGreeting = 'Good afternoon';
    } else {
      timeGreeting = 'Good evening';
    }
    
    const userName = user?.displayName || 'Administrator';
    setGreeting(`${timeGreeting}, ${userName}!`);
  };

  const loadUsers = async () => {
    try {
      setDbError(null);
      const usersRef = ref(realtimeDb, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUsers(Object.entries(data).map(([uid, user]) => ({ uid, ...user })));
      } else {
        setUsers([]);
      }

      const unsubscribe = onValue(usersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setUsers(Object.entries(data).map(([uid, user]) => ({ uid, ...user })));
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const adminActions = [
    {
      title: 'User Management',
      description: 'View and manage all registered users',
      icon: Users,
      link: '/admin',
      color: 'from-[var(--color-sdc-purple-dark)] to-[var(--color-sdc-purple-mid)]',
      count: users.length
    },
    {
      title: 'Development Tasks',
      description: 'View and manage development tasks for each track',
      icon: Code,
      link: '/tasks',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)]'
    },
    {
      title: 'Database Tools',
      description: 'Access database testing and migration tools',
      icon: Database,
      link: '/database-test',
      color: 'from-[var(--color-sdc-purple-bright)] to-[var(--color-sdc-blue-bright)]'
    },
    {
      title: 'Firebase Test',
      description: 'Test Firebase configuration and connectivity',
      icon: Shield,
      link: '/firebase-test',
      color: 'from-[var(--color-sdc-blue-bright)] to-[var(--color-sdc-purple-mid)]'
    },
    {
      title: 'Data Recovery',
      description: 'Help users recover missing profile data',
      icon: FileText,
      link: '/data-recovery',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-blue-bright)]'
    },
    {
      title: 'User Migration',
      description: 'Migrate users from Firestore to Realtime DB',
      icon: Settings,
      link: '/migrate-users',
      color: 'from-[var(--color-sdc-blue-bright)] to-[var(--color-sdc-purple-dark)]'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
      </div>
    );
  }



  if (!user) {
    console.log('AdminDashboard - No user, redirecting to login');
    return <Navigate to="/login" />;
  }

  if (user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-400 mb-6">You don't have permission to access the admin dashboard.</p>
          <Button onClick={() => navigate('/dashboard')} className="btn-primary">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}

      <div className="container mx-auto px-4 py-8 relative z-10">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-8 h-8 md:w-12 md:h-12" />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-white">Software Development Club</h1>
              <p className="text-xs md:text-sm text-gray-400">Admin Portal</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-white">SDC Admin</h1>
              <p className="text-xs text-gray-400">Portal</p>
            </div>
          </div>
          
          {/* Desktop Header Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="h-4 w-4 text-[var(--color-sdc-purple-mid)]" />
              <span className="text-sm">Administrator</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
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

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-gray-900/95 rounded-lg border border-gray-700">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300 pb-2 border-b border-gray-700">
                <Shield className="h-4 w-4 text-[var(--color-sdc-purple-mid)]" />
                <span className="text-sm">Administrator</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300 pb-2 border-b border-gray-700">
                <User className="h-4 w-4" />
                <span className="text-sm truncate">{user?.email}</span>
              </div>
              <Button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-4 md:p-6">
        {/* Welcome Section */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-5 w-5 md:h-6 md:w-6 text-[var(--color-sdc-purple-mid)] mr-2" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              {greeting}
            </h2>
          </div>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Welcome to the SDC Admin Portal. Manage users, monitor system health, and oversee the registration process.
          </p>
        </div>

        {/* Stats Cards - Total Users + 2x2 Dev Grid */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-8 md:mb-12 h-full">
          {/* Total Users Card - Takes 1/3 width on large screens */}
          <div className="lg:w-1/3 lg:flex-shrink-0">
            <Card className="card-dark border-gray-800 h-full min-h-[400px] lg:min-h-[500px]">
              <CardContent className="p-6 flex flex-col justify-center h-full">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)] flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-white">{users.length}</p>
                    <p className="text-gray-400 text-lg">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dev Cards Grid - Takes 2/3 width on large screens */}
          <div className="lg:w-2/3 lg:flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              {/* Android Dev */}
              <Card className="card-dark border-gray-800 h-full min-h-[200px] lg:min-h-[240px]">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {users.filter(u => u.developmentTrack === 'android').length}
                      </p>
                      <p className="text-gray-400">Android Dev</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Web Dev */}
              <Card className="card-dark border-gray-800 h-full min-h-[200px] lg:min-h-[240px]">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {users.filter(u => u.developmentTrack === 'web').length}
                      </p>
                      <p className="text-gray-400">Web Dev</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ML Dev */}
              <Card className="card-dark border-gray-800 h-full min-h-[200px] lg:min-h-[240px]">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {users.filter(u => u.developmentTrack === 'ml').length}
                      </p>
                      <p className="text-gray-400">ML Dev</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Game Dev */}
              <Card className="card-dark border-gray-800 h-full min-h-[200px] lg:min-h-[240px]">
                <CardContent className="p-6 flex flex-col justify-center h-full">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                      <Gamepad2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">
                        {users.filter(u => u.developmentTrack === 'game').length}
                      </p>
                      <p className="text-gray-400">Game Dev</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Project Submissions Section */}
        <div className="mb-8 md:mb-12">
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Code className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                Project Submissions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Review and grade submitted projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-300">
                  <thead>
                    <tr>
                      <th className="px-2 md:px-4 py-2 text-left">Name</th>
                      <th className="px-2 md:px-4 py-2 text-left hidden sm:table-cell">Email</th>
                      <th className="px-2 md:px-4 py-2 text-left hidden md:table-cell">GitHub Link</th>
                      <th className="px-2 md:px-4 py-2 text-left hidden lg:table-cell">Live Link</th>
                      <th className="px-2 md:px-4 py-2 text-center">Track</th>
                      <th className="px-2 md:px-4 py-2 text-center">Reviewed</th>
                      <th className="px-2 md:px-4 py-2 text-center">Graded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.filter(u => u.githubLink).map((u, idx) => (
                      <tr key={u.uid || idx} className="border-b border-gray-700">
                        <td className="px-2 md:px-4 py-2">{u.fullName || '-'}</td>
                        <td className="px-2 md:px-4 py-2 hidden sm:table-cell">{u.email || '-'}</td>
                        <td className="px-2 md:px-4 py-2 hidden md:table-cell">
                          <a href={u.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">{u.githubLink}</a>
                        </td>
                        <td className="px-2 md:px-4 py-2 hidden lg:table-cell">
                          {u.liveUrl ? (
                            <a href={u.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 underline">{u.liveUrl}</a>
                          ) : (
                            <span className="text-gray-500">N/A</span>
                          )}
                        </td>
                        <td className="px-2 md:px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            u.developmentTrack === 'android' ? 'bg-green-500/20 text-green-400' :
                            u.developmentTrack === 'web' ? 'bg-blue-500/20 text-blue-400' :
                            u.developmentTrack === 'ml' ? 'bg-purple-500/20 text-purple-400' :
                            u.developmentTrack === 'game' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {u.developmentTrack === 'android' ? 'Android' :
                             u.developmentTrack === 'web' ? 'Web' :
                             u.developmentTrack === 'ml' ? 'ML' :
                             u.developmentTrack === 'game' ? 'Game' :
                             u.developmentTrack || '-'}
                          </span>
                        </td>
                        <td className="px-2 md:px-4 py-2 text-center">
                          <Switch
                            checked={!!u.submissionReviewed}
                            onCheckedChange={async (checked) => {
                              const userRef = ref(realtimeDb, `users/${u.uid}`);
                              // If reviewed is being turned off, automatically turn off graded
                              const updates = { submissionReviewed: checked };
                              if (!checked && u.graded) {
                                updates.graded = false;
                              }
                              await update(userRef, updates);
                              loadUsers();
                            }}
                          />
                        </td>
                        <td className="px-2 md:px-4 py-2 text-center">
                          <Switch
                            checked={!!u.graded}
                            disabled={!u.submissionReviewed}
                            onCheckedChange={async (checked) => {
                              const userRef = ref(realtimeDb, `users/${u.uid}`);
                              await update(userRef, { graded: checked });
                              loadUsers();
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.filter(u => u.githubLink).length === 0 && (
                  <div className="text-gray-400 text-center py-6">No project submissions yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {adminActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="card-dark border-gray-800 hover:border-[var(--color-sdc-purple-mid)]/50 transition-all duration-300 transform hover:scale-105 group h-full min-h-[200px]">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:animate-pulse-glow`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:sdc-text-gradient transition-all duration-300 flex items-center justify-between">
                    {action.title}
                    {action.count !== undefined && (
                      <span className="text-sm bg-[var(--color-sdc-purple-mid)] text-white px-2 py-1 rounded-full">
                        {action.count}
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                Admin Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Role:</span>
                  <span className="text-[var(--color-sdc-purple-mid)]">Administrator</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Access:</span>
                  <span className="text-green-400">Full</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Database className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                Database Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dbError ? (
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{dbError}</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Connected to Realtime Database</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">User data accessible</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Admin permissions active</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 md:mt-12 p-4 md:p-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Software Development Club. Admin Portal.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Administrator Access | System Version: 1.0.0
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default AdminDashboard; 