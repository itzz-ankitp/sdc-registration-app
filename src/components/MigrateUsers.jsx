import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const MigrateUsers = () => {
  return (
    <div className="min-h-screen p-6 relative">
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