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
import { ref, update } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';

const Contact = () => {
  // TODO: Replace this with your actual Formspree form ID
  // Go to https://formspree.io/forms/new to create a new form
  const [state, handleSubmit] = useForm("xrgjqjqj"); // Temporary test form ID
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    githubLink: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return false;
    }
    if (!formData.email.trim()) {
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return false;
    }
    if (!formData.message.trim()) {
      return false;
    }
    if (formData.message.trim().length < 10) {
      return false;
    }
    return true;
  };

  // Update Firebase when form is successfully submitted
  useEffect(() => {
    if (state.succeeded) {
      const user = auth.currentUser;
      if (user && formData.githubLink.trim()) {
        const updateFirebase = async () => {
          try {
            const userRef = ref(realtimeDb, `users/${user.uid}`);
            await update(userRef, {
              githubLink: formData.githubLink.trim(),
              projectDescription: formData.message.trim(),
              submittedAt: new Date().toISOString(),
              submissionReviewed: false,
              graded: false
            });
            console.log('Firebase updated successfully');
          } catch (error) {
            console.error('Error updating database:', error);
          }
        };
        updateFirebase();
      }
    }
  }, [state.succeeded, formData.githubLink, formData.message]);

  const contactInfo = [
    {
      title: 'President',
      value: 'Heerath Bhat',
      icon: User
    },
    {
      title: 'Email',
      value: 'sdc@university.edu',
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
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/10 via-transparent to-[var(--color-sdc-blue-bright)]/10"></div>
      <div className="absolute top-20 left-20 w-40 h-40 bg-[var(--color-sdc-purple-mid)]/5 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-[var(--color-sdc-blue-bright)]/5 rounded-full animate-float" style={{animationDelay: '2s'}}></div>

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
        {/* Title Section */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sdc-text-gradient">
            Submit Your Project
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Submit your completed development track project or get in touch with us for any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Contact Form */}
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                Submit Project Details
              </CardTitle>
              <CardDescription className="text-gray-400">
                Submit your completed project with GitHub link and brief description, or send us a message.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
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

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>

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
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                    className="text-red-400 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="githubLink" className="text-sm font-medium text-gray-300">
                    GitHub Link (Optional)
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="githubLink"
                      name="githubLink"
                      type="url"
                      placeholder="https://github.com/your-repo"
                      value={formData.githubLink}
                      onChange={(e) => handleInputChange('githubLink', e.target.value)}
                      className="pl-10 input-field"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Project Description / Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe your project, technologies used, challenges faced, or ask any questions..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-field min-h-[120px] resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {formData.message.length}/500 characters
                  </p>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm"
                  />
                </div>

                {/* Hidden field for custom subject */}
                <input type="hidden" name="_subject" value={`SDC Contact Form - ${formData.name}`} />

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
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
                <CardTitle className="text-white">Available Roles</CardTitle>
                <CardDescription className="text-gray-400">
                  We're currently recruiting for these positions:
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {['Tech Team Member', 'Design Team Member', 'Social Media Team Member', 'Content Team Member'].map((role, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">{role}</span>
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
  );
};

export default Contact;

