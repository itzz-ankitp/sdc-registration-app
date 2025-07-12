import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { auth, realtimeDb } from '../firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DataRecovery = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const checkUserData = async () => {
    if (!user) {
      setError('Please log in first');
      return;
    }

    setStatus('Checking user data...');
    setError('');
    setSuccess('');

    try {
      // Check if user data exists in Realtime Database
      const userRef = ref(realtimeDb, `users/${user.uid}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUserData(data);
        setSuccess('✅ User data found in Realtime Database');
        console.log('User data:', data);
      } else {
        setUserData(null);
        setError('❌ User data not found in Realtime Database');
        
        // Check what's in the users node
        const allUsersRef = ref(realtimeDb, 'users');
        const allUsersSnapshot = await get(allUsersRef);
        
        if (allUsersSnapshot.exists()) {
          const allUsers = allUsersSnapshot.val();
          console.log('All users in database:', allUsers);
          setStatus(`Found ${Object.keys(allUsers).length} users in database, but not your data`);
        } else {
          setStatus('No users node found in database');
        }
      }
    } catch (err) {
      setError(`Error checking data: ${err.message}`);
    }
  };

  const createUserData = async () => {
    if (!user) {
      setError('Please log in first');
      return;
    }

    setStatus('Creating user data...');
    setError('');
    setSuccess('');

    try {
      const userData = {
        fullName: user.displayName || 'Unknown',
        email: user.email || '',
        studentId: 'Not Set',
        department: 'Not Set',
        yearOfStudy: 1,
        contactNumber: 'Not Set',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        registrationComplete: false
      };

      await set(ref(realtimeDb, `users/${user.uid}`), userData);
      setSuccess('✅ User data created successfully! You can now edit your profile.');
      setUserData(userData);
    } catch (err) {
      setError(`Error creating user data: ${err.message}`);
    }
  };

  const checkDatabaseStructure = async () => {
    setStatus('Checking database structure...');
    setError('');
    setSuccess('');

    try {
      const rootSnapshot = await get(ref(realtimeDb, '/'));
      const rootData = rootSnapshot.val();
      
      console.log('Database root structure:', rootData);
      
      if (rootData && rootData.users) {
        const userCount = Object.keys(rootData.users).length;
        setSuccess(`✅ Database structure looks good. Found ${userCount} users.`);
      } else {
        setError('❌ No users node found in database');
      }
    } catch (err) {
      setError(`Error checking database: ${err.message}`);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--color-sdc-dark)] p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="card-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Data Recovery Tool</CardTitle>
              <CardDescription className="text-gray-400">
                Please log in to use the data recovery tool
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="card-dark border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Data Recovery Tool</CardTitle>
            <CardDescription className="text-gray-400">
              Fix missing user data issues
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-red-500/50 bg-red-500/10">
                <AlertDescription className="text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            
            {success && (
              <Alert className="border-green-500/50 bg-green-500/10">
                <AlertDescription className="text-green-400">{success}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={checkUserData} disabled={status}>
                Check My Data
              </Button>
              <Button onClick={checkDatabaseStructure} disabled={status}>
                Check Database
              </Button>
              <Button onClick={createUserData} disabled={status || userData}>
                Create My Data
              </Button>
            </div>
            
            {status && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-sdc-purple-mid)] mx-auto mb-2"></div>
                <p className="text-gray-400">{status}</p>
              </div>
            )}
            
            {userData && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Your Current Data:</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  <div><strong>Name:</strong> {userData.fullName}</div>
                  <div><strong>Email:</strong> {userData.email}</div>
                  <div><strong>Student ID:</strong> {userData.studentId}</div>
                  <div><strong>Department:</strong> {userData.department}</div>
                  <div><strong>Year:</strong> {userData.yearOfStudy}</div>
                  <div><strong>Contact:</strong> {userData.contactNumber}</div>
                  <div><strong>Created:</strong> {userData.createdAt}</div>
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
              <h3 className="text-blue-400 font-semibold mb-2">Instructions:</h3>
              <ol className="text-blue-300 text-sm space-y-1">
                <li>1. Click "Check My Data" to see if your data exists</li>
                <li>2. Click "Check Database" to see the overall database structure</li>
                <li>3. If your data is missing, click "Create My Data" to create a basic profile</li>
                <li>4. After creating data, you can edit your profile normally</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataRecovery; 