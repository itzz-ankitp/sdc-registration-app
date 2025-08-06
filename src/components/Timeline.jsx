import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, update, get } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, ArrowLeft, User, Mail, FileCheck, Users, Check, Menu, X } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Timeline = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load user data
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const markTaskAsDone = async () => {
    try {
      setUpdating(true);
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      await update(userRef, {
        taskCompleted: true,
        taskCompletedAt: new Date().toISOString()
      });

      // Update local state
      setUserData(prev => ({ ...prev, taskCompleted: true }));
    } catch (err) {
      console.error('Error marking task as done:', err);
    } finally {
      setUpdating(false);
    }
  };

  const timelineSteps = [
    {
      id: 1,
      title: 'Create Account',
      description: 'Sign up with your email and complete the registration form',
      icon: User,
      status: 'completed',
      link: null,
      details: 'Fill out your personal information, academic details, and create a secure password.'
    },
    {
      id: 2,
      title: 'Select Development Track',
      description: 'Choose your preferred development track (Android, Web, ML, or Game Dev)',
      icon: FileCheck,
      status: userData?.developmentTrack ? 'completed' : 'current',
      link: userData?.developmentTrack ? null : '/dashboard',
      details: 'Select from Android Development, Web Development, Machine Learning, or Game Development tracks.'
    },
    {
      id: 3,
      title: 'Complete Assigned Task',
      description: 'Work on your development track assignment and complete the project',
      icon: Mail,
      status: userData?.taskCompleted ? 'completed' : (userData?.developmentTrack ? 'current' : 'pending'),
      link: '/user-tasks',
      details: 'Follow the detailed requirements and guidelines for your selected development track.'
    },
    {
      id: 4,
      title: 'Submit Project Details',
      description: userData?.submissionReviewed && userData?.graded
        ? 'Project reviewed and graded! Results coming soon!' 
        : userData?.submissionReviewed && !userData?.graded
        ? 'Project reviewed! Grading in progress...'
        : userData?.githubLink && !userData?.submissionReviewed
          ? 'Your submission is under review.' 
        : 'Submit your project with GitHub link and brief description',
      icon: Users,
      status: userData?.submissionReviewed && userData?.graded
        ? 'completed' 
        : userData?.submissionReviewed || userData?.githubLink
          ? 'current' 
        : (userData?.taskCompleted ? 'current' : 'pending'),
      link: userData?.githubLink ? null : '/contact',
      details: userData?.submissionReviewed && userData?.graded
        ? 'Your project has been reviewed and graded successfully. Final results will be announced soon!'
        : userData?.submissionReviewed && !userData?.graded
        ? 'Your project has been reviewed by our team. Grading is currently in progress.'
        : userData?.githubLink && !userData?.submissionReviewed
        ? 'Your project submission is currently being reviewed by our team. This process may take a few days.'
        : 'Submit your completed project details, GitHub repository link, and project description via the form.'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-green-400" />;
      case 'current':
        return <Circle className="h-6 w-6 text-[var(--color-sdc-purple-mid)] animate-pulse" />;
      default:
        return <Circle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'border-green-400/50 bg-green-400/10';
      case 'current':
        return 'border-[var(--color-sdc-purple-mid)]/50 bg-[var(--color-sdc-purple-mid)]/10 animate-pulse-glow';
      default:
        return 'border-gray-600/50 bg-gray-600/10';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}

      <div className="container mx-auto px-4 py-8 relative z-10">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Registration Timeline</h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-white">Timeline</h1>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
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
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-4 md:p-6">
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sdc-text-gradient">
            Registration Process
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Follow these steps to complete your SDC registration and join our community of developers.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-6 md:space-y-8">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connecting line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-16 bg-gradient-to-b from-gray-600 to-gray-800"></div>
              )}
              
              <Card className={`card-dark ${getStatusColor(step.status)} transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Step Icon */}
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-700">
                        {getStatusIcon(step.status)}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white flex items-center">
                          <step.icon className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                          Step {step.id}: {step.title}
                        </h3>
                        {step.status === 'completed' && (
                          <span className="text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                        {step.status === 'current' && (
                          <span className="text-xs bg-[var(--color-sdc-purple-mid)]/20 text-[var(--color-sdc-purple-mid)] px-2 py-1 rounded-full animate-pulse">
                            Current Step
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-3">{step.description}</p>
                      <p className="text-sm text-gray-400 mb-4">{step.details}</p>
                      
                      {/* Only show default Go to Step for steps other than 3 */}
                      {step.link && step.id !== 3 && (
                        <Link to={step.link}>
                          <Button 
                            size="sm" 
                            className="btn-primary"
                            disabled={step.status === 'completed'}
                          >
                            {step.status === 'completed' ? 'Completed' : 'Go to Step'}
                          </Button>
                        </Link>
                      )}
                      
                      {/* Show completed status for steps when no link (already completed) */}
                      {!step.link && step.status === 'completed' && (
                        <div className="flex items-center space-x-2 text-sm text-green-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>
                            {step.id === 1 ? 'Account Created' :
                             step.id === 2 ? 'Track Selected' :
                             step.id === 4 ? 'Project Submitted' : 'Completed'}
                          </span>
                        </div>
                      )}
                      
                      {/* Mark as Done button for task completion step */}
                      {step.id === 3 && step.status === 'current' && userData?.developmentTrack && (
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                          <Link to={step.link}>
                            <Button 
                              size="sm" 
                              className="w-full sm:w-auto btn-primary"
                            >
                              Go to Task
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto border-green-500 text-green-400 hover:bg-green-500/10"
                            onClick={markTaskAsDone}
                            disabled={updating}
                          >
                            {updating ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400 mr-2"></div>
                                Marking...
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Done
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                      
                      {step.status === 'current' && !step.link && step.id !== 3 && (
                        <div className="flex items-center space-x-2 text-sm text-[var(--color-sdc-purple-mid)]">
                          <Circle className="h-4 w-4 animate-spin" />
                          <span>In Progress - Check your email</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <Card className="card-dark border-gray-800 mt-8 md:mt-12">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
              What's Next?
            </CardTitle>
            <CardDescription className="text-gray-400">
              After completing your registration, here's what you can expect:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Immediate Access</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Discord server invitation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Welcome email with resources</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>Access to member-only events</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Upcoming Opportunities</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Circle className="h-4 w-4 text-[var(--color-sdc-purple-mid)]" />
                    <span>Weekly coding workshops</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Circle className="h-4 w-4 text-[var(--color-sdc-purple-mid)]" />
                    <span>Monthly hackathons</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Circle className="h-4 w-4 text-[var(--color-sdc-purple-mid)]" />
                    <span>Project collaboration opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 md:mt-12 p-4 md:p-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Software Development Club. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            President: Heerath Bhat | Recruitment Status: Ongoing
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Timeline;

