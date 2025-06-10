import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, ArrowLeft, User, Mail, FileCheck, Users } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Timeline = () => {
  const timelineSteps = [
    {
      id: 1,
      title: 'Create Account',
      description: 'Sign up with your email and complete the registration form',
      icon: User,
      status: 'completed',
      link: '/register',
      details: 'Fill out your personal information, academic details, and create a secure password.'
    },
    {
      id: 2,
      title: 'Fill Registration Form',
      description: 'Complete your detailed registration with academic information',
      icon: FileCheck,
      status: 'completed',
      link: '/register',
      details: 'Provide your student ID, department, year of study, and contact information.'
    },
    {
      id: 3,
      title: 'Email Verification',
      description: 'Check your email for verification and confirmation',
      icon: Mail,
      status: 'current',
      link: null,
      details: 'We will send you a confirmation email with further instructions and next steps.'
    },
    {
      id: 4,
      title: 'Confirmation & Welcome',
      description: 'Receive welcome message and join our community',
      icon: Users,
      status: 'pending',
      link: null,
      details: 'Get access to our Discord server, upcoming events, and start your SDC journey!'
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
      <div className="absolute top-40 right-40 w-32 h-32 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
      <div className="absolute bottom-40 left-40 w-24 h-24 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '3s'}}></div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-white">Registration Timeline</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 sdc-text-gradient">
            Registration Process
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Follow these steps to complete your SDC registration and join our community of developers.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
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
                      
                      {step.link && (
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
                      
                      {step.status === 'current' && !step.link && (
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
        <Card className="card-dark border-gray-800 mt-12">
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
    </div>
  );
};

export default Timeline;

