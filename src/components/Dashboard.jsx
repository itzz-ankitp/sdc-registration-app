import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Clock, User, Calendar, MessageCircle, Users } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Dashboard = ({ user }) => {
  const [greeting, setGreeting] = useState('');
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const quickActions = [
    {
      title: 'My Profile',
      description: 'View and edit your profile details',
      icon: User,
      link: '/profile',
      color: 'from-[var(--color-sdc-purple-dark)] to-[var(--color-sdc-purple-mid)]'
    },
    {
      title: 'Registration Timeline',
      description: 'View the registration process steps',
      icon: Calendar,
      link: '/timeline',
      color: 'from-[var(--color-sdc-purple-mid)] to-[var(--color-sdc-purple-bright)]'
    },
    {
      title: 'Contact Us',
      description: 'Get in touch with the SDC team',
      icon: MessageCircle,
      link: '/contact',
      color: 'from-[var(--color-sdc-purple-bright)] to-[var(--color-sdc-blue-bright)]'
    },
    {
      title: 'About SDC',
      description: 'Learn more about our club',
      icon: Users,
      link: '/about',
      color: 'from-[var(--color-sdc-blue-bright)] to-[var(--color-sdc-purple-mid)]'
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

