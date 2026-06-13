import React from 'react';
import { Phone, MessageSquare, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface MobileStickyCTAProps {
  navigateToPage: (page: string) => void;
}

export default function MobileStickyCTA({ navigateToPage }: MobileStickyCTAProps) {
  const { t } = useLanguage();

  const handleCall = () => {
    window.location.href = 'tel:+919121594223';
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Namaste Sri Lakshmi Matrimony, please send registration guidelines for a suitable Telugu match.");
    window.open(`https://wa.me/919121594223?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleRegisterClick = () => {
    navigateToPage('register');
  };

  return (
    <div 
      id="mobile-sticky-cta"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gold-300/30 px-3.5 py-2.5 pb-3 max-w-full shadow-[0_-8px_30px_rgb(0,0,0,0.12)] font-sans"
    >
      <div className="grid grid-cols-3 gap-2.5">
        
        {/* Call button */}
        <button
          id="sticky-mobile-call-btn"
          onClick={handleCall}
          className="py-2.5 px-2 bg-maroon-850 active:bg-maroon-900 text-white rounded-lg font-bold text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 focus:outline-none transition-colors border border-transparent shadow-xs cursor-pointer"
        >
          <Phone size={13} className="text-gold-350 fill-none" />
          <span>{t('sticky.call', 'Call', 'ఫోన్ చేయండి')}</span>
        </button>

        {/* WhatsApp button */}
        <button
          id="sticky-mobile-wa-btn"
          onClick={handleWhatsApp}
          className="py-2.5 px-2 bg-emerald-600 active:bg-emerald-700 text-white rounded-lg font-bold text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 focus:outline-none transition-colors shadow-xs cursor-pointer border-none"
        >
          <MessageSquare size={13} className="fill-none" />
          <span>{t('sticky.whatsapp', 'WhatsApp', 'వాట్సాప్')}</span>
        </button>

        {/* Register button */}
        <button
          id="sticky-mobile-reg-btn"
          onClick={handleRegisterClick}
          className="py-2.5 px-2 bg-gold-500 active:bg-gold-600 text-maroon-950 rounded-lg font-bold text-[11px] uppercase tracking-wide flex items-center justify-center gap-1.5 focus:outline-none transition-colors border border-gold-400 shadow-xs cursor-pointer"
        >
          <UserPlus size={13} className="fill-none" />
          <span>{t('sticky.register', 'Register', 'రిజిస్టర్')}</span>
        </button>

      </div>
    </div>
  );
}
