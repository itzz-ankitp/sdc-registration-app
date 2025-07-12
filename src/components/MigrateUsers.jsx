import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MigrateUsers = () => {
  return (
    <div className="min-h-screen bg-[var(--color-sdc-dark)] p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="card-dark border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Migration Complete</CardTitle>
            <CardDescription className="text-gray-400">
              Firestore has been removed from this application
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-300 mb-4">
              This application now uses only Firebase Authentication and Realtime Database.
              No migration is needed as Firestore is no longer used.
            </p>
            
            <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-4">
              <p className="text-green-400">
                ✅ Your app is now using only Realtime Database for data storage.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MigrateUsers; 