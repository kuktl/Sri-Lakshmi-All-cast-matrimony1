import { useLanguage } from '../context/LanguageContext';

export default function TrustStats() {
  const { t } = useLanguage();

  const stats = [
    {
      value: t('stats.exp.value', '7+ Years Experience', '7+ సంవత్సరాల అనుభవం'),
      label: t('stats.exp.label', 'Years of Trustworthy Service', 'నమ్మకమైన సేవలు'),
      description: t('stats.exp.desc', 'Serving Telugu families since 2019', '2019 నుండి తెలుగు కుటుంబాలకు సేవ చేస్తున్నాము')
    },
    {
      value: t('stats.matches.value', '80+ Matches', '80+ కి పైగా మ్యాచెస్'),
      label: t('stats.matches.label', 'Successful Matrimonial Unions', 'విజయవంతమైన వివాహాలు'),
      description: t('stats.matches.desc', 'Happy families successfully united', 'సంతోషకరమైన కుటుంబాల కలయిక')
    },
    {
      value: t('stats.profiles.value', '1,000+ Profiles', '1,000+ కి పైగా ప్రొఫైల్స్'),
      label: t('stats.profiles.label', 'Verified Candidates Registered', 'ధృవీకరించబడిన ప్రొఫైల్స్'),
      description: t('stats.profiles.desc', 'Vetted family backgrounds', 'కచ్చితమైన కుటుంబ నేపథ్యం')
    },
    {
      value: t('stats.cities.value', '2+ Cities Served', '2+ నగరాలలో సేవలు'),
      label: t('stats.cities.label', 'Regions & Overseas Segments', 'ప్రాంతీయ ప్రాతినిధ్యం'),
      description: t('stats.cities.desc', 'TS, AP & global Telugu NRI network', 'తెలంగాణ, ఆంధ్రప్రదేశ్ & గ్లోబల్ ప్రవాసాంధ్రులు')
    }
  ];

  return (
    <section id="trust-stats-section" className="relative z-10 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative Gold & Maroon Container Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gold-300/30 overflow-hidden marigold-glow">
        {/* Top Gold pattern border */}
        <div className="h-1.5 bg-gradient-to-r from-maroon-800 via-gold-400 to-maroon-800"></div>
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-stone-100">
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              id={`stat-card-${idx}`}
              className="p-6 sm:p-8 text-center hover:bg-cream-100/30 transition-all group"
            >
              {/* Value displaying elegant traditional serif typography */}
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-maroon-900 group-hover:text-gold-600 transition-colors duration-300 tracking-tight">
                {stat.value}
              </div>
              
              {/* Header title */}
              <div className="text-xs sm:text-sm font-semibold text-stone-700 mt-2 uppercase tracking-wide">
                {stat.label}
              </div>

              {/* Sub description */}
              {stat.description && (
                <div className="text-[11px] text-stone-400 font-medium mt-1">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
