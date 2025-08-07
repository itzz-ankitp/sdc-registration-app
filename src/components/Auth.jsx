import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref as dbRef, set as dbSet } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, Phone, GraduationCap, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Auth = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  
  // Login state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  
  // Register state
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Common state
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science Engineering',
    'Computer Science and Engineering (Data Science)',
    'Computer Science and Design',
    'Artificial Intelligence and Machine Learning',
    'Information Science Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Electronics and Communication Engineering-VLSI',
    'Electronics and Communication Engineering-Advanced Communication Technology',
    'Mechanical Engineering',
    'Civil Engineering',
  ];

  const years = ['1', '2', '3', '4'];

  // Login handlers
  const handleLoginInputChange = (field, value) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      // User will be redirected automatically by the auth state change
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginData.email) {
      setError('Please enter your email address first');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, loginData.email);
      setResetEmailSent(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Register handlers
  const handleRegisterInputChange = (field, value) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateRegisterForm = () => {
    if (!registerData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!registerData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!registerData.studentId.trim()) {
      setError('Student ID is required');
      return false;
    }
    if (!registerData.department) {
      setError('Department is required');
      return false;
    }
    if (!registerData.yearOfStudy) {
      setError('Year of study is required');
      return false;
    }
    if (!registerData.contactNumber.trim()) {
      setError('Contact number is required');
      return false;
    }
    if (!/^\d{10}$/.test(registerData.contactNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit contact number');
      return false;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!registerData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!validateRegisterForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        registerData.email, 
        registerData.password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: registerData.fullName
      });

      // Save additional user data to database
      const userData = {
        uid: userCredential.user.uid,
        fullName: registerData.fullName,
        email: registerData.email,
        studentId: registerData.studentId,
        department: registerData.department,
        yearOfStudy: registerData.yearOfStudy,
        contactNumber: registerData.contactNumber,
        createdAt: new Date().toISOString(),
        developmentTrack: null,
        githubLink: null,
        projectDescription: null,
        liveUrl: null,
        submittedAt: null,
        submissionReviewed: false,
        graded: false
      };

      await dbSet(dbRef(realtimeDb, `users/${userCredential.user.uid}`), userData);

      // User will be redirected automatically by the auth state change
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation handlers
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setError(null);
    setResetEmailSent(false);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setError(null);
    setResetEmailSent(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="card-dark border-white/20 bg-transparent transition-all duration-500 p-8 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col items-center justify-center overflow-hidden relative" style={{ minHeight: '500px' }}>
        {/* Sliding forms container */}
        <div className="relative w-full" style={{ minHeight: '500px' }}>
          {/* Sign In Form */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out will-change-transform will-change-opacity ${isSignUpActive ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`}
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center mb-4">
                <img src={sdcLogo} alt="SDC Logo" className="w-20 h-20 animate-pulse-glow" />
              </div>
              <div className="text-2xl font-bold sdc-text-gradient mb-1 text-center">Welcome Back</div>
              <div className="text-gray-400 mb-6 text-center">Sign in to your SDC account</div>
              {error && !isSignUpActive && (
                <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              {resetEmailSent && (
                <Alert className="mb-4 border-green-500/50 bg-green-500/10">
                  <AlertDescription className="text-green-400">
                    Password reset email sent! Check your inbox.
                  </AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-4 w-full max-w-md mx-auto pb-8">
                <div className="space-y-2">
                  <label htmlFor="login-email" className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => handleLoginInputChange('email', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="login-password" className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => handleLoginInputChange('password', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-transparent"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-purple-bright)] p-0 h-auto"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </Button>
                </div>
                <Button 
                  type="submit" 
                  className="w-full btn-primary" 
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-purple-bright)] p-0 h-auto font-medium"
                      onClick={handleSignUpClick}
                    >
                      Sign up here
                    </Button>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {/* Sign Up Form */}
          <div
            className={`absolute top-0 left-0 w-full transition-all duration-500 ease-in-out will-change-transform will-change-opacity ${isSignUpActive ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'} overflow-y-auto overflow-x-hidden max-h-[80vh] scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent`}
          >
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center mb-4">
                <img src={sdcLogo} alt="SDC Logo" className="w-20 h-20 animate-pulse-glow" />
              </div>
              <div className="text-2xl font-bold sdc-text-gradient mb-1 text-center">Create Account</div>
              <div className="text-gray-400 mb-6 text-center">Join SDC and start your journey</div>
              {error && isSignUpActive && (
                <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleRegisterSubmit} className="space-y-4 w-full max-w-md mx-auto pb-8">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-300">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.fullName}
                      onChange={(e) => handleRegisterInputChange('fullName', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-email" className="text-sm font-medium text-gray-300">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email address"
                      value={registerData.email}
                      onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="studentId" className="text-sm font-medium text-gray-300">Student ID *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="studentId"
                      type="text"
                      placeholder="Enter your student ID"
                      value={registerData.studentId}
                      onChange={(e) => handleRegisterInputChange('studentId', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium text-gray-300">Department *</label>
                    <Select 
                      value={registerData.department} 
                      onValueChange={(value) => handleRegisterInputChange('department', value)}
                    >
                      <SelectTrigger className="input-field w-full">
                        <Building className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent className="w-full max-w-[300px] max-h-48 overflow-y-auto left-0 scrollbar-thin scrollbar-thumb-[#232136] scrollbar-track-[#181825]">
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept} className="whitespace-normal break-words">
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="yearOfStudy" className="text-sm font-medium text-gray-300">Year of Study *</label>
                    <Select 
                      value={registerData.yearOfStudy} 
                      onValueChange={(value) => handleRegisterInputChange('yearOfStudy', value)}
                    >
                      <SelectTrigger className="input-field">
                        <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>Year {year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contactNumber" className="text-sm font-medium text-gray-300">Contact Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="contactNumber"
                      type="tel"
                      placeholder="Enter your contact number"
                      value={registerData.contactNumber}
                      onChange={(e) => handleRegisterInputChange('contactNumber', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="register-password" className="text-sm font-medium text-gray-300">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-transparent"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                      className="pl-10 input-field"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={registerData.agreeToTerms}
                    onCheckedChange={(checked) => handleRegisterInputChange('agreeToTerms', checked)}
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                    I agree to the{' '}
                    <a href="/terms" className="text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-purple-bright)] underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full btn-primary" 
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-400">
                    Already have an account?{' '}
                    <Button
                      type="button"
                      variant="link"
                      className="text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-purple-bright)] p-0 h-auto font-medium"
                      onClick={handleSignInClick}
                    >
                      Sign in here
                    </Button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
