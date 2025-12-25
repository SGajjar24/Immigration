import { useState, useEffect } from 'react';
import Navbar from './layouts/Navbar';
import Hero from './components/Hero';
import QuickTools from './components/QuickTools';
import FeaturesSection from './components/FeaturesSection';
import CanadaMap from './components/CanadaMap';
import ConsultationBooking from './components/ConsultationBooking';
import TestimonialsSection from './components/TestimonialsSection';
import ChatWidget from './components/ChatWidget';
import AssessmentPage from './pages/AssessmentPage';
import CalculatorPage from './pages/CalculatorPage';
import ExpressEntryHub from './features/ExpressEntry/ExpressEntryHub';
import PathwayExplorer from './components/PathwayExplorer';
import UnderConstruction from './pages/UnderConstruction';
import AboutContact from './pages/AboutContact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle navigation with optional section scrolling
  const handleNavigate = (page: string) => {
    // Check if it's a section scroll (contains #)
    if (page.startsWith('#')) {
      const element = document.getElementById(page.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'assessment': return <AssessmentPage />;
      case 'calculator': return <CalculatorPage />;
      case 'express-entry': return <ExpressEntryHub />;
      case 'pathway-explorer': return <PathwayExplorer />;
      case 'about': return <AboutContact onNavigate={handleNavigate} />;
      case 'contact': return <AboutContact onNavigate={handleNavigate} />;
      case 'login': return <UnderConstruction pageName="Login" onBack={() => handleNavigate('home')} />;
      case 'resources': return <UnderConstruction pageName="Resources" onBack={() => handleNavigate('home')} />;
      default: return (
        <>
          <Hero onNavigate={handleNavigate} />
          <QuickTools onNavigate={handleNavigate} />
          <FeaturesSection />
          <CanadaMap onNavigate={handleNavigate} />
          <TestimonialsSection />
          <ConsultationBooking />
          <footer id="footer" className="py-12 px-6 border-t border-white/5 text-center bg-background-dark">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-8 text-left">
                <div>
                  <h4 className="text-white font-bold mb-4">CanadaPath AI</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    AI-powered immigration guidance for your Canadian dream.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    <button onClick={() => handleNavigate('assessment')} className="block text-gray-500 hover:text-white text-sm transition-colors">Free Assessment</button>
                    <button onClick={() => handleNavigate('calculator')} className="block text-gray-500 hover:text-white text-sm transition-colors">CRS Calculator</button>
                    <button onClick={() => handleNavigate('express-entry')} className="block text-gray-500 hover:text-white text-sm transition-colors">Express Entry</button>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Company</h4>
                  <div className="space-y-2">
                    <button onClick={() => handleNavigate('about')} className="block text-gray-500 hover:text-white text-sm transition-colors">About Us</button>
                    <button onClick={() => handleNavigate('contact')} className="block text-gray-500 hover:text-white text-sm transition-colors">Contact</button>
                    <button onClick={() => handleNavigate('resources')} className="block text-gray-500 hover:text-white text-sm transition-colors">Resources</button>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-4">Legal</h4>
                  <div className="space-y-2">
                    <button className="block text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</button>
                    <button className="block text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</button>
                    <button className="block text-gray-500 hover:text-white text-sm transition-colors">Disclaimer</button>
                  </div>
                </div>
              </div>
              <div className="pt-8 border-t border-white/5 text-white/20 text-xs font-medium uppercase tracking-[0.3em]">
                © 2025 CanadaPath AI • Precision Immigration Technology
              </div>
            </div>
          </footer>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background-dark selection:bg-accent-red selection:text-white font-body scroll-smooth">
      {currentPage !== 'pathway-explorer' && (
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      )}

      <main>
        {renderPage()}
      </main>

      <ChatWidget />
    </div>
  );
}

export default App;
