import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, realtimeDb } from '../firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Smartphone, 
  Brain, 
  Gamepad2, 
  Code, 
  Database, 
  ListOrdered, 
  CheckCircle, 
  Clock,
  FileText,
  Settings,
  Users,
  ArrowLeft,
  ExternalLink,
  BookOpen
} from 'lucide-react';

const UserTasks = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await loadUserData(currentUser.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid) => {
    try {
      const userRef = ref(realtimeDb, `users/${uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
      }
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const tasks = {
    web: {
      title: 'Web Development Task',
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
      description: 'Build a web app for SDC to collect registration forms',
      requirements: [
        {
          title: 'Registration Form',
          description: 'A clean and functional registration form',
          icon: FileText,
          status: 'required'
        },
        {
          title: 'Backend Integration',
          description: 'A working backend (Node.js, Firebase, or your preferred choice)',
          icon: Database,
          status: 'required'
        },
        {
          title: 'Timeline Section',
          description: 'A timeline section showing the steps/process of registration',
          icon: ListOrdered,
          status: 'required'
        }
      ],
      guidelines: [
        'Use modern web technologies (React, Vue, Angular, etc.)',
        'Ensure responsive design for mobile and desktop',
        'Implement proper form validation',
        'Include error handling and user feedback',
        'Follow SDC design guidelines and branding',
        'Deploy to a hosting platform (Vercel, Netlify, etc.)'
      ],
      techStack: ['React/Vue/Angular', 'Node.js/Firebase', 'HTML/CSS/JavaScript', 'Git'],
      resources: [
        { name: 'React Documentation', url: 'https://react.dev/' },
        { name: 'Firebase Documentation', url: 'https://firebase.google.com/docs' },
        { name: 'Vercel Deployment', url: 'https://vercel.com/docs' }
      ]
    },
    android: {
      title: 'Android Development Task',
      icon: Smartphone,
      color: 'from-green-500 to-green-600',
      description: 'Develop an Android app for SDC to accept registrations',
      requirements: [
        {
          title: 'Registration Form',
          description: 'A user-friendly registration form',
          icon: FileText,
          status: 'required'
        },
        {
          title: 'Backend Integration',
          description: 'Backend integration to store form data',
          icon: Database,
          status: 'required'
        },
        {
          title: 'Timeline Section',
          description: 'A timeline section explaining stages of registration',
          icon: ListOrdered,
          status: 'required'
        }
      ],
      guidelines: [
        'Use modern Android development practices',
        'Implement Material Design principles',
        'Ensure compatibility with different Android versions',
        'Include proper error handling and user feedback',
        'Follow Android development best practices',
        'Test on multiple device sizes and orientations'
      ],
      techStack: ['Kotlin/Java', 'Android Studio', 'Firebase/API', 'Git'],
      resources: [
        { name: 'Android Developer Guide', url: 'https://developer.android.com/guide' },
        { name: 'Material Design', url: 'https://material.io/design' },
        { name: 'Firebase for Android', url: 'https://firebase.google.com/docs/android' }
      ]
    },
    ml: {
      title: 'Machine Learning Task',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      description: 'Develop an ML-powered application for SDC',
      requirements: [
        {
          title: 'Registration Form',
          description: 'A user-friendly registration form with ML features',
          icon: FileText,
          status: 'required'
        },
        {
          title: 'Backend Integration',
          description: 'Backend integration with ML model deployment',
          icon: Database,
          status: 'required'
        },
        {
          title: 'Timeline Section',
          description: 'A timeline section explaining ML pipeline stages',
          icon: ListOrdered,
          status: 'required'
        }
      ],
      guidelines: [
        'Implement ML features (recommendations, predictions, etc.)',
        'Use popular ML frameworks (TensorFlow, PyTorch, scikit-learn)',
        'Include data preprocessing and model training',
        'Deploy ML model to cloud platform',
        'Implement proper error handling and validation',
        'Document your ML pipeline and methodology'
      ],
      techStack: ['Python', 'TensorFlow/PyTorch', 'Flask/FastAPI', 'Docker'],
      resources: [
        { name: 'TensorFlow Tutorials', url: 'https://www.tensorflow.org/tutorials' },
        { name: 'PyTorch Documentation', url: 'https://pytorch.org/docs/' },
        { name: 'FastAPI Guide', url: 'https://fastapi.tiangolo.com/' }
      ]
    },
    game: {
      title: 'Game Development Task',
      icon: Gamepad2,
      color: 'from-orange-500 to-orange-600',
      description: 'Build a fun interactive game for SDC',
      requirements: [
        {
          title: 'Game Concept',
          description: 'Choose from: Tic Tac Toe, Ping Pong, or your own idea',
          icon: Gamepad2,
          status: 'required'
        },
        {
          title: 'Interactive Features',
          description: 'Implement core game mechanics and user interaction',
          icon: Settings,
          status: 'required'
        },
        {
          title: 'SDC Integration',
          description: 'Include SDC branding and follow guidelines',
          icon: Users,
          status: 'required'
        }
      ],
      guidelines: [
        'Use any framework you\'re comfortable with (Pygame, Unity, JavaScript, etc.)',
        'Ensure smooth gameplay and responsive controls',
        'Include proper game states (menu, playing, game over)',
        'Implement score tracking or progress system',
        'Follow SDC design guidelines and branding',
        'Make it engaging and fun to play'
      ],
      techStack: ['Unity/Unreal', 'Pygame', 'JavaScript/HTML5', 'Git'],
      resources: [
        { name: 'Unity Learn', url: 'https://learn.unity.com/' },
        { name: 'Pygame Documentation', url: 'https://www.pygame.org/docs/' },
        { name: 'HTML5 Game Dev', url: 'https://developer.mozilla.org/en-US/docs/Games' }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'required':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'optional':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
      </div>
    );
  }

  const userTrack = userData?.developmentTrack;
  const task = tasks[userTrack];

  if (!userTrack || !task) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto p-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Code className="h-8 w-8 text-[var(--color-sdc-purple-mid)] mr-3" />
              <h1 className="text-3xl font-bold text-white">No Task Assigned</h1>
            </div>
            <p className="text-lg text-gray-400 mb-8">
              Please select a development track in your dashboard to view your assigned task.
            </p>
            <Link to="/dashboard">
              <Button className="btn-primary">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const TaskIcon = task.icon;

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${task.color} flex items-center justify-center mr-4`}>
                <TaskIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">{task.title}</h1>
                <p className="text-lg text-gray-400">Your Assigned Development Task</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Task Overview */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white text-xl">Task Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">{task.description}</p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {task.requirements.map((req, index) => {
                    const ReqIcon = req.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg">
                        <ReqIcon className="h-5 w-5 text-[var(--color-sdc-purple-mid)] mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{req.title}</h4>
                            <Badge className={getStatusColor(req.status)}>
                              {req.status}
                            </Badge>
                          </div>
                          <p className="text-gray-400">{req.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                  Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {task.guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[var(--color-sdc-blue-bright)] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {task.techStack.map((tech, index) => (
                    <Badge key={index} className="bg-[var(--color-sdc-purple-mid)]/20 text-[var(--color-sdc-purple-mid)] border-[var(--color-sdc-purple-mid)]/30">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Task Status */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                  Task Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      Active
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Deadline:</span>
                    <span className="text-white">Flexible</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Difficulty:</span>
                    <span className="text-white">Intermediate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                  Learning Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {task.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 bg-gray-800/50 rounded hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="text-gray-300 text-sm">{resource.name}</span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submission Info */}
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-green-400" />
                  Submission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  Submit your completed task to the SDC team for review.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Source code repository</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Live demo or screenshots</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">Documentation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTasks; 