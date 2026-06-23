import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, MessageSquare, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  navigateToPage: (page: string) => void;
  onTalkToExpertClick: () => void;
}

export default function Header({ currentPage, navigateToPage, onTalkToExpertClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    setIsOpen(false);
    navigateToPage(pageId);
  };

  const navLinks = [
    { label: 'Home', pageId: 'home' },
    { label: 'About Us', pageId: 'about' },
    { label: 'Profiles', pageId: 'profiles' },
    { label: 'All Castes', pageId: 'communities' },
    { label: 'Success Stories', pageId: 'success-stories' },
    { label: 'Contact', pageId: 'contact' },
  ];

  return (
    <header 
      id="main-sticky-header"
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 shadow-md"
    >
      {/* 1. Thin Top Contact Bar */}
      <div 
        id="top-contact-bar"
        className="bg-maroon-950 text-gold-100 py-2 border-b border-gold-500/20 text-xs transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Quick Contacts */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a href="tel:+919121594223" className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <Phone size={13} className="text-gold-400 font-sans" />
              <span className="font-sans">Call: +91 91215 94223 / +91 73869 15677</span>
            </a>
            <span className="hidden md:inline text-gold-500/50">|</span>
            <a href="mailto:info@srilakshmiallcastematrimony.com" className="flex items-center gap-1.5 hover:text-white transition-colors duration-200">
              <Mail size={13} className="text-gold-400" />
              <span>info@srilakshmiallcastematrimony.com</span>
            </a>
          </div>

          {/* Social Icons & Status indicator */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-[11px] text-stone-300 uppercase tracking-widest font-semibold">
              Sri Lakshmi All Caste Matrimony
            </span>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 text-gold-200 transition-colors" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 text-gold-200 transition-colors" aria-label="Instagram">
                <Instagram size={14} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Header / Sticky Navbar */}
      <div 
        className={`transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-md border-b border-gold-300/30 py-3' 
            : 'bg-cream-100 py-4 border-b border-gold-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand logo */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center cursor-pointer group"
              id="brand-logo"
            >
              <img
                src="/logo.png"
                alt="Sri Lakshmi All Caste Matrimony"
                className="h-10 sm:h-11 lg:h-12 w-auto transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
              {navLinks.map((link) => {
                return (
                  <button
                    key={link.pageId}
                    id={`nav-${link.pageId}`}
                    onClick={() => handleNavClick(link.pageId)}
                    className={`px-3.5 py-2 font-semibold text-sm transition-all relative group focus:outline-none cursor-pointer ${
                      currentPage === link.pageId 
                        ? 'text-maroon-900 font-bold' 
                        : 'text-stone-700 hover:text-maroon-850'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-gold-500 transition-transform duration-300 ${
                      currentPage === link.pageId ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </button>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3" id="desktop-cta-container">
              <button
                id="expert-talk-header-btn"
                onClick={onTalkToExpertClick}
                className="px-4 py-2 text-xs font-bold text-maroon-900 hover:text-white border border-maroon-900/30 bg-maroon-50/50 hover:bg-maroon-950 rounded-lg transition-all shadow-xs cursor-pointer"
              >
                Talk to Expert
              </button>
              <button
                id="register-header-btn"
                onClick={() => handleNavClick('register')}
                className="px-5 py-2 text-xs font-bold text-white bg-maroon-800 hover:bg-maroon-950 rounded-lg border-2 border-gold-400 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Register Now
              </button>
            </div>

            {/* Hamburger Menu Toggle (lg:hidden) */}
            <div className="flex lg:hidden" id="mobile-menu-toggle-container">
              <button
                id="hamburger-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-stone-700 hover:text-maroon-800 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {isOpen && (
          <div id="mobile-nav-drawer" className="absolute top-full left-0 right-0 bg-white border-b border-gold-300/30 shadow-xl py-4 px-6 space-y-3 lg:hidden animate-slide-down">
            {navLinks.map((link) => {
              return (
                <button
                  key={link.pageId}
                  id={`mob-nav-${link.pageId}`}
                  onClick={() => handleNavClick(link.pageId)}
                  className={`block w-full text-left py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                    currentPage === link.pageId 
                      ? 'bg-cream-100 text-maroon-900 font-bold' 
                      : 'text-stone-700 hover:text-maroon-850 hover:bg-cream-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
              <button
                id="mob-expert-talk"
                onClick={() => {
                  setIsOpen(false);
                  onTalkToExpertClick();
                }}
                className="w-full text-center py-2.5 rounded-lg border border-maroon-900/25 bg-cream-100 text-maroon-900 font-bold text-xs transition-colors"
              >
                Talk to Matchmaking Expert
              </button>
              <button
                id="mob-register-now"
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick('register');
                }}
                className="w-full text-center py-2.5 rounded-lg bg-maroon-800 hover:bg-maroon-950 text-white font-bold text-xs shadow-md transition-colors border border-gold-400"
              >
                Register Your Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
