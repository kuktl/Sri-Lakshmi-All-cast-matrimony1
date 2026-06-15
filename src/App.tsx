import { useState, useEffect } from 'react';
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

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isExpertOpen, setIsExpertOpen] = useState(false);
  const [profileGenderFilter, setProfileGenderFilter] = useState<'All' | 'Bride' | 'Groom'>('All');

  // Smooth scroll to top on page navigation to simulate routing
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
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

    </div>
  );
}

