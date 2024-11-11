import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isError: boolean;
}

export function ConnectionStatus({ isError }: ConnectionStatusProps) {
  if (!isError) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-50 text-red-700 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
      <AlertCircle className="w-5 h-5" />
      <span>Kunne ikke koble til serveren</span>
    </div>
  );
}