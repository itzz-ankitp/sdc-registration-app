import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref as dbRef, update as dbUpdate, get } from 'firebase/database';
import { updateProfile, updateEmail } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, realtimeDb } from '../firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, User, Mail, GraduationCap, Building, Phone, Save, Edit, X, Check } from 'lucide-react';
import sdcLogo from '../assets/sdc.png';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    contactNumber: ''
  });

  const departments = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'Other'
  ];

  const years = ['1', '2', '3', '4'];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadUserData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserData = async (uid) => {
    try {
      console.log('🔍 Loading user data for UID:', uid);
      
      // Get user data from Realtime Database
      const userRef = dbRef(realtimeDb, `users/${uid}`);
      console.log('🔍 Database path:', `users/${uid}`);
      
      const snapshot = await get(userRef);
      console.log('🔍 Snapshot exists:', snapshot.exists());
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log('🔍 User data found:', data);
        setUserData(data);
        setFormData({
          fullName: data.fullName || '',
          email: data.email || '',
          studentId: data.studentId || '',
          department: data.department || '',
          yearOfStudy: data.yearOfStudy?.toString() || '',
          contactNumber: data.contactNumber || ''
        });
      } else {
        console.log('❌ User data not found in database');
        console.log('🔍 Available data at users node:');
        
        // Try to get all users to see what's available
        try {
          const allUsersRef = dbRef(realtimeDb, 'users');
          const allUsersSnapshot = await get(allUsersRef);
          if (allUsersSnapshot.exists()) {
            const allUsers = allUsersSnapshot.val();
            console.log('🔍 All users in database:', Object.keys(allUsers));
          } else {
            console.log('🔍 No users node found in database');
          }
        } catch (err) {
          console.log('🔍 Could not check all users:', err);
        }
        
        setError('User data not found. Please contact support.');
      }
    } catch (err) {
      console.error('❌ Error loading user data:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
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
    return true;
  };

  const handleSave = async () => {
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setSaving(true);

    try {
      const updates = {
        fullName: formData.fullName,
        email: formData.email,
        studentId: formData.studentId,
        department: formData.department,
        yearOfStudy: parseInt(formData.yearOfStudy),
        contactNumber: formData.contactNumber,
        updatedAt: new Date().toISOString()
      };

      // Update Realtime Database (primary)
      await dbUpdate(dbRef(realtimeDb, `users/${user.uid}`), updates);

      // Update Firebase Auth profile if name changed
      if (formData.fullName !== user.displayName) {
        await updateProfile(user, {
          displayName: formData.fullName
        });
      }

      // Update Firebase Auth email if email changed
      if (formData.email !== user.email) {
        await updateEmail(user, formData.email);
      }

      setUserData(prev => ({ ...prev, ...updates }));
      setEditing(false);
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(null), 3000);

    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: userData?.fullName || '',
      email: userData?.email || '',
      studentId: userData?.studentId || '',
      department: userData?.department || '',
      yearOfStudy: userData?.yearOfStudy?.toString() || '',
      contactNumber: userData?.contactNumber || ''
    });
    setEditing(false);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-sdc-purple-mid)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your profile</h2>
          <Link to="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

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
              <h1 className="text-lg font-bold text-white">My Profile</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 sdc-text-gradient">
            Profile Settings
          </h2>
          <p className="text-lg text-gray-400">
            Update your personal information and account details
          </p>
        </div>

        <Card className="card-dark border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white flex items-center">
                  <User className="h-5 w-5 mr-2 text-[var(--color-sdc-purple-mid)]" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your profile details and contact information
                </CardDescription>
              </div>
              {!editing ? (
                <Button
                  onClick={() => setEditing(true)}
                  className="btn-secondary"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="btn-primary"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert className="mb-4 border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="mb-4 border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-400">{success}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-6">
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
                    disabled={!editing}
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
                      disabled={!editing}
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
                      disabled={!editing}
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
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => handleInputChange('department', value)}
                    disabled={!editing}
                  >
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
                  <Select 
                    value={formData.yearOfStudy} 
                    onValueChange={(value) => handleInputChange('yearOfStudy', value)}
                    disabled={!editing}
                  >
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
                    disabled={!editing}
                    required
                  />
                </div>
              </div>

              {/* Account Info */}
              <div className="pt-4 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-3">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Account Created</p>
                    <p className="text-white">
                      {userData?.createdAt ? 
                        (() => {
                          try {
                            const date = new Date(userData.createdAt);
                            return date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) + ' at ' + date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          } catch (e) {
                            return 'Invalid Date';
                          }
                        })() : 
                        'N/A'
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Last Updated</p>
                    <p className="text-white">
                      {userData?.updatedAt ? 
                        (() => {
                          try {
                            const date = new Date(userData.updatedAt);
                            return date.toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            }) + ' at ' + date.toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            });
                          } catch (e) {
                            return 'Invalid Date';
                          }
                        })() : 
                        'Never'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Profile; 