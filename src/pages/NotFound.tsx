import React from 'react';
import { HelpCircle, Home, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NotFoundProps {
  navigateToPage: (page: string) => void;
}

export default function NotFound({ navigateToPage }: NotFoundProps) {
  const { language, t } = useLanguage();

  return (
    <div className="bg-cream-50 font-sans min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-stone-200 p-8 text-center space-y-6 relative overflow-hidden">
        {/* traditional frame accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#10b981] via-amber-200 to-[#10b981]"></div>

        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-800 mx-auto border border-emerald-100 shadow-sm animate-bounce">
          <HelpCircle size={32} className="text-[#10b981]" />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3.5xl font-extrabold text-stone-900">404</h1>
          <h2 className="font-serif text-base sm:text-lg font-bold text-stone-850">
            {t('notfound.title', 'Sacred Path Not Found', 'పరిణయ మార్గం కనుగొనబడలేదు')}
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
            {t(
              'notfound.desc',
              'The matrimonial page or candidate index file you are seeking may have been shifted or matched successfully into our archives.',
              'మీరు వెతుకుతున్న పేజీ లేదా వరుని/వధువు ప్రొఫైల్ వివరాలు నివేదించబడలేదు లేదా విజయవంతంగా సరిపోల్చి ఆర్కైవ్‌ చేయబడ్డాయి.'
            )}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigateToPage('home')}
            className="flex-1 py-2.5 px-4 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer border-none"
          >
            <Home size={14} /> {t('notfound.homeBtn', 'Back to Home', 'హోమ్ పేజీకి వెళ్లండి')}
          </button>
          <button
            onClick={() => navigateToPage('contact')}
            className="flex-1 py-2.5 px-4 border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white"
          >
            <Phone size={14} /> {t('notfound.contactBtn', 'Contact Support', 'సహాయక సిబ్బంది')}
          </button>
        </div>
      </div>
    </div>
  );
}
