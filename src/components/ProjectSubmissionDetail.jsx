import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Github, 
  Globe, 
  Code, 
  Calendar, 
  Clock,
  MessageSquare,
  FileText,
  ExternalLink
} from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const ProjectSubmissionDetail = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!uid) {
          setError('User ID is required');
          return;
        }

        const userRef = ref(realtimeDb, `users/${uid}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({ uid, ...data });
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [uid]);

  const getTrackInfo = (trackValue) => {
    const tracks = {
      'android': { label: 'Android Development', color: 'bg-green-500/20 text-green-400' },
      'web': { label: 'Web Development', color: 'bg-blue-500/20 text-blue-400' },
      'ml': { label: 'Machine Learning', color: 'bg-purple-500/20 text-purple-400' },
      'game': { label: 'Game Development', color: 'bg-orange-500/20 text-orange-400' }
    };
    return tracks[trackValue] || { label: trackValue || 'Not selected', color: 'bg-gray-500/20 text-gray-400' };
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link to="/admin-dashboard">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!userData?.githubLink) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Alert className="border-yellow-500/50 bg-yellow-500/10">
            <AlertDescription className="text-yellow-400">
              This user has not submitted a project yet.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Link to="/admin-dashboard">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const trackInfo = getTrackInfo(userData.developmentTrack);

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/admin-dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Admin Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Project Submission Details</h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-white">Submission Details</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-4 md:p-6">
        {/* User Info Card */}
        <Card className="card-dark border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-white font-medium">{userData.fullName || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{userData.email || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Development Track</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${trackInfo.color}`}>
                      {trackInfo.label}
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Submitted At</p>
                    <p className="text-white font-medium">{formatDate(userData.submittedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        userData.submissionReviewed && userData.graded ? 'bg-green-500/20 text-green-400' :
                        userData.submissionReviewed ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {userData.submissionReviewed && userData.graded ? 'Reviewed & Graded' :
                         userData.submissionReviewed ? 'Reviewed' : 'Under Review'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Links Card */}
        <Card className="card-dark border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Code className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
              Project Links
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Github className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">GitHub Repository</p>
                  <a 
                    href={userData.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 underline flex items-center space-x-1"
                  >
                    <span>{userData.githubLink}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="h-4 w-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400">Live Demo</p>
                  {userData.liveUrl ? (
                    <a 
                      href={userData.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline flex items-center space-x-1"
                    >
                      <span>{userData.liveUrl}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-gray-500">Not provided</span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Description Card */}
        <Card className="card-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
              Project Description
            </CardTitle>
            <CardDescription className="text-gray-400">
              Detailed description of the project, technologies used, and key features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-300 whitespace-pre-wrap">
                {userData.projectDescription || 'No project description provided.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectSubmissionDetail; 