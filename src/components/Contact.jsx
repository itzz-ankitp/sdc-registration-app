import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, User, MessageSquare, Send, CheckCircle, Github, Menu, X } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';
import { ref, update, get } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';

const Contact = () => {
  const [state, handleSubmit] = useForm("xkgzwgaz");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formType, setFormType] = useState('project'); // 'project' or 'contact'
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projectSubmitted, setProjectSubmitted] = useState(false);

  // Load user data and check submission status
  useEffect(() => {
    const loadUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = ref(realtimeDb, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserData(data);
            
            // If user has already submitted, default to contact form
            if (data.githubLink) {
              setFormType('contact');
            }
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  // Remove custom validation - let Formspree handle it

  // Update Firebase when form is successfully submitted
  useEffect(() => {
    if (state.succeeded) {
      const user = auth.currentUser;
      // Get form data from the form submission
      const form = document.querySelector('form');
      if (form && user) {
        const formData = new FormData(form);
        const githubLink = formData.get('githubLink');
        
        if (githubLink && githubLink.trim()) {
          const updateFirebase = async () => {
            try {
              const userRef = ref(realtimeDb, `users/${user.uid}`);
              const liveUrl = formData.get('liveUrl');
              await update(userRef, {
                githubLink: githubLink.trim(),
                liveUrl: liveUrl && liveUrl.trim() ? liveUrl.trim() : null,
                projectDescription: formData.get('message') || '',
                submittedAt: new Date().toISOString(),
                submissionReviewed: false,
                graded: false
              });
              console.log('Firebase updated successfully');
              setProjectSubmitted(true);
            } catch (error) {
              console.error('Error updating database:', error);
            }
          };
          updateFirebase();
        }
      }
    }
  }, [state.succeeded]);

  const contactInfo = [
    {
      title: 'President',
      value: 'Heerath Bhat',
      icon: User
    },
    {
      title: 'Email',
      value: 'sdcmvjce@gmail.com',
      icon: Mail
    },
    {
      title: 'Recruitment Status',
      value: 'Currently Ongoing',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] relative overflow-hidden">
      {/* Background elements */}

      <div className="container mx-auto px-4 py-8 relative z-10">
      {/* Header */}
      <header className="relative z-10 p-4 md:p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Submit Project / Contact Us</h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-white">Submit Project</h1>
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
      <main className="relative z-10 max-w-6xl mx-auto p-4 md:p-6">
          {/* Submission Status Alert */}
          {(userData?.githubLink || projectSubmitted) && (
            <div className="mb-6">
              <Alert className="border-blue-500/50 bg-blue-500/10">
                <AlertDescription className="text-blue-400">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>You have already submitted your project. If you need to make changes or have questions, please use the Contact Us form below.</span>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {/* Form Type Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-lg p-1 flex">
              <button
                onClick={() => setFormType('project')}
                disabled={userData?.githubLink || projectSubmitted}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  formType === 'project'
                    ? 'bg-[var(--color-sdc-purple-mid)] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                } ${(userData?.githubLink || projectSubmitted) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Submit Project
              </button>
              <button
                onClick={() => setFormType('contact')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  formType === 'contact'
                    ? 'bg-[var(--color-sdc-purple-mid)] text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>

        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sdc-text-gradient">
              {formType === 'project' ? 'Submit Your Project' : 'Contact Us'}
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              {formType === 'project' 
                ? 'Submit your completed development track project with all necessary details.'
                : 'Get in touch with us for any questions or inquiries.'
              }
          </p>
        </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Form */}
            <Card className={`card-dark border-gray-800 transition-all duration-300 ${
              formType === 'project' ? 'lg:h-[700px]' : 'lg:h-[500px]'
            }`}>
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                  {formType === 'project' ? 'Submit Project Details' : 'Contact Form'}
              </CardTitle>
              <CardDescription className="text-gray-400">
                  {formType === 'project' 
                    ? 'Submit your completed project with GitHub link and project description.'
                    : 'Send us a message and we\'ll get back to you soon.'
                  }
              </CardDescription>
            </CardHeader>
            
              <CardContent className="flex flex-col h-full">
              {state.errors && state.errors.length > 0 && (
                <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">
                    Please check the form and try again.
                  </AlertDescription>
                </Alert>
              )}
              
              {state.succeeded && (
                <Alert className="mb-4 border-green-500/50 bg-green-500/10">
                  <AlertDescription className="text-green-400">
                    Thank you for your message! We have received your inquiry and will get back to you soon.
                  </AlertDescription>
                </Alert>
              )}

                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
                  {/* Name Field - Required for both forms */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`pl-10 input-field ${userData?.fullName ? 'bg-gray-700/50 text-gray-300' : ''}`}
                      value={userData?.fullName || ''}
                      disabled={!!userData?.fullName}
                      required
                    />
                  </div>
                  {userData?.fullName && (
                    <p className="text-xs text-gray-500">Pre-filled from your profile</p>
                  )}
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                    className="text-red-400 text-sm"
                  />
                </div>

                  {/* Email Field - Required for both forms */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email address"
                      className={`pl-10 input-field ${(userData?.email || user?.email) ? 'bg-gray-700/50 text-gray-300' : ''}`}
                      value={userData?.email || user?.email || ''}
                      disabled={!!(userData?.email || user?.email)}
                      required
                    />
                  </div>
                  {(userData?.email || user?.email) && (
                    <p className="text-xs text-gray-500">Pre-filled from your profile</p>
                  )}
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm"
                  />
                </div>

                  {/* Project-specific fields */}
                  {formType === 'project' && (
                    <>
                      {/* GitHub Link - Required for project submission */}
                <div className="space-y-2">
                  <label htmlFor="githubLink" className="text-sm font-medium text-gray-300">
                          GitHub Link *
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="githubLink"
                      name="githubLink"
                      type="url"
                      placeholder="https://github.com/your-repo"
                      className="pl-10 input-field"
                            required
                          />
                        </div>
                        <ValidationError 
                          prefix="GitHub Link" 
                          field="githubLink"
                          errors={state.errors}
                          className="text-red-400 text-sm"
                        />
                      </div>

                      {/* Live URL - Optional for project submission */}
                      <div className="space-y-2">
                        <label htmlFor="liveUrl" className="text-sm font-medium text-gray-300">
                          Live URL / Demo Link (Optional)
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="liveUrl"
                            name="liveUrl"
                            type="url"
                            placeholder="https://your-project-demo.com"
                            className="pl-10 input-field"
                    />
                  </div>
                </div>
                    </>
                  )}

                  {/* Message/Description Field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      {formType === 'project' ? 'Project Description *' : 'Message *'}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                      placeholder={formType === 'project' 
                        ? "Describe your project, technologies used, challenges faced, and key features..."
                        : "Your message (minimum 10 characters)..."
                      }
                    className="input-field min-h-[120px] resize-none"
                    required
                      minLength={formType === 'contact' ? 10 : undefined}
                  />
                  <ValidationError 
                      prefix={formType === 'project' ? "Project Description" : "Message"} 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm"
                  />
                    {formType === 'contact' && (
                      <p className="text-xs text-gray-500">Message must be at least 10 characters long.</p>
                    )}
                </div>

                {/* Hidden field for custom subject */}
                  <input type="hidden" name="_subject" value={formType === 'project' ? "SDC Project Submission" : "SDC Contact Form"} />

                  <div className="flex-1"></div>
                <Button
                  type="submit"
                  className="w-full btn-primary"
                    disabled={state.submitting || (formType === 'project' && (userData?.githubLink || projectSubmitted))}
                >
                  {state.submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                        {formType === 'project' && (userData?.githubLink || projectSubmitted) ? 'Project Submitted' : 
                         formType === 'project' ? 'Submit Project' : 'Send Message'}
                    </>
                  )}
                </Button>
              </form>
                )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-[var(--color-sdc-blue-bright)]" />
                  Contact Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Here's how you can reach us directly.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50">
                      <div className="flex-shrink-0">
                        <info.icon className="h-5 w-5 text-[var(--color-sdc-purple-mid)]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.title}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>



            <Card className="card-dark border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">FAQ</CardTitle>
                <CardDescription className="text-gray-400">
                  Quick answers to common questions:
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-white mb-1">When does recruitment close?</h4>
                    <p className="text-sm text-gray-400">Recruitment is ongoing throughout the semester.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Do I need programming experience?</h4>
                    <p className="text-sm text-gray-400">No! We welcome beginners and provide training.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Can I join multiple teams?</h4>
                    <p className="text-sm text-gray-400">Yes, you can contribute to multiple teams based on your interests.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-8 md:mt-12 p-4 md:p-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
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

export default Contact;

