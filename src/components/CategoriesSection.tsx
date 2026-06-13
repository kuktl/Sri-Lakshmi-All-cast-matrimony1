import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CategoriesSectionProps {
  onCategoryClick: (gender: 'Bride' | 'Groom') => void;
}

export default function CategoriesSection({ onCategoryClick }: CategoriesSectionProps) {
  const { setLanguage, t } = useLanguage();

  const handleCategoryClick = (gender: 'Bride' | 'Groom') => {
    setLanguage('te');
    onCategoryClick(gender);
  };

  return (
    <section id="categories-section" className="py-20 bg-white relative overflow-hidden">
      
      {/* Decorative Gold & Maroon Mandalas */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 opacity-5 text-maroon-700 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon-900">
          <path d="M50 0 C60 25 75 40 100 50 C75 60 60 75 50 100 C40 75 25 60 0 50 C25 40 40 25 50 0" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-950 tracking-tight leading-tight">
            {t('categories.title', 'Discover Verified Matches by Community Segments', 'వర్గాల అనుసారంగా ధృవీకరించబడిన ప్రొఫైల్స్ కనుగొనండి')}
          </h2>
          <p className="text-stone-605 text-sm sm:text-base mt-3 leading-relaxed font-medium">
            {t(
              'categories.desc',
              'Begin your search by filtering candidates within your target segment. Hand-verified profiles are categorized separately for brides and grooms with robust data containment.',
              'మీకు కావలసిన విభాగం ఆధారంగా సంబంధాలను ఎంచుకోండి. వధువులు మరియు వరుల వర్గాల కనుగుణంగా ప్రతి ప్రొఫైల్ పక్కాగా వర్గీకరించబడింది.'
            )}
          </p>
        </div>

        {/* Two Large Side-by-Side Cards (Goud Brides / Goud Grooms) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto font-sans">
          
          {/* Card 1: Goud Brides */}
          <div 
            className="group relative h-[380px] rounded-3xl overflow-hidden shadow-xl border border-gold-400/20 hover:border-gold-400 transition-all duration-500 cursor-pointer"
            onClick={() => handleCategoryClick('Bride')}
          >
            {/* Background Image: Indian Bride */}
            <img 
              src="https://i.pinimg.com/1200x/05/b7/e2/05b7e2649fe5521a8db4fffe79fb998e.jpg" 
              alt="Telugu Brides Category representing Goud Brides" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms]"
              referrerPolicy="no-referrer"
            />
            
            {/* Dark Traditional Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-900/45 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-4">
              
              <div className="w-10 h-10 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center shadow-md">
                <Heart size={20} className="fill-maroon-950 text-maroon-950" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-300">
                  {t('categories.brideBadge', 'Aadapillalu (100% Verified)', 'ఆడపిల్లలు (100% ధృవీకరించబడినవి)')}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {t('categories.brideTitle', 'Telugu Brides', 'తెలుగు వధువులు')}
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm mt-2 font-medium leading-relaxed max-w-md">
                  {t(
                    'categories.brideDesc',
                    'Explore profiles of highly educated and well-settled brides across Reddy, Kamma, Kapu, Goud, Arya Vysya, Yadava, Padmashali, Balija, and other Telugu communities.',
                    'రెడ్డి, కమ్మ, కాపు, గౌడ్, ఆర్య వైశ్య, యాదవ, పద్మశాలి, బలిజ మొదలైన వివిధ తెలుగు సామాజిక వర్గాలకు చెందిన విద్యావంతులైన వధువుల వివరాలు.'
                  )}
                </p>
              </div>

              {/* View Profiles Button */}
              <div className="pt-2">
                <button
                  id="categories-brides-btn"
                  className="px-6 py-2.5 text-xs font-bold text-maroon-950 bg-gold-300 hover:bg-gold-400 rounded-xl transition-all flex items-center gap-2 group/btn cursor-pointer border-none"
                >
                  <span>{t('categories.brideBtn', 'View Bride Profiles', 'వధువు ప్రొఫైల్స్ వీక్షించండి')}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

          {/* Card 2: Goud Grooms */}
          <div 
            className="group relative h-[380px] rounded-3xl overflow-hidden shadow-xl border border-gold-400/20 hover:border-gold-400 transition-all duration-500 cursor-pointer"
            onClick={() => handleCategoryClick('Groom')}
          >
            {/* Background Image: Indian Groom */}
            <img 
              src="https://i.pinimg.com/1200x/61/0f/45/610f45aec03f8ed000981f82a9d713cf.jpg" 
              alt="Telugu Grooms Category representing Goud Grooms" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms]"
              referrerPolicy="no-referrer"
            />
            
            {/* Dark Traditional Gradient Overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950 via-maroon-900/45 to-transparent"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white space-y-4">
              
              <div className="w-10 h-10 rounded-full bg-gold-500 text-maroon-950 flex items-center justify-center shadow-md">
                <Sparkles size={20} className="fill-maroon-300 text-maroon-950" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-300">
                  {t('categories.groomBadge', 'Abbayilu (100% Verified)', 'అబ్బాయిలు (100% ధృవీకరించబడినవి)')}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {t('categories.groomTitle', 'Telugu Grooms', 'తెలుగు వరులు')}
                </h3>
                <p className="text-stone-200 text-xs sm:text-sm mt-2 font-medium leading-relaxed max-w-md">
                  {t(
                    'categories.groomDesc',
                    'Discover professionally settled grooms (Software, Business, Govt Sector, Doctors, and NRIs) across different Telugu communities. Connect directly with trustworthy families.',
                    'సాఫ్ట్‌వేర్, బిజినెస్, ప్రభుత్వ ఉద్యోగాలు, డాక్టర్లు మరియు ఎన్ఆర్ఐ వరుల ప్రొఫైల్స్. నేరుగా కుటుంబాలతో మాట్లాడండి.'
                  )}
                </p>
              </div>

              {/* View Profiles Button */}
              <div className="pt-2">
                <button
                  id="categories-grooms-btn"
                  className="px-6 py-2.5 text-xs font-bold text-maroon-950 bg-gold-300 hover:bg-gold-400 rounded-xl transition-all flex items-center gap-2 group/btn cursor-pointer border-none"
                >
                  <span>{t('categories.groomBtn', 'View Groom Profiles', 'వరుడు ప్రొఫైల్స్ వీక్షించండి')}</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
