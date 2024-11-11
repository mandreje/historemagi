import React, { useState } from 'react';
import { X, Printer, Truck } from 'lucide-react';
import type { PrintOptions } from '../types';

interface PrintModalProps {
  onClose: () => void;
  storyTitle: string;
}

export default function PrintModal({ onClose, storyTitle }: PrintModalProps) {
  const [options, setOptions] = useState<PrintOptions>({
    format: 'hardcover',
    size: 'A4',
    quality: 'standard',
    shipping: 'standard',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Bestill trykt kopi</h2>
        <p className="text-gray-600 mb-6 text-center">{storyTitle}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Format
            </label>
            <select
              value={options.format}
              onChange={(e) => setOptions({ ...options, format: e.target.value as 'hardcover' | 'paperback' })}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="hardcover">Innbundet</option>
              <option value="paperback">Heftet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Størrelse
            </label>
            <select
              value={options.size}
              onChange={(e) => setOptions({ ...options, size: e.target.value as 'A4' | 'A5' })}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="A4">A4</option>
              <option value="A5">A5</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kvalitet
            </label>
            <select
              value={options.quality}
              onChange={(e) => setOptions({ ...options, quality: e.target.value as 'standard' | 'premium' })}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Levering
            </label>
            <select
              value={options.shipping}
              onChange={(e) => setOptions({ ...options, shipping: e.target.value as 'standard' | 'express' })}
              className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="standard">Standard (3-5 dager)</option>
              <option value="express">Express (1-2 dager)</option>
            </select>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
            <Printer className="w-5 h-5" />
            <span>Bestill nå</span>
          </button>
        </div>
      </div>
    </div>
  );
}