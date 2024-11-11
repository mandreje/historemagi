import React from 'react';
import { BookOpen } from 'lucide-react';

export function AuthHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center">
        <BookOpen className="h-12 w-12 text-indigo-600" />
      </div>
      <h2 className="mt-4 text-3xl font-bold text-gray-900">Historie Magi</h2>
      <p className="mt-2 text-gray-600">Din magiske historieforteller</p>
    </div>
  );
}