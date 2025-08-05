import React, { useState } from 'react';
import { ref, set, get } from 'firebase/database';
import { realtimeDb } from '../firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DatabaseTest = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const testWrite = async () => {
    setStatus('Testing write...');
    setError('');
    setSuccess('');
    
    try {
      const testRef = ref(realtimeDb, 'test');
      await set(testRef, {
        message: 'Test successful',
        timestamp: new Date().toISOString()
      });
      setSuccess('✅ Write test successful!');
      setStatus('');
    } catch (err) {
      setError(`❌ Write test failed: ${err.message}`);
      setStatus('');
    }
  };

  const testRead = async () => {
    setStatus('Testing read...');
    setError('');
    setSuccess('');
    
    try {
      const testRef = ref(realtimeDb, 'test');
      const snapshot = await get(testRef);
      if (snapshot.exists()) {
        setSuccess(`✅ Read test successful! Data: ${JSON.stringify(snapshot.val())}`);
      } else {
        setSuccess('✅ Read test successful! No data found (this is normal if write test failed)');
      }
      setStatus('');
    } catch (err) {
      setError(`❌ Read test failed: ${err.message}`);
      setStatus('');
    }
  };

  const testUsersRead = async () => {
    setStatus('Testing users read...');
    setError('');
    setSuccess('');
    
    try {
      const usersRef = ref(realtimeDb, 'users');
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const userCount = Object.keys(users).length;
        setSuccess(`✅ Users read successful! Found ${userCount} users`);
      } else {
        setSuccess('✅ Users read successful! No users found');
      }
      setStatus('');
    } catch (err) {
      setError(`❌ Users read test failed: ${err.message}`);
      setStatus('');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] p-6 relative">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back to Admin Dashboard Button */}
        <div className="mb-6">
          <Link to="/admin-dashboard">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>

        <Card className="card-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Database Connection Test</CardTitle>
            <CardDescription className="text-gray-400">
              Test if Realtime Database is working properly
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
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={testWrite} disabled={status}>
                Test Write
              </Button>
              <Button onClick={testRead} disabled={status}>
                Test Read
              </Button>
              <Button onClick={testUsersRead} disabled={status}>
                Test Users Read
              </Button>
            </div>
            
            {status && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-sdc-purple-mid)] mx-auto mb-2"></div>
                <p className="text-gray-400">{status}</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-white font-semibold mb-2">Instructions:</h3>
              <ol className="text-gray-300 text-sm space-y-1">
                <li>1. Click "Test Write" to check if you can write to the database</li>
                <li>2. Click "Test Read" to check if you can read from the database</li>
                <li>3. Click "Test Users Read" to check if you can read the users node</li>
                <li>4. Check the console (F12) for detailed error messages</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseTest; 