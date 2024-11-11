import { Crown, Smartphone } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo size="md" />

          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              Hvordan det fungerer
            </button>
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              Priser
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
              <Smartphone className="w-4 h-4" />
              <span>Last ned appen</span>
            </button>
            <button
              onClick={onAuthClick}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <Crown className="w-4 h-4" />
              <span>Logg inn</span>
            </button>
          </div>

          <button className="md:hidden p-2" onClick={onAuthClick}>
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
            <div className="w-6 h-0.5 bg-gray-600"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}