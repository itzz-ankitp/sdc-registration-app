import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { ref, update, get } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LogOut, Clock, User, Calendar, MessageCircle, Users, Smartphone, Globe, Brain, Gamepad2, Save, Code } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Dashboard = ({ user }) => {
  const [greeting, setGreeting] = useState('');
  const [userData, setUserData] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Admin UID constant
  const ADMIN_UID = '0JkRLEEnv1dDEPaXaysRfchzGoT2';

  // Redirect admin to admin dashboard
  useEffect(() => {
    if (user && user.uid === ADMIN_UID) {
      navigate('/admin-dashboard');
    }
  }, [user, navigate]);

  const developmentTracks = [
    { value: 'android', label: 'Android Development', icon: Smartphone, color: 'from-green-500 to-green-600' },
    { value: 'web', label: 'Web Development', icon: Globe, color: 'from-blue-500 to-blue-600' },
    { value: 'ml', label: 'Machine Learning', icon: Brain, color: 'from-purple-500 to-purple-600' },
    { value: 'game', label: 'Game Development', icon: Gamepad2, color: 'from-orange-500 to-orange-600' }
  ];

  useEffect(() => {
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
      
      const userName = user?.displayName || user?.email?.split('@')[0] || 'there';
      setGreeting(`${timeGreeting}, ${userName}!`);
    };

    updateGreeting();
    // Update greeting every minute
    const interval = setInterval(updateGreeting, 60000);
    
    return () => clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
        setSelectedTrack(data.developmentTrack || '');
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const handleTrackSelection = async () => {
    if (!selectedTrack) {
      setError('Please select a development track');
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      await update(userRef, {
        developmentTrack: selectedTrack,
        trackUpdatedAt: new Date().toISOString()
      });

      setUserData(prev => ({ ...prev, developmentTrack: selectedTrack }));
      setSuccess('Development track updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error updating development track:', err);
      setError('Failed to update development track. Please try again.');
    } finally {
      setSaving(false);
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

  const getTrackInfo = (trackValue) => {
    return developmentTracks.find(track => track.value === trackValue);
  };

  const quickActions = [
    ...(userData?.developmentTrack ? [{
      title: 'My Task',
      description: `View your ${getTrackInfo(userData.developmentTrack)?.label} assignment`,
      icon: Code,
      link: '/user-tasks',
      color: 'from-[var(--color-sdc-purple-dark)] to-[var(--color-sdc-purple-mid)]'
    }] : []),
    {
      title: 'My Profile',
      description: 'View and edit your profile details',
      icon: User,
      link: '/profile',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)]'
    },
    {
      title: 'Registration Timeline',
      description: 'View the registration process steps',
      icon: Calendar,
      link: '/timeline',
      color: 'from-[var(--color-sdc-purple-bright)] to-[var(--color-sdc-blue-bright)]'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with the SDC team',
      icon: MessageCircle,
      link: '/contact',
      color: 'from-[var(--color-sdc-blue-bright)] to-[var(--color-sdc-purple-mid)]'
    },
    {
      title: 'About SDC',
      description: 'Learn more about our club',
      icon: Users,
      link: '/about',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-blue-bright)]'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-white">Software Development Club</h1>
              <p className="text-sm text-gray-400">Registration Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="h-4 w-4" />
              <span className="text-sm">{user?.email}</span>
            </div>
            <Link to="/profile">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
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
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-6 w-6 text-[var(--color-sdc-purple-mid)] mr-2" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {greeting}
            </h2>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Welcome to the Software Development Club registration portal. 
            Explore the options below to complete your registration or learn more about our community.
          </p>
        </div>

        {/* Development Track Selection */}
        <Card className="card-dark border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Brain className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
              {userData?.developmentTrack ? 'Your Development Track' : 'Choose Your Development Track'}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {userData?.developmentTrack 
                ? 'View your assigned development task and track your progress'
                : 'Select your preferred development track to help us tailor your SDC experience'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4 border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-400">{success}</AlertDescription>
              </Alert>
            )}
            
            {error && (
              <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {developmentTracks.map((track) => {
                const TrackIcon = track.icon;
                const isSelected = selectedTrack === track.value;
                const isCurrentTrack = userData?.developmentTrack === track.value;
                
                return (
                  <div
                    key={track.value}
                    className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      isSelected 
                        ? 'border-[var(--color-sdc-purple-mid)] bg-[var(--color-sdc-purple-mid)]/10' 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                    onClick={() => setSelectedTrack(track.value)}
                  >
                    {isCurrentTrack && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${track.color} flex items-center justify-center mb-3`}>
                      <TrackIcon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-white font-medium mb-1">{track.label}</h3>
                    
                    {isSelected && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-700 rounded-full h-1">
                          <div className="bg-[var(--color-sdc-purple-mid)] h-1 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {userData?.developmentTrack ? (
                  <span>
                    Current track: <span className="text-white font-medium">
                      {getTrackInfo(userData.developmentTrack)?.label}
                    </span>
                  </span>
                ) : (
                  <span>No track selected yet</span>
                )}
              </div>
              
              <div className="flex space-x-2">
                {userData?.developmentTrack && (
                  <Link to="/user-tasks">
                    <Button variant="outline" className="border-[var(--color-sdc-blue-bright)] text-[var(--color-sdc-blue-bright)] hover:bg-[var(--color-sdc-blue-bright)]/10">
                      <Code className="h-4 w-4 mr-2" />
                      View Task
                    </Button>
                  </Link>
                )}
                
                <Button
                  onClick={handleTrackSelection}
                  disabled={saving || !selectedTrack || selectedTrack === userData?.developmentTrack}
                  className="btn-primary"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      {userData?.developmentTrack ? 'Update Track' : 'Save Selection'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <Card className="card-dark border-gray-800 hover:border-[var(--color-sdc-purple-mid)]/50 transition-all duration-300 transform hover:scale-105 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:animate-pulse-glow`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:sdc-text-gradient transition-all duration-300">
                    {action.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {action.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-white">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Account:</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Registration:</span>
                  <span className="text-[var(--color-sdc-purple-mid)]">Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Development Track:</span>
                  <span className="text-white">
                    {userData?.developmentTrack ? getTrackInfo(userData.developmentTrack)?.label : 'Not selected'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Account created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${userData?.developmentTrack ? 'bg-green-400' : 'bg-[var(--color-sdc-purple-mid)] animate-pulse'}`}></div>
                  <span className="text-gray-300">
                    {userData?.developmentTrack ? 'Development track selected' : 'Select your development track'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[var(--color-sdc-purple-mid)] rounded-full animate-pulse"></div>
                  <span className="text-gray-300">Check timeline for next steps</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  <span className="text-gray-400">Await confirmation email</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 p-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Software Development Club. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            President: Heerath Bhat | Recruitment Status: Ongoing
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

