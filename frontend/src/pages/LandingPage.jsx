import home_bg from '../assets/cafe_bg.jpg';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  document.body.style.backgroundColor = 'var(--color-dark-brown)';
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-45"
        src={home_bg}
      />
      <div className="absolute top-0 bg-brown/60 backdrop-blur-sm w-full py-4">
        <h1 className="text-white text-4xl font-serif px-4">Snug</h1>
      </div>

      <div className="relative z-10 flex items-center h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl fade-in">
            <h1 className="font-serif text-white text-4xl lg:text-6xl font-normal tracking-tight mb-8">
              Find Your Perfect Study Spot
            </h1>

            <p className="font-sans text-gray-200 text-lg lg:text-xl font-light leading-relaxed mb-12 max-w-xl">
              Discover local cafes and cozy spots to study, work, or relax. Snug
              helps you find the perfect environment to boost your productivity and
              creativity.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="bg-white text-gray-900 font-sans font-medium px-6 py-3 rounded-lg text-base hover:bg-gray-100 hover:scale-105 hover:shadow-lg transition-all duration-300"
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="flex w-full justify-between items-center px-4">
          <p className="font-sans text-white/70 text-xs font-light">
            © 2025 Snug. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
