import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('web');
  const navigate = useNavigate();

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
      techStack: ['React/Vue/Angular', 'Node.js/Firebase', 'HTML/CSS/JavaScript', 'Git']
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
      techStack: ['Kotlin/Java', 'Android Studio', 'Firebase/API', 'Git']
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
      techStack: ['Python', 'TensorFlow/PyTorch', 'Flask/FastAPI', 'Docker']
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
      techStack: ['Unity/Unreal', 'Pygame', 'JavaScript/HTML5', 'Git']
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

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </button>
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Code className="h-8 w-8 text-[var(--color-sdc-purple-mid)] mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Development Tasks
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Choose your development track and complete the assigned task. Each task is designed to showcase your skills and contribute to the SDC community.
          </p>
        </div>

        {/* Task Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border border-gray-700">
            {Object.entries(tasks).map(([key, task]) => {
              const TaskIcon = task.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="data-[state=active]:bg-[var(--color-sdc-purple-mid)] data-[state=active]:text-white"
                >
                  <TaskIcon className="h-4 w-4 mr-2" />
                  {task.title.split(' ')[0]}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(tasks).map(([key, task]) => {
            const TaskIcon = task.icon;
            return (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Task Overview */}
                  <div className="lg:col-span-2">
                    <Card className="card-dark border-gray-800">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${task.color} flex items-center justify-center`}>
                            <TaskIcon className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-white text-2xl">{task.title}</CardTitle>
                            <CardDescription className="text-gray-400 text-lg">
                              {task.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        {/* Requirements */}
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                            Requirements
                          </h3>
                          <div className="space-y-3">
                            {task.requirements.map((req, index) => {
                              const ReqIcon = req.icon;
                              return (
                                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                                  <ReqIcon className="h-5 w-5 text-[var(--color-sdc-purple-mid)] mt-0.5" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-medium text-white">{req.title}</h4>
                                      <Badge className={getStatusColor(req.status)}>
                                        {req.status}
                                      </Badge>
                                    </div>
                                    <p className="text-gray-400 text-sm">{req.description}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Guidelines */}
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <Settings className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                            Guidelines
                          </h3>
                          <ul className="space-y-2">
                            {task.guidelines.map((guideline, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-[var(--color-sdc-blue-bright)] rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-300">{guideline}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Tech Stack & Info */}
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
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};

export default Tasks; 