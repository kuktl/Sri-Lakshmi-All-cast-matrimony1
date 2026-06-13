import React from 'react';
import HeroSection from '../components/HeroSection';
import TrustStats from '../components/TrustStats';
import IntroSection from '../components/IntroSection';
import KiranTVSection from '../components/KiranTVSection';
import WhyTrust from '../components/WhyTrust';
import CategoriesSection from '../components/CategoriesSection';
import ProfileShowcase from '../components/ProfileShowcase';
import HowItWorks from '../components/HowItWorks';
import MarriageCardsShowcase from '../components/MarriageCardsShowcase';
import MembershipPlans from '../components/MembershipPlans';
import VideoBanner from '../components/VideoBanner';
import RegistrationCTA from '../components/RegistrationCTA';

interface HomePageProps {
  onTalkToExpertClick: () => void;
  navigateToPage: (page: string) => void;
  profileGenderFilter: 'All' | 'Bride' | 'Groom';
  setProfileGenderFilter: (tab: 'All' | 'Bride' | 'Groom') => void;
}

export default function Home({ 
  onTalkToExpertClick, 
  navigateToPage,
  profileGenderFilter,
  setProfileGenderFilter
}: HomePageProps) {
  
  const handleCategoryClick = (gender: 'Bride' | 'Groom') => {
    setProfileGenderFilter(gender);
    navigateToPage('profiles');
  };

  const handleRegisterClick = () => {
    navigateToPage('register');
  };

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection 
        onTalkToExpertClick={onTalkToExpertClick} 
        onRegisterClick={handleRegisterClick} 
      />

      {/* 2. Trust Stats Cards */}
      <TrustStats />

      {/* 3. Traditional Legacy Intro Section */}
      <IntroSection />

      {/* Kiran TV Broadcast Presentation Feature Segment */}
      <KiranTVSection layoutVariant="default" />

      {/* 4. Why Families Trust Us */}
      <WhyTrust />

      {/* 6. Goud Segment Categories Header & Cards */}
      <CategoriesSection onCategoryClick={handleCategoryClick} />

      {/* 7. Featured Profiles Short Showcase */}
      <div id="featured-profiles-container" className="bg-white py-4">
        <ProfileShowcase 
          onRegisterScroll={handleRegisterClick} 
          activeTab={profileGenderFilter}
          setActiveTab={setProfileGenderFilter}
        />
      </div>

      {/* 8. Timeline Match Process */}
      <HowItWorks />

      {/* Auspicious Marriage Invitation Cards Scrolling Parade Showcase */}
      <MarriageCardsShowcase />

      {/* Membership Plans Section */}
      <MembershipPlans />

      {/* 9. Cinematic Video presentation overlay */}
      <VideoBanner />

      {/* 11. Floating or Bottom Conversion CTA Panels */}
      <RegistrationCTA 
        onRegisterScroll={handleRegisterClick} 
        onTalkToExpertClick={onTalkToExpertClick} 
      />
    </>
  );
}
