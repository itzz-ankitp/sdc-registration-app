import { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const FormspreeTest = () => {
  const [state, handleSubmit] = useForm("xkgzwgaz");
  const [debugInfo, setDebugInfo] = useState({});

  // Debug logging
  useEffect(() => {
    console.log('Formspree State:', state);
    setDebugInfo({
      submitting: state.submitting,
      succeeded: state.succeeded,
      errors: state.errors,
      response: state.response
    });
  }, [state]);

  const handleFormSubmit = (e) => {
    console.log('Form submitted, event:', e);
    console.log('Form data:', new FormData(e.target));
    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-green-600">✅ Form Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your test message has been sent. Check your email and the Formspree dashboard.
            </p>
            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-700">
                <strong>Form ID:</strong> xkgzwgaz<br/>
                <strong>Status:</strong> {state.succeeded ? 'Success' : 'Failed'}<br/>
                <strong>Errors:</strong> {state.errors?.length || 0}<br/>
                <strong>Response:</strong> {state.response?.status || 'N/A'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>🧪 Formspree Test Form</CardTitle>
        </CardHeader>
        <CardContent>
          {state.errors && state.errors.length > 0 && (
            <Alert className="mb-4 border-red-500/50 bg-red-500/10">
              <AlertDescription className="text-red-400">
                {state.errors.map(error => (
                  <div key={error.code}>
                    {error.message}
                  </div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                required
                className="w-full"
              />
              <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Your Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />
              <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                Test Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="This is a test message to verify Formspree is working..."
                required
                className="w-full min-h-[100px]"
              />
              <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
                className="text-red-400 text-sm mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={state.submitting}
              className="w-full"
            >
              {state.submitting ? 'Sending...' : 'Send Test Message'}
            </Button>
          </form>

          <div className="mt-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-700">
              <strong>Form ID:</strong> xkgzwgaz<br/>
              <strong>Status:</strong> {state.submitting ? 'Submitting...' : 'Ready'}<br/>
              <strong>Errors:</strong> {state.errors?.length || 0}<br/>
              <strong>Response Status:</strong> {state.response?.status || 'N/A'}
            </p>
          </div>

          {/* Debug Info */}
          <div className="mt-4 p-3 bg-blue-100 rounded">
            <p className="text-sm text-blue-700">
              <strong>Debug Info:</strong><br/>
              <pre className="text-xs mt-2 overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormspreeTest; 