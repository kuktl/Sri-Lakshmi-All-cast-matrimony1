import { Phone, MessageSquare, UserPlus } from 'lucide-react';

interface RegistrationCTAProps {
  onRegisterScroll: () => void;
  onTalkToExpertClick: () => void;
}

export default function RegistrationCTA({ onRegisterScroll, onTalkToExpertClick }: RegistrationCTAProps) {
  
  const handleCall = () => {
    window.location.href = 'tel:+919121594223';
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Hello Sri Lakshmi All Caste Matrimony, I am looking for a suitable match matching our family values. Please assist me with the registration details.");
    window.open(`https://wa.me/917386915677?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="banner-cta" className="relative py-14 bg-maroon-950 text-white overflow-hidden select-none">
      {/* Traditional ornament pattern background vectors */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#cca32d_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
      
      {/* Sawtooth bottom connector */}
      <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-gold-500/10 to-transparent"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Decorative Lotus outline */}
        <div className="flex justify-center mb-1">
          <div className="w-12 h-12 rounded-full border border-gold-300/40 bg-gold-500/10 flex items-center justify-center text-gold-300">
            ❋
          </div>
        </div>

        {/* Big Heading */}
        <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold tracking-wide leading-tight text-gold-100">
          Start Your Matchmaking Journey Today
        </h2>

        {/* Subtext explanation */}
        <p className="text-maroon-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Share your bride or groom details and our team will help you find suitable matches based on your family and community preferences.
        </p>

        {/* Interactive CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4" id="cta-button-horizontal-list">
          <button
            id="cta-scroller-register-btn"
            onClick={onRegisterScroll}
            className="px-7 py-3 font-semibold text-xs sm:text-sm bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-maroon-950 rounded-xl shadow-lg transition-all hover:scale-103 cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlus size={16} /> Register Profile (Free)
          </button>

          <button
            id="cta-phone-call-btn"
            onClick={handleCall}
            className="px-6 py-3 font-semibold text-xs sm:text-sm bg-maroon-800 hover:bg-maroon-700 text-white rounded-xl border border-maroon-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone size={16} className="text-gold-450" /> Call Now: +91 91215 94223 / +91 73869 15677
          </button>

          <button
            id="cta-whatsapp-btn"
            onClick={handleWhatsApp}
            className="px-6 py-3 font-semibold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={16} /> WhatsApp Us For Help
          </button>
        </div>

        {/* Short privacy warning helper */}
        <div className="text-[10px] text-maroon-350 tracking-wide font-medium">
          Instant Support • 100% Confidential • Families Only
        </div>

      </div>
    </section>
  );
}
