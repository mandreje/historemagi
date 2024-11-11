import React, { useState } from 'react';
import { Wand2, BookOpen, Volume2, Smartphone } from 'lucide-react';

export default function StoryCreator() {
  const [age, setAge] = useState('5-8');
  const [theme, setTheme] = useState('eventyr');
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <Wand2 className="w-6 h-6 text-purple-600" />
        <span>Lag din historie</span>
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aldersgruppe
          </label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="3-5">3-5 år</option>
            <option value="5-8">5-8 år</option>
            <option value="8-12">8-12 år</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Historietema
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="eventyr">Magisk Eventyr</option>
            <option value="vennskap">Vennskap</option>
            <option value="læring">Læring og Vekst</option>
            <option value="natur">Natur og Dyr</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fortell din idé
          </label>
          <textarea
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 h-32"
            placeholder="Beskriv din historieide..."
          ></textarea>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              audioEnabled
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Volume2 className="w-5 h-5" />
            <span>Tekst-til-tale</span>
          </button>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2">
          <BookOpen className="w-5 h-5" />
          <span>Generer Historie</span>
        </button>
      </div>
    </div>
  );
}