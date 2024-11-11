import React from 'react';
import { UserCircle2, Palette } from 'lucide-react';

export default function CharacterCreator() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
        <UserCircle2 className="w-6 h-6 text-purple-600" />
        <span>Lag en Karakter</span>
      </h2>

      <div className="space-y-6">
        <div className="aspect-square rounded-xl bg-purple-50 flex items-center justify-center border-2 border-dashed border-purple-200">
          <div className="text-center">
            <Palette className="w-12 h-12 text-purple-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              Klikk for å tilpasse karakteren din
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Navn
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="Karakterens navn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              <option>Menneske</option>
              <option>Dyr</option>
              <option>Magisk Vesen</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personlighet
          </label>
          <div className="flex flex-wrap gap-2">
            {['Modig', 'Snill', 'Smart', 'Morsom', 'Nysgjerrig'].map((trait) => (
              <button
                key={trait}
                className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 text-sm hover:bg-purple-100 transition-colors"
              >
                {trait}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}