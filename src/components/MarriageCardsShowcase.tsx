import React from 'react';
import { Sparkles, Calendar, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MarriageCardsShowcase() {
  const { setLanguage, t } = useLanguage();

  const marriageCardsList = [
    {
      id: 'TR-CARD-901',
      couple: 'Srinivas & Divya',
      caste: t('cards.caste1', 'Goud Community (Idiga)', 'గౌడ్ సామాజిక వర్గం (ఈడిగ)'),
      gotram: t('cards.gotram1', 'Shivabhakthula Gotram', 'శివభక్తుల గోత్రం'),
      muhurthamDate: t('cards.muh1', 'Sravanam', 'శ్రావణ మాసం'),
      venue: t('cards.venue1', 'Madhapur', 'మాధాపూర్'),
      bgImage: 'https://i.pinimg.com/1200x/36/14/4a/36144a108a15c108ad6031702b62e214.jpg',
      symbol: '🕉️'
    },
    {
      id: 'TR-CARD-902',
      couple: 'Rakesh & Haritha',
      caste: t('cards.caste2', 'Reddy (Pedakanti)', 'రెడ్డి (పెదకంటి)'),
      gotram: t('cards.gotram2', 'Chigullapalli Gotram', 'చిగుళ్ళపల్లి గోత్రం'),
      muhurthamDate: t('cards.muh2', 'Vijayadasami', 'విజయదశమి'),
      venue: t('cards.venue2', 'Vijayawada', 'విజయవాడ'),
      bgImage: 'https://i.pinimg.com/1200x/a7/b7/bd/a7b7bd8004c124e991643b2375e92d26.jpg',
      symbol: '🐘'
    },
    {
      id: 'TR-CARD-903',
      couple: 'Kiran & Priyanka',
      caste: t('cards.caste3', 'Kamma (Coastal Delta)', 'కమ్మ (కోస్టల్ డెల్టా)'),
      gotram: t('cards.gotram3', 'Anumolu Gotram', 'అనుమోలు గోత్రం'),
      muhurthamDate: t('cards.muh3', 'Karthika', 'కార్తీక మాసం'),
      venue: t('cards.venue3', 'Guntur', 'గుంటూరు'),
      bgImage: 'https://i.pinimg.com/736x/8a/41/3a/8a413a4a1cf800ef5a9c3679520e0267.jpg',
      symbol: '🦚'
    },
    {
      id: 'TR-CARD-904',
      couple: 'Anil & Sireesha',
      caste: t('cards.caste4', 'Kapu (Munnuru Kapu)', 'కాపు (మున్నూరు కాపు)'),
      gotram: t('cards.gotram4', 'Janardhana Gotram', 'జనార్ధన గోత్రం'),
      muhurthamDate: t('cards.muh4', 'Margasira', 'మార్గశిర మాసం'),
      venue: t('cards.venue4', 'Alwal Sec-bad', 'అల్వాల్ సికింద్రాబాద్'),
      bgImage: 'https://i.pinimg.com/736x/af/1f/f7/af1ff7fa730c7255fb5e5e98107755c6.jpg',
      symbol: '🔱'
    },
    {
      id: 'TR-CARD-905',
      couple: 'Venkatesh & Sravanthi',
      caste: t('cards.caste5', 'Arya Vysya Traditional', 'ఆర్య వైశ్య సంప్రదాయ'),
      gotram: t('cards.gotram5', 'Midhunakula Gotram', 'మిధునకులా గోత్రం'),
      muhurthamDate: t('cards.muh5', 'Phalguna', 'ఫాల్గుణ మాసం'),
      venue: t('cards.venue5', 'Kalyan Nagar', 'కళ్యాణ్ నగర్'),
      bgImage: 'https://i.pinimg.com/736x/22/6d/08/226d084e460eb52f0ca39eebfc084614.jpg',
      symbol: '🌻'
    },
    {
      id: 'TR-CARD-906',
      couple: 'Nagaraju & Lavanya',
      caste: t('cards.caste6', 'Yadava Sector', 'యాదవ సామాజిక వర్గం'),
      gotram: t('cards.gotram6', 'Krishnakula Gotram', 'కృష్ణకులా గోత్రం'),
      muhurthamDate: t('cards.muh6', 'Vaisakha', 'వైశాఖ మాసం'),
      venue: t('cards.venue6', 'Yadadri', 'యాదాద్రి'),
      bgImage: 'https://i.pinimg.com/1200x/71/06/2b/71062be8c59cba54d18e84e487989647.jpg',
      symbol: '🐄'
    },
    {
      id: 'TR-CARD-907',
      couple: 'Madhusudhan & Swathi',
      caste: t('cards.caste7', 'Padmashali (Markandeya)', 'పద్మశాలి (మార్కండేయ)'),
      gotram: t('cards.gotram7', 'Markandeya Gotram', 'మార్కండేయ గోత్రం'),
      muhurthamDate: t('cards.muh7', 'Sravanam', 'శ్రావణ మాసం'),
      venue: t('cards.venue7', 'Karimnagar', 'కరీంనగర్'),
      bgImage: 'https://i.pinimg.com/736x/7b/a7/2e/7ba72eedd548dd05fc73cefa164df6e6.jpg',
      symbol: '🧶'
    },
    {
      id: 'TR-CARD-908',
      couple: 'Bhaskar & Kalyani',
      caste: t('cards.caste8', 'Balija Clan', 'బలిజ వంశం'),
      gotram: t('cards.gotram8', 'Mutyalapalli Gotram', 'ముత్యాలపల్లి గోత్రం'),
      muhurthamDate: t('cards.muh8', 'Magham', 'మాఘ మాసం'),
      venue: t('cards.venue8', 'Tirupati', 'తిరుపతి'),
      bgImage: 'https://i.pinimg.com/1200x/55/ed/0e/55ed0e03655622a0b281f9424b69f132.jpg',
      symbol: '💍'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-cream-105 via-white to-cream-105 font-sans overflow-hidden border-y border-stone-200 relative">
      
      {/* Decorative Traditional Border topper */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-700 via-amber-450 to-red-700 opacity-90"></div>
      
      {/* Dynamic Keyframes for Marquee Scrolling */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10 animate-fade-in">
        
        <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-gold-300 px-3.5 py-1 rounded-full text-maroon-800 mb-3">
          <Sparkles size={11} className="text-gold-600 animate-pulse" />
          <span className="text-[10px] uppercase font-black tracking-widest text-[#991b1b] font-sans">
            {t('cards.ribbon', 'Endless Auspicious Vows', 'అంతులేని శుభ పరిణయ బంధాలు')}
          </span>
        </div>

        <h2 className="font-serif text-2.5xl sm:text-4.5xl font-black text-slate-900 tracking-tight">
          {t('cards.title', 'Lagna Patrika & Marriage Cards Gallery', 'లగ్న పత్రిక & వివాహ ఆహ్వాన పత్రికల గ్యాలరీ')}
        </h2>
        <p className="text-stone-605 text-xs sm:text-sm max-w-xl mx-auto mt-2 leading-relaxed font-semibold">
          {t(
            'cards.subtitle',
            'Admire the beautifully designed traditional wedding cards of verified couples married via Sri Lakshmi All Caste Matrimony support.',
            'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని సహకారంతో వైభవంగా వివాహం చేసుకున్న జంటల సాంప్రదాయ లగ్నపత్రికలను ఇక్కడ వీక్షించండి.'
          )}
        </p>
      </div>

      {/* Row 1: Scrolling Left */}
      <div className="relative w-full overflow-hidden py-6">
        <div className="animate-marquee-left gap-8">
          {[...marriageCardsList, ...marriageCardsList].map((card, idx) => (
            <div 
              key={`row1-${card.id}-${idx}`}
              onClick={() => setLanguage('te')}
              className="w-[280px] sm:w-[320px] h-[390px] sm:h-[430px] shrink-0 rounded-[24px] overflow-hidden shadow-lg border border-stone-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between group cursor-pointer select-none bg-stone-900"
            >
              
              {/* Back Image matching the design completely */}
              <img 
                src={card.bgImage} 
                alt={card.couple} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Overlay Gradient fading black to bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

              {/* Top Row: Pill Tag "★ Prime Pick" matching style */}
              <div className="p-5 flex justify-between items-start relative z-10 font-sans">
                <div className="bg-white text-stone-900 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <span className="text-amber-500 text-xs">★</span>
                  <span>{t('cards.primeAlliance', 'Prime Alliance', 'ఉత్తమ అనుబంధం')}</span>
                </div>
                <span className="text-2xl drop-shadow-md select-none">{card.symbol}</span>
              </div>

              {/* Bottom half text container matching image specs */}
              <div className="p-5 space-y-4 relative z-10 text-white font-sans">
                
                {/* Large Bold Primary Text line */}
                <div>
                  <span className="text-[10px] text-green-400 font-extrabold tracking-widest uppercase block mb-1">
                    {t('cards.successCouple', 'Success Couple', 'సఫలమైన జంట')}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                    {card.couple}
                  </h3>
                </div>

                {/* Subtext and vertical separator indicators */}
                <div className="grid grid-cols-12 gap-2 items-center text-stone-300 font-sans">
                  
                  {/* Left: Gotram and Caste */}
                  <div className="col-span-7 space-y-0.5">
                    <p className="text-[11px] sm:text-xs font-bold text-white truncate">{card.caste}</p>
                    <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate">{card.gotram}</p>
                  </div>

                  {/* Vertical Separator */}
                  <div className="col-span-1 h-8 border-l border-white/20 justify-self-center"></div>

                  {/* Right metadata columns resembling "📐 29m²" & "🏠 2" */}
                  <div className="col-span-4 grid grid-cols-2 gap-1 text-[10px] font-bold text-center font-sans">
                    <div className="space-y-0.5">
                      <Calendar size={12} className="text-amber-400 mx-auto" />
                      <p className="text-white text-[9px] truncate">{card.muhurthamDate}</p>
                    </div>
                    <div className="space-y-0.5">
                      <MapPin size={12} className="text-[#10b981] mx-auto" />
                      <p className="text-white text-[9px] truncate">{card.venue}</p>
                    </div>
                  </div>

                </div>

                {/* Horizontal white separator line */}
                <div className="h-[1px] bg-white/20 w-full"></div>

                {/* Bottom-most Brand Link footer: "By • Waleed Sabir 2 days ago" matches */}
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold font-sans">
                  <div className="flex items-center gap-1">
                    <span>{t('cards.by', 'By', 'ద్వారా')}</span>
                    <span className="text-white underline underline-offset-2 decoration-gold-400">{t('cards.brand', 'Sri Lakshmi All Caste Matrimony', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని')}</span>
                  </div>
                  <span className="text-green-400 font-black tracking-widest uppercase text-[9px] bg-[#10b981]/15 px-2 py-0.5 rounded border border-emerald-500/20">
                    {t('cards.vettedRegistry', 'Vetted Registry', 'ధృవీకరించబడిన రిజిస్ట్రీ')}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolling Right */}
      <div className="relative w-full overflow-hidden py-6">
        <div className="animate-marquee-right gap-8">
          {[...marriageCardsList].reverse().concat([...marriageCardsList].reverse()).map((card, idx) => (
            <div 
              key={`row2-${card.id}-${idx}`}
              onClick={() => setLanguage('te')}
              className="w-[280px] sm:w-[320px] h-[390px] sm:h-[430px] shrink-0 rounded-[24px] overflow-hidden shadow-lg border border-stone-200/50 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative flex flex-col justify-between group cursor-pointer select-none bg-stone-900"
            >
              
              {/* Back Image matching the design completely */}
              <img 
                src={card.bgImage} 
                alt={card.couple} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Dynamic Overlay Gradient fading black to bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none"></div>

              {/* Top Row: Pill Tag "★ Prime Pick" matching style */}
              <div className="p-5 flex justify-between items-start relative z-10 font-sans">
                <div className="bg-white text-stone-900 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <span className="text-amber-500 text-xs">★</span>
                  <span>{t('cards.lagnaPatrika', 'Lagna Patrika', 'లగ్న పత్రిక')}</span>
                </div>
                <span className="text-2xl drop-shadow-md select-none">{card.symbol}</span>
              </div>

              {/* Bottom half text container matching image specs */}
              <div className="p-5 space-y-4 relative z-10 text-white font-sans">
                
                {/* Large Bold Primary Text line */}
                <div>
                  <span className="text-[10px] text-yellow-400 font-extrabold tracking-widest uppercase block mb-1">
                    {t('cards.holyMuhurtham', 'Holy Muhurtham', 'శుభ ముహూర్తం')}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-black tracking-tight text-white drop-shadow-md">
                    {card.couple}
                  </h3>
                </div>

                {/* Subtext and vertical separator indicators */}
                <div className="grid grid-cols-12 gap-2 items-center text-stone-300 font-sans">
                  
                  {/* Left: Gotram and Caste */}
                  <div className="col-span-7 space-y-0.5">
                    <p className="text-[11px] sm:text-xs font-bold text-white truncate">{card.caste}</p>
                    <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium truncate">{card.gotram}</p>
                  </div>

                  {/* Vertical Separator */}
                  <div className="col-span-1 h-8 border-l border-white/20 justify-self-center"></div>

                  {/* Right metadata columns resembling "📐 29m²" & "🏠 2" */}
                  <div className="col-span-4 grid grid-cols-2 gap-1 text-[10px] font-bold text-center font-sans">
                    <div className="space-y-0.5">
                      <Calendar size={12} className="text-amber-400 mx-auto" />
                      <p className="text-white text-[9px] truncate">{card.muhurthamDate}</p>
                    </div>
                    <div className="space-y-0.5">
                      <MapPin size={12} className="text-[#10b981] mx-auto" />
                      <p className="text-white text-[9px] truncate">{card.venue}</p>
                    </div>
                  </div>

                </div>

                {/* Horizontal white separator line */}
                <div className="h-[1px] bg-white/20 w-full"></div>

                {/* Bottom-most Brand Link footer matches image author signature */}
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-bold font-sans">
                  <div className="flex items-center gap-1">
                    <span>{t('cards.by', 'By', 'ద్వారా')}</span>
                    <span className="text-white underline underline-offset-2 decoration-gold-400">{t('cards.brand', 'Sri Lakshmi All Caste Matrimony', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని')}</span>
                  </div>
                  <span className="text-yellow-400 font-black tracking-widest uppercase text-[9px] bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20">
                    {t('cards.grandWedding', 'Grand Wedding', 'మహా వివాహం')}
                  </span>
                </div>

              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Trust validation note */}
      <div className="max-w-4xl mx-auto px-4 mt-8 text-center relative z-10 font-sans animate-fade-in">
        <div className="inline-flex items-center justify-center gap-2 text-stone-500 text-xs font-semibold bg-stone-105 px-4 py-2 rounded-xl border border-stone-200 shadow-xs">
          <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
          <span>
            {t(
              'cards.trustNotice',
              'All visual templates and alliance invites are displayed strictly upon approval of brides and grooms families.',
              'అన్ని లగ్నపత్రికలు మరియు ఆహ్వాన పత్రాలు వధూవరుల కుటుంబాల ముందస్తు అనుమతితో మాత్రమే ప్రదర్శించబడుతున్నాయి.'
            )}
          </span>
        </div>
      </div>

    </section>
  );
}
