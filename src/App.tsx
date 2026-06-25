import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CallExpertModal from './components/CallExpertModal';
import MobileStickyCTA from './components/MobileStickyCTA';

// Import newly organized pages conforming to exact folder guidelines
import Home from './pages/Home';
import About from './pages/About';
import Profiles from './pages/Profiles';
import AllCaste from './pages/All Caste';
import SuccessStories from './pages/SuccessStories';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import NotFound from './pages/NotFound';

// Single source of truth mapping logical page ids <-> real URL paths.
const PAGE_TO_PATH: Record<string, string> = {
  home: '/',
  about: '/about',
  profiles: '/profiles',
  communities: '/communities',
  'success-stories': '/success-stories',
  contact: '/contact',
  register: '/register',
};

const PATH_TO_PAGE: Record<string, string> = Object.fromEntries(
  Object.entries(PAGE_TO_PATH).map(([page, path]) => [path, page]),
);

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [profileGenderFilter, setProfileGenderFilter] = useState<'All' | 'Bride' | 'Groom'>('All');

  // Derive the active page from the URL so deep links and refreshes work.
  const currentPage = PATH_TO_PAGE[location.pathname] ?? 'notfound';

  // Report client-side route changes to Google Analytics as page views.
  useEffect(() => {
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_path: location.pathname });
    }
  }, [location.pathname]);

  // Navigate by logical page id (keeps every child component's API unchanged).
  const handleNavigate = (pageId: string) => {
    navigate(PAGE_TO_PATH[pageId] ?? '/');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleOpenExpertModal = () => {
    setIsExpertOpen(true);
  };

  const handleCloseExpertModal = () => {
    setIsExpertOpen(false);
  };

  // Helper route switcher
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onTalkToExpertClick={handleOpenExpertModal} 
            navigateToPage={handleNavigate}
            profileGenderFilter={profileGenderFilter}
            setProfileGenderFilter={setProfileGenderFilter}
          />
        );
      case 'about':
        return (
          <About 
            onTalkToExpertClick={handleOpenExpertModal} 
            navigateToPage={handleNavigate} 
          />
        );
      case 'profiles':
        return (
          <Profiles 
            navigateToPage={handleNavigate}
            activeGender={profileGenderFilter}
            setActiveGender={setProfileGenderFilter}
          />
        );
      case 'communities':
        return (
          <AllCaste 
            navigateToPage={handleNavigate} 
            setActiveGender={setProfileGenderFilter}
          />
        );
      case 'success-stories':
        return (
          <SuccessStories 
            navigateToPage={handleNavigate} 
          />
        );
      case 'contact':
        return (
          <Contact 
            navigateToPage={handleNavigate} 
          />
        );
      case 'register':
        return (
          <Registration
            navigateToPage={handleNavigate}
          />
        );
      case 'notfound':
        return (
          <NotFound
            navigateToPage={handleNavigate}
          />
        );
      default:
        return (
          <Home
            onTalkToExpertClick={handleOpenExpertModal}
            navigateToPage={handleNavigate}
            profileGenderFilter={profileGenderFilter}
            setProfileGenderFilter={setProfileGenderFilter}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col justify-between selection:bg-gold-200 selection:text-maroon-950">
      
      {/* 1. Header (Dynamic Scroll, Active Highlighting and Target Action Hooks) */}
      <Navbar 
        currentPage={currentPage}
        navigateToPage={handleNavigate}
        onTalkToExpertClick={handleOpenExpertModal} 
      />

      {/* 2. Main Stage - switches pages viewport dynamically */}
      <main className="flex-grow pt-[124px] pb-16 md:pb-0 font-sans" id="main-routing-board">
        {renderCurrentPage()}
      </main>

      {/* 3. Footer (Quick Links & Communities Action Route Mappings) */}
      <Footer navigateToPage={handleNavigate} />

      {/* 4. Bottom Sticky Mobile CTR Bar Overlay */}
      <MobileStickyCTA navigateToPage={handleNavigate} />

      {/* 5. Expert Matchmaker Callback Lead Form Modal */}
      <CallExpertModal
        isOpen={isExpertOpen}
        onClose={handleCloseExpertModal}
      />

      {/* 6. Vercel Web Analytics */}
      <Analytics />

      {/* 7. Vercel Speed Insights */}
      <SpeedInsights />

    </div>
  );
}

