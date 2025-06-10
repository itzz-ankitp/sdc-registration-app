import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Mail, Lock, Phone, GraduationCap, Building } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Register = () => {
  const [formData, setFormData] = useState({
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const departments = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Electrical Engineering',
    'Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Other'
  ];

  const years = ['1', '2', '3', '4', '5+'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.studentId.trim()) {
      setError('Student ID is required');
      return false;
    }
    if (!formData.department) {
      setError('Department is required');
      return false;
    }
    if (!formData.yearOfStudy) {
      setError('Year of study is required');
      return false;
    }
    if (!formData.contactNumber.trim()) {
      setError('Contact number is required');
      return false;
    }
    if (!/^\d{10}$/.test(formData.contactNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit contact number');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: formData.fullName
      });

      // Save additional user data to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        studentId: formData.studentId,
        department: formData.department,
        yearOfStudy: parseInt(formData.yearOfStudy),
        contactNumber: formData.contactNumber,
        createdAt: new Date(),
        registrationComplete: true
      });

      // User will be redirected automatically by the auth state change
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-sdc-purple-dark)]/20 via-transparent to-[var(--color-sdc-blue-bright)]/20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-[var(--color-sdc-purple-mid)]/10 rounded-full animate-float"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-[var(--color-sdc-blue-bright)]/10 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
      
      <Card className="w-full max-w-2xl relative z-10 card-dark border-gray-800 my-8">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={sdcLogo} alt="SDC Logo" className="w-20 h-20 animate-pulse-glow" />
          </div>
          <CardTitle className="text-2xl font-bold sdc-text-gradient">
            Join the Software Development Club
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-300">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="pl-10 input-field"
                  required
                />
              </div>
            </div>

            {/* Email and Student ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 input-field"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="studentId" className="text-sm font-medium text-gray-300">
                  Student ID *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="studentId"
                    type="text"
                    placeholder="Enter your student ID"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    className="pl-10 input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Department and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="department" className="text-sm font-medium text-gray-300">
                  Department *
                </label>
                <Select onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger className="input-field">
                    <Building className="h-4 w-4 text-gray-400 mr-2" />
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="yearOfStudy" className="text-sm font-medium text-gray-300">
                  Year of Study *
                </label>
                <Select onValueChange={(value) => handleInputChange('yearOfStudy', value)}>
                  <SelectTrigger className="input-field">
                    <GraduationCap className="h-4 w-4 text-gray-400 mr-2" />
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contact Number */}
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="text-sm font-medium text-gray-300">
                Contact Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="contactNumber"
                  type="tel"
                  placeholder="Enter your contact number"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  className="pl-10 input-field"
                  required
                />
              </div>
            </div>

            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 input-field"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 input-field"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                I agree to the{' '}
                <a href="#" className="text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-blue-bright)] transition-colors">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[var(--color-sdc-purple-mid)] hover:text-[var(--color-sdc-blue-bright)] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;

