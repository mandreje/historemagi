import { useState } from 'react';
import { Sparkles, Crown, Volume2, Smartphone, Palette } from 'lucide-react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import Logo from './components/Logo';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <Navbar onAuthClick={() => setShowAuthModal(true)} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="flex justify-center mb-8">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text">
            Magiske Historier for Barn
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            La barna utforske en verden av personlige eventyr, skapt spesielt for dem med kunstig intelligens og kreativitet.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <Crown className="w-5 h-5" />
              <span>Start din reise</span>
            </button>
            <button className="px-8 py-3 bg-white text-purple-600 rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Se hvordan det fungerer</span>
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float-slow">
          <Logo size="sm" showText={false} />
        </div>
        <div className="absolute top-1/3 right-12 animate-float-slower">
          <Logo size="sm" showText={false} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Personlig Tilpasset</h3>
              <p className="text-gray-600">
                Hver historie er skreddersydd til barnets alder, interesser og læringsnivå.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Lydbøker</h3>
              <p className="text-gray-600">
                Hør historiene lest opp med naturlige stemmer og lydeffekter.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Tilgjengelig Overalt</h3>
              <p className="text-gray-600">
                Les historiene på alle enheter, både online og offline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Testimonials Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Det Foreldre Sier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "Min datter elsker å skape sine egne historier. Det har virkelig tent leselysten hennes!",
                author: "Maria H.",
                role: "Mor til Emma (7)"
              },
              {
                quote: "Fantastisk måte å kombinere teknologi og lesing på. Historiene er alltid engasjerende.",
                author: "Anders L.",
                role: "Far til Oliver (5)"
              },
              {
                quote: "Perfekt for kveldsstunden. Vi gleder oss til hver nye historie vi kan utforske sammen.",
                author: "Sofie K.",
                role: "Mor til Lucas (6)"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Start Eventyret i Dag
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            La fantasien blomstre med ubegrensede muligheter for historiefortelling.
          </p>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
          >
            <Crown className="w-5 h-5" />
            <span>Prøv gratis i 14 dager</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Produkt</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Funksjoner</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Priser</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Last ned app</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Ressurser</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Blogg</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Brukerveiledning</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Selskap</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Om oss</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Kontakt</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Karriere</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Juridisk</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Personvern</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Vilkår</a></li>
                <li><a href="#" className="text-gray-600 hover:text-purple-600">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © 2024 Historie Magi. Alle rettigheter reservert.
            </p>
          </div>
        </div>
      </footer>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default App;