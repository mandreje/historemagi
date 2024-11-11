import { useEffect } from 'react';
import { useAdmin } from '../hooks/useAdmin';
import { AlertCircle, Loader } from 'lucide-react';

export default function AdminLogin() {
  const { login, isLoading, isError, error, isConnected } = useAdmin();

  useEffect(() => {
    if (isConnected) {
      login();
    }
  }, [isConnected]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
        <Loader className="w-5 h-5 text-purple-600 animate-spin" />
        <span className="ml-2 text-gray-600">Connecting to admin panel...</span>
      </div>
    );
  }

  if (isError || !isConnected) {
    return (
      <div className="p-4 bg-red-50 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <span className="ml-2 text-red-700">
            {!isConnected 
              ? 'Could not connect to the server. Please check if PocketBase is running.'
              : error instanceof Error 
                ? error.message 
                : 'Failed to authenticate. Please check your admin credentials.'}
          </span>
        </div>
        <button
          onClick={() => login()}
          className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return null;
}