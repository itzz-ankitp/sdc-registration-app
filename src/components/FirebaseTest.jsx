import React, { useState } from 'react';
import { auth, realtimeDb } from '../firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const FirebaseTest = () => {
  const [config, setConfig] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkConfig = () => {
    try {
      const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
        measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
      };

      setConfig(config);
      
      // Check if any values are undefined
      const undefinedKeys = Object.keys(config).filter(key => !config[key]);
      if (undefinedKeys.length > 0) {
        setError(`Missing environment variables: ${undefinedKeys.join(', ')}`);
      } else {
        setSuccess('✅ All Firebase config values are present');
      }
    } catch (err) {
      setError(`Error checking config: ${err.message}`);
    }
  };

  const testAuth = async () => {
    try {
      setError('');
      setSuccess('');
      
      // Test if auth is properly initialized
      if (auth) {
        setSuccess('✅ Firebase Auth is properly initialized');
      } else {
        setError('❌ Firebase Auth is not initialized');
      }
    } catch (err) {
      setError(`Auth test failed: ${err.message}`);
    }
  };

  const testRealtimeDb = async () => {
    try {
      setError('');
      setSuccess('');
      
      // Test if Realtime Database is properly initialized
      if (realtimeDb) {
        setSuccess('✅ Firebase Realtime Database is properly initialized');
      } else {
        setError('❌ Firebase Realtime Database is not initialized');
      }
    } catch (err) {
      setError(`Realtime Database test failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back to Admin Dashboard Button */}
        <div className="mb-6">
          <Link to="/admin-dashboard">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
          </Link>
        </div>

        <Card className="card-dark border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Firebase Configuration Test</CardTitle>
            <CardDescription className="text-gray-400">
              Check if Firebase Auth and Realtime Database are properly configured
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
              <Button onClick={checkConfig}>
                Check Config
              </Button>
              <Button onClick={testAuth}>
                Test Auth
              </Button>
              <Button onClick={testRealtimeDb}>
                Test Realtime DB
              </Button>
            </div>
            
            {Object.keys(config).length > 0 && (
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-white font-semibold mb-2">Configuration Values:</h3>
                <div className="text-sm text-gray-300 space-y-1">
                  {Object.entries(config).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value ? '✅ Set' : '❌ Missing'}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
              <h3 className="text-blue-400 font-semibold mb-2">Note:</h3>
              <p className="text-blue-300 text-sm">
                This application now uses only Firebase Authentication and Realtime Database. 
                Firestore has been completely removed to simplify the architecture.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FirebaseTest; 