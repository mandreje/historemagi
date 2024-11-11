import React, { useState } from 'react';
import { Book, Volume2, Printer, Smartphone } from 'lucide-react';
import type { Story, Series } from '../types';

export default function StoryLibrary() {
  const [view, setView] = useState<'stories' | 'series'>('stories');

  const stories: Story[] = [
    {
      id: 1,
      title: "Dragens Hemmelige Hage",
      cover: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&q=80",
      progress: 80,
      series: "Magiske Verdener",
      available: true,
      audioAvailable: true,
      printAvailable: true,
    },
    {
      id: 2,
      title: "Reisen til Stjerneriket",
      cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
      progress: 30,
      series: "Romreiser",
      available: true,
      audioAvailable: true,
      printAvailable: false,
    },
    {
      id: 3,
      title: "Den Vennlige Skogen",
      cover: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&q=80",
      progress: 100,
      available: true,
      audioAvailable: false,
      printAvailable: true,
    },
  ];

  const series: Series[] = [
    {
      id: 1,
      name: "Magiske Verdener",
      description: "Utforsk fantastiske magiske riker",
      storiesCount: 5,
      cover: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=400&q=80",
    },
    {
      id: 2,
      name: "Romreiser",
      description: "Eventyr blant stjernene",
      storiesCount: 3,
      cover: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&q=80",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-4">
          <button
            onClick={() => setView('stories')}
            className={`px-4 py-2 rounded-lg ${
              view === 'stories'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Historier
          </button>
          <button
            onClick={() => setView('series')}
            className={`px-4 py-2 rounded-lg ${
              view === 'series'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Serier
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {view === 'stories' ? (
          stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={story.cover}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{story.title}</h3>
                  {story.series && (
                    <p className="text-white/80 text-sm">{story.series}</p>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Fremgang</span>
                  <span className="text-sm font-medium">{story.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${story.progress}%` }}
                  />
                </div>
                <div className="flex items-center space-x-2 mt-4 mb-2">
                  {story.audioAvailable && (
                    <Volume2 className="w-4 h-4 text-purple-600" />
                  )}
                  {story.printAvailable && (
                    <Printer className="w-4 h-4 text-purple-600" />
                  )}
                  <Smartphone className="w-4 h-4 text-purple-600" />
                </div>
                <button className="w-full mt-2 py-2 flex items-center justify-center space-x-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Book className="w-4 h-4" />
                  <span>Fortsett å lese</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          series.map((series) => (
            <div
              key={series.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden group hover:scale-105 transition-transform"
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={series.cover}
                  alt={series.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-bold text-lg">{series.name}</h3>
                  <p className="text-white/80 text-sm">
                    {series.storiesCount} historier
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{series.description}</p>
                <button className="w-full py-2 flex items-center justify-center space-x-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                  <Book className="w-4 h-4" />
                  <span>Utforsk serien</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}