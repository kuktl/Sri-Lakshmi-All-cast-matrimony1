import React from 'react';
import {
  Phone,
  Mail, 
  MapPin, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  Bookmark,
  ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  navigateToPage: (page: string) => void;
}

export default function Footer({ navigateToPage }: FooterProps) {
  const { t } = useLanguage();
  
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Namaste Sri Lakshmi Matrimony, I registered on your portal and seek matchmaking help.");
    window.open(`https://wa.me/919121594223?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer id="contact-section" className="bg-[#0e120e] text-stone-300 relative border-t-2 border-gold-400 font-sans">
      
      {/* Delicate golden accent topper line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        
        {/* Main Grid Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Col 1: Branding & Philosophy */}
          <div className="lg:col-span-5 space-y-5" id="footer-branding-col">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => navigateToPage('home')}
            >
              <img
                src="/favicon.png"
                alt="Sri Lakshmi All Caste Matrimony"
                className="w-11 h-11 rounded-full border border-gold-300/60 shadow-md group-hover:scale-110 transition-transform"
              />
              <div>
                <span className="block font-serif text-lg font-black text-gold-300 tracking-wider">
                  SRI LAKSHMI
                </span>
                <span className="block font-sans text-[10px] text-emerald-400 uppercase tracking-widest leading-none mt-1 font-extrabold">
                  {t('footer.badge', 'All Caste Matrimony', 'అన్ని కులాల మ్యాట్రిమోని')}
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-normal">
              {t(
                'footer.desc',
                'A trusted offline and online hybrid matrimonial directory helping traditional families find verified, premium life partners with absolute privacy controls.',
                'సాంప్రదాయ కుటుంబాలు తమకు తగిన జీవిత భాగస్వామిని నమ్మకమైన మరియు గోప్యతా నియంత్రణలతో కనుగొనడానికి సహాయపడుతున్న ఏకైక విభాగం.'
              )}
            </p>

            <div className="space-y-2 pt-1 font-sans">
              <button
                id="footer-action-whatsapp-btn"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer shadow-md border-none"
              >
                <MessageSquare size={14} className="fill-current" />
                <span>{t('footer.whatsappBtn', 'Contact Officer on WhatsApp', 'వాట్సాప్ ద్వారా అధికారిని సంప్రదించండి')}</span>
              </button>
              
              <div className="text-[10px] text-stone-500 font-semibold tracking-wide flex items-center gap-1.5 font-sans">
                <Clock size={11} className="text-stone-600" />
                <span>{t('footer.activeHours', 'Active Hours: 9:00 AM – 7:30 PM (IST)', 'పనివేళలు: ఉదయం 9:00 – రాత్రి 7:30 (IST)')}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Useful Navigation routes */}
          <div className="lg:col-span-3 space-y-4" id="footer-links-col">
            <h4 className="font-serif font-black text-xs sm:text-sm text-gold-200 uppercase tracking-widest flex items-center gap-1.5">
              <Bookmark size={14} className="text-gold-400" />
              <span>{t('footer.navTitle', 'Navigation', 'నేవిగేషన్')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              {[
                { label: t('footer.navHome', 'Home Page', 'హోమ్ పేజీ'), pageId: 'home' },
                { label: t('footer.navAbout', 'About Our Legacy', 'మా వారసత్వం'), pageId: 'about' },
                { label: t('footer.navProfiles', 'Verified Profiles', 'పరిశీలించిన వివరాలు'), pageId: 'profiles' },
                { label: t('footer.navSuccess', 'Success Stories', 'పరిణయ గాథలు'), pageId: 'success-stories' },
                { label: t('footer.navContact', 'Contact Helpdesk', 'సహాయక కేంద్రం'), pageId: 'contact' },
                { label: t('footer.navRegister', 'Register Biodata', 'నమోదు చేసుకోండి'), pageId: 'register' },
              ].map((item) => (
                <li key={item.pageId}>
                  <button
                    id={`footer-link-${item.pageId}`}
                    onClick={() => navigateToPage(item.pageId)}
                    className="text-stone-400 hover:text-gold-300 transition-colors cursor-pointer text-left focus:outline-none font-semibold block border-none bg-transparent"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Verified Contact physical card details */}
          <div className="lg:col-span-4 space-y-4" id="footer-contact-details-col">
            <h4 className="font-serif font-black text-xs sm:text-sm text-gold-200 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span>{t('footer.supportTitle', 'Support Desk', 'సహాయక కేంద్రం')}</span>
            </h4>
            <ul className="space-y-3.5 text-xs text-stone-400">
              <li className="flex gap-2.5 items-start">
                <MapPin size={15} className="text-gold-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px] sm:text-xs">
                  {t('footer.address', 'Tirupati, Hyderabad, All Over Andhra Pradesh and Telangana.', 'తిరుపతి, హైదరాబాద్, ఆంధ్రప్రదేశ్ మరియు తెలంగాణ అంతటా.')}
                </span>
              </li>
              <li className="flex gap-2.5 items-start font-sans">
                <Phone size={14} className="text-[#10b981] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+919121594223" className="hover:text-gold-300 transition-colors font-mono font-bold text-white">
                    +91 91215 94223
                  </a>
                  <a href="tel:+917386915677" className="hover:text-gold-300 transition-colors font-mono font-bold text-white">
                    +91 73869 15677
                  </a>
                </div>
              </li>
              <li className="flex gap-2.5 items-center font-sans">
                <Mail size={14} className="text-gold-400 shrink-0" />
                <a href="mailto:info@srilakshmiallcastematrimony.com" className="hover:text-gold-300 transition-colors font-semibold truncate hover:underline">
                  info@srilakshmiallcastematrimony.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Base bottom compliance details */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p id="copyright-text" className="font-medium text-stone-500 font-sans">
              &copy; {new Date().getFullYear()} {t('footer.copyright', 'Sri Lakshmi All Caste Matrimony. All Rights Reserved.', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని. సర్వ హక్కులూ ప్రత్యేకించబడినవి.')}
            </p>
            <span className="hidden sm:inline text-stone-700">|</span>
            <div className="flex items-center gap-1 bg-[#151c15] text-[#10b981] py-0.5 px-2.5 rounded-full font-bold font-sans">
              <ShieldCheck size={11} /> {t('footer.securedRegistry', 'Secured Matrimonial Registry', 'సురక్షితమైన వైవాహిక రిజిస్ట్రీ')}
            </div>
          </div>

          <div className="flex gap-4 font-bold text-[11px] items-center font-sans" id="compliance-links-group">
            <span className="text-gold-500 font-serif">శుభమస్తు</span>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">{t('footer.scrapingGuard', 'No Scraping Registry', 'స్క్రాపింగ్ ప్రొటెక్షన్ యాక్టివ్')}</span>
            <span className="text-stone-700">|</span>
            <span className="text-stone-400">{t('footer.privacy', 'Privacy Policy', 'గోప్యతా విధానం')}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
