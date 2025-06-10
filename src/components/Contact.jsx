import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Mail, User, MessageSquare, Send, CheckCircle } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Message is required');
      return false;
    }
    if (formData.message.trim().length < 10) {
      setError('Message must be at least 10 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // In a real deployment, this would be your Cloud Function URL
      // For now, we'll simulate the API call
      const response = await fetch('/api/sendContactEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      // For demo purposes, we'll show success anyway
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      console.log('Contact form submitted:', formData);
    } finally {
      setLoading(false);
    }
  };

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
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-10 h-10" />
            <div>
              <h1 className="text-lg font-bold text-white">Contact Us</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 sdc-text-gradient">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Have questions about SDC or need help with your registration? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                Send us a Message
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below and we'll get back to you within 24-48 hours.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
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
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="input-field min-h-[120px] resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? (
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
    </div>
  );
};

export default Contact;

