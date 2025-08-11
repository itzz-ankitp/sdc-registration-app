import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Send, Bot, X, Minimize2, Maximize2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm SDC Assistant 🤖. I can help you with information about Software Development Club recruitment, available roles, application workflow, and general inquiries. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // SDC Application Knowledge Base
  const sdcKnowledge = {
    club: {
      name: "Software Development Club (SDC)",
      president: "Heerath Bhat",
      status: "Recruitment Ongoing",
      focus: "Software development, programming, and technology education",
      welcome: "Students from all departments and years"
    },
    roles: {
      tech: "Tech Team Member - Development, coding, technical projects",
      design: "Design Team Member - UI/UX, graphics, visual design",
      social: "Social Media Team Member - Content creation, social media management",
      content: "Content Team Member - Writing, documentation, communication"
    },
    activities: [
      "Regular workshops and coding sessions",
      "Monthly hackathons and innovation challenges",
      "Coding competitions and skill showcases",
      "Startup incubation and project development",
      "Regional and national level competitions"
    ],
    workflow: {
      registration: "1. Create account with student details\n2. Select development track (Android/Web/ML/Game Dev)\n3. Complete assigned tasks for chosen track\n4. Submit GitHub project link and description\n5. Track progress through timeline",
      tracks: {
        android: "Android Development - Mobile app development using Android Studio, Kotlin/Java",
        web: "Web Development - Full-stack web applications using React, Node.js, Firebase",
        ml: "Machine Learning - AI/ML projects, data analysis, model development",
        game: "Game Development - Game creation using Unity, Pygame, or other frameworks"
      },
      tasks: "Each track has specific requirements including registration form, backend integration, timeline section, and project submission"
    },
    features: {
      dashboard: "User dashboard with progress tracking and profile management",
      timeline: "Visual timeline showing registration progress and milestones",
      admin: "Admin dashboard for user management and submission review",
      contact: "Contact form for inquiries and support"
    },
    submission: {
      limit: "Users can submit their project ONLY ONCE per account",
      trackLock: "Track selection becomes LOCKED after project submission and cannot be changed",
      requirements: "Project submission requires:\n• GitHub repository link\n• Project description\n• Optional live demo URL",
      changes: "After submission, users cannot modify their project details. For changes or questions, use the Contact Us form",
      review: "All submissions are reviewed by admin team and marked as reviewed/graded"
    },
    currentStats: {
      totalUsers: "Multiple users registered across different tracks",
      trackDistribution: "Users distributed across Android, Web, ML, and Game Development tracks",
      submissionStatus: "Submissions are being reviewed and graded by admin team"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Local AI Response Generator
  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Registration and workflow queries
    if (message.includes('register') || message.includes('sign up') || message.includes('join')) {
      return `To register for SDC:\n\n${sdcKnowledge.workflow.registration}\n\nYou can start by clicking the "Get Started" button on the homepage or visiting the registration page. The process is simple and takes just a few minutes!`;
    }
    
    if (message.includes('track') || message.includes('development') || message.includes('android') || message.includes('web') || message.includes('ml') || message.includes('game')) {
      return `SDC offers 4 development tracks:\n\n${Object.entries(sdcKnowledge.workflow.tracks).map(([key, value]) => `• ${key.toUpperCase()}: ${value}`).join('\n')}\n\nEach track has specific tasks and requirements. You can choose the one that best matches your interests and skills!`;
    }
    
    if (message.includes('task') || message.includes('requirement') || message.includes('project')) {
      return `Each development track has specific requirements:\n\n• Registration Form: Clean and functional form\n• Backend Integration: Working backend (Node.js, Firebase, etc.)\n• Timeline Section: Progress tracking timeline\n• Project Submission: GitHub link and live demo\n\nTasks vary by track - check the Tasks page for detailed requirements!`;
    }
    
    if (message.includes('role') || message.includes('position') || message.includes('team')) {
      return `SDC has 4 main team roles:\n\n${Object.entries(sdcKnowledge.roles).map(([key, value]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`).join('\n')}\n\nAll roles are currently open for recruitment. You can apply for multiple roles based on your interests!`;
    }
    
    if (message.includes('workflow') || message.includes('process') || message.includes('how to')) {
      return `Here's the complete SDC application workflow:\n\n${sdcKnowledge.workflow.registration}\n\nAfter registration, you'll have access to:\n• Dashboard: Track your progress\n• Timeline: View milestones\n• Tasks: Complete track-specific requirements\n• Profile: Manage your information\n\nNeed help with any step?`;
    }
    
    if (message.includes('president') || message.includes('leader') || message.includes('contact')) {
      return `SDC President: ${sdcKnowledge.club.president}\n\nFor general inquiries, you can:\n• Use this chatbot for quick questions\n• Fill out the Contact Us form\n• Email: sdcmvjce@gmail.com\n\nWe're here to help!`;
    }
    
    if (message.includes('hackathon') || message.includes('workshop') || message.includes('event')) {
      return `SDC conducts various activities:\n\n${sdcKnowledge.activities.map(activity => `• ${activity}`).join('\n')}\n\nThese events help members develop skills, network with peers, and showcase their talents. Regular participation is encouraged!`;
    }
    
    if (message.includes('dashboard') || message.includes('profile') || message.includes('timeline')) {
      return `The SDC app includes several key features:\n\n${Object.entries(sdcKnowledge.features).map(([key, value]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`).join('\n')}\n\nAfter logging in, you'll have access to all these features to manage your SDC journey!`;
    }
    
    if (message.includes('deadline') || message.includes('when') || message.includes('time')) {
      return `SDC recruitment is currently ongoing with no strict deadline. However, we recommend completing your application and tasks as soon as possible to:\n\n• Secure your preferred role\n• Have time for project development\n• Participate in upcoming events\n• Get early feedback on your work`;
    }
    
    if (message.includes('submit') || message.includes('submission') || message.includes('github')) {
      return `Project Submission Rules:\n\n${sdcKnowledge.submission.limit}\n${sdcKnowledge.submission.trackLock}\n\n${sdcKnowledge.submission.requirements}\n\n${sdcKnowledge.submission.changes}\n\n${sdcKnowledge.submission.review}`;
    }
    
    if (message.includes('change track') || message.includes('switch track') || message.includes('track change')) {
      return `Track Change Policy:\n\n${sdcKnowledge.submission.trackLock}\n\nThis means:\n• Choose your track carefully before submission\n• You can change tracks multiple times BEFORE submitting\n• Once you submit your project, your track is permanently locked\n• For questions about track selection, ask before submitting!`;
    }
    
    if (message.includes('how many') || message.includes('times') || message.includes('limit')) {
      return `Submission Limits:\n\n${sdcKnowledge.submission.limit}\n\nKey Points:\n• One project submission per user account\n• Track selection locked after submission\n• No modifications allowed after submission\n• Contact form available for questions/changes\n• All submissions reviewed by admin team`;
    }
    
    if (message.includes('statistics') || message.includes('stats') || message.includes('numbers') || message.includes('how many users')) {
      return `Current SDC Statistics:\n\n${sdcKnowledge.currentStats.totalUsers}\n${sdcKnowledge.currentStats.trackDistribution}\n${sdcKnowledge.currentStats.submissionStatus}\n\nNote: Exact numbers are managed through the admin dashboard and updated regularly.`;
    }
    
    if (message.includes('help') || message.includes('support') || message.includes('assist')) {
      return `I'm here to help! I can assist with:\n\n• Registration process and workflow\n• Development track information\n• Task requirements and submission\n• Club activities and events\n• Role descriptions and responsibilities\n• Submission rules and limits\n• Track change policies\n• General SDC information\n\nWhat specific information do you need?`;
    }
    
    // Default response for unrecognized queries
    return `I understand you're asking about "${userMessage}". While I'm specifically trained on SDC recruitment and application processes, I can help you with:\n\n• Registration workflow and requirements\n• Development track selection\n• Task completion guidelines\n• Project submission rules and limits\n• Track change policies\n• Club activities and roles\n• General SDC information\n\nFor specific technical questions or complex inquiries, please use the Contact Us form, and our team will get back to you within 24-48 hours.`;
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate API delay for better UX
    setTimeout(() => {
      const botResponse = generateResponse(inputMessage.trim());
      
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-14 h-14 md:w-16 md:h-16 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <Bot className="w-6 h-6 md:w-8 md:h-8" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Card className={`${isMinimized ? 'w-72 h-20' : 'w-72 h-80 md:w-80 md:h-96'} bg-black/20 backdrop-blur-sm border border-white/10 shadow-2xl transition-all duration-300`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 md:p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm md:text-base">SDC Assistant</h3>
              <p className="text-white/80 text-xs">AI-powered help</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 p-1.5 md:p-2 h-8 w-8 md:h-9 md:w-9"
              title={isMinimized ? "Expand" : "Minimize"}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Minimize2 className="w-3.5 h-3.5 md:w-4 md:h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1.5 md:p-2 h-8 w-8 md:h-9 md:w-9"
              title="Close"
            >
              <X className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Minimized State - Show quick actions */}
        {isMinimized && (
          <div className="p-3 md:p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-300 text-sm mb-2">Chatbot minimized</p>
              <Button
                onClick={() => setIsMinimized(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1.5"
              >
                <Maximize2 className="w-3 h-3 mr-1" />
                Expand
              </Button>
            </div>
          </div>
        )}

        {/* Expanded State - Show full chat interface */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-3 md:p-4 space-y-2 md:space-y-3 max-h-48 md:max-h-64 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] md:max-w-[80%] p-2.5 md:p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-gray-200 border border-white/20'
                    }`}
                  >
                    <p className="text-xs md:text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1.5 md:mt-1">
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-gray-200 border border-white/20 p-2.5 md:p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 md:p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about SDC registration, tracks, tasks..."
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 text-xs md:text-sm h-9 md:h-10"
                  disabled={isLoading}
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-2.5 md:px-3 h-9 md:h-10 min-w-[40px] md:min-w-[44px]"
                >
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Chatbot;

