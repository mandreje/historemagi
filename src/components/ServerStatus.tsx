import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

export function ServerStatus() {
  const { isServerConnected, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center text-gray-500">
        <div className="animate-spin h-4 w-4 border-2 border-gray-500 rounded-full border-t-transparent mr-2"></div>
        Sjekker tilkobling...
      </div>
    );
  }

  return (
    <div className={`flex items-center ${isServerConnected ? 'text-green-500' : 'text-red-500'}`}>
      {isServerConnected ? (
        <>
          <CheckCircle className="h-4 w-4 mr-2" />
          Tilkoblet
        </>
      ) : (
        <>
          <AlertCircle className="h-4 w-4 mr-2" />
          Ikke tilkoblet til server
        </>
      )}
    </div>
  );
}