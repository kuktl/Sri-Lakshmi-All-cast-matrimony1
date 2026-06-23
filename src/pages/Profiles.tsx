import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { Lock, CheckCircle, HelpCircle, MapPin, Briefcase } from 'lucide-react';
import ProfileCard from '../components/ProfileCard';
import { useLanguage } from '../context/LanguageContext';
import { fetchApprovedProfiles, submitLead } from '../lib/api';
import { displayRef } from '../lib/format';
import { PROFESSION_OPTIONS } from '../lib/options';

interface ProfilesPageProps {
  navigateToPage: (page: string) => void;
  activeGender: 'All' | 'Bride' | 'Groom';
  setActiveGender: (gender: 'All' | 'Bride' | 'Groom') => void;
}

export default function Profiles({ navigateToPage, activeGender, setActiveGender }: ProfilesPageProps) {
  const { language, t } = useLanguage();
  // Filters state
  const [activeProfession, setActiveProfession] = useState<string>('All');
  const [activeCaste, setActiveCaste] = useState<'All' | 'Reddy' | 'Kamma' | 'Kapu' | 'Goud' | 'Brahmin' | 'Arya Vysya' | 'Yadav' | 'Other'>('All');
  
  // Load approved profiles from the backend API for public display.
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchApprovedProfiles()
      .then((profiles) => {
        if (active) setAllProfiles(profiles);
      })
      .catch((err) => console.error('Failed to load profiles', err))
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // Request modal state
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [requestName, setRequestName] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [requestRelationship, setRequestRelationship] = useState('Parent');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Profile filter execution
  const filteredProfiles = allProfiles.filter((profile) => {
    // 1. Gender Filter
    const matchesGender = activeGender === 'All' || profile.gender === activeGender;

    // 2. Profession / Designation Filter (exact match against the shared list)
    const matchesProfession = activeProfession === 'All' || profile.profession === activeProfession;

    // 3. Caste Filter
    let matchesCaste = true;
    if (activeCaste !== 'All') {
      if (activeCaste === 'Other') {
        matchesCaste = !['reddy', 'kamma', 'kapu', 'goud', 'brahmin', 'arya vysya', 'yadav'].includes(profile.community.toLowerCase());
      } else {
        matchesCaste = profile.community.toLowerCase() === activeCaste.toLowerCase();
      }
    }

    return matchesGender && matchesProfession && matchesCaste;
  });

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestName || !requestPhone || !selectedProfile) return;

    // Persist the detail request as a lead in Supabase via the API.
    try {
      await submitLead({
        source: 'profile_request',
        full_name: requestName.trim(),
        phone: requestPhone.trim(),
        community: selectedProfile.community,
        profile_id: selectedProfile.id,
        message: `Relationship to candidate: ${requestRelationship}.`,
      });
    } catch (err) {
      console.error('Failed to submit profile request', err);
    }

    setRequestSubmitted(true);

    const text = `Namaste Sri Lakshmi All Caste Matrimony,\nI am requesting bio details for Profile ${selectedProfile.id}:\n\n*My Details:*\n- Requesting Person: ${requestName}\n- Phone: ${requestPhone}\n- Relationship: ${requestRelationship}\n\n*Target Profile:*\n- Profile ID: ${selectedProfile.id}\n- Community: ${selectedProfile.community}\n- Role: ${selectedProfile.gender}\n- Profession: ${selectedProfile.profession}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/917386915677?text=${encoded}`;
    try {
      window.open(url, '_blank', 'noreferrer,noopener');
    } catch (err) {
      console.error("Popup failed", err);
    }

    setTimeout(() => {
      setRequestSubmitted(false);
      setRequestName('');
      setRequestPhone('');
      setSelectedProfile(null);
    }, 3500);
  };

  const handleResetFilters = () => {
    setActiveGender('All');
    setActiveProfession('All');
    setActiveCaste('All');
  };

  return (
    <div className="bg-cream-50 font-sans min-h-screen">
      
      {/* 1. Header / Hero Section */}
      <section 
        className="bg-cover bg-center py-24 sm:py-28 text-center text-white relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(30, 8, 8, 0.90), rgba(20, 5, 5, 0.85)), url('https://i.pinimg.com/1200x/24/d0/c9/24d0c9ded2f63ec7c3159e4381bb36cf.jpg')"
        }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-450 text-xs tracking-widest uppercase font-bold">
              {t('profiles.bannerBadge', 'Verified Telugu Communities', 'ధృవీకరించబడిన తెలుగు సంఘాలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('profiles.bannerTitle', 'Explore Verified Bride & Groom Profiles', 'ధృవీకరించబడిన వధువు & వరుల ప్రొఫైల్స్')}
          </h1>
          <p className="text-gold-200/90 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'profiles.bannerDesc',
              'Browse through reliable prospective profiles covering Reddy, Kamma, Kapu, Goud, Arya Vysya, Yadav, Padmashali, Balija, and other Telugu castes.',
              'రెడ్డి, కమ్మ, కాపు, గౌడ్, ఆర్య వైశ్య, యాదవ్, పద్మశాలి, బలిజ మరియు ఇతర తెలుగు కులాల విశ్వసనీయ ప్రొఫైల్స్ పరిశీలించండి.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Interactive Filters Center */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gold-100/45 p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-lg text-maroon-950">
                {t('profiles.criteria', 'Specify Match Criteria', 'మ్యాచ్ అర్హతలు ఎంచుకోండి')}
              </h3>
              <p className="text-stone-450 text-xs">
                {t('profiles.criteriaDesc', 'Filter results instantly using community presets', 'కులం మరియు ఇతర ఫిల్టర్ల సహాయంతో ప్రొఫైల్స్ ఫిల్టర్ చేయండి')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Gender Filters Tab Options */}
            <div className="md:col-span-4 space-y-2">
              <span className="block text-[10px] uppercase tracking-widest font-bold text-stone-400">
                {t('profiles.genderSelect', 'Gender Selection', 'లింగ ఎంపిక')}
              </span>
              <div className="flex bg-stone-100 p-1 rounded-xl">
                {(['All', 'Bride', 'Groom'] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setActiveGender(gender)}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      activeGender === gender 
                        ? 'bg-maroon-800 text-white shadow-xs' 
                        : 'text-stone-600 hover:text-maroon-900'
                    }`}
                  >
                    {gender === 'All' 
                      ? t('profiles.genderAll', 'All', 'అన్నీ') 
                      : gender === 'Bride' 
                        ? t('profiles.brides', 'Brides', 'వధువులు') 
                        : t('profiles.grooms', 'Grooms', 'వరులు')}
                  </button>
                ))}
              </div>
            </div>


            {/* Profession / Designation Select Filter */}
            <div className="md:col-span-4 space-y-2">
              <span className="block text-[10px] uppercase tracking-widest font-bold text-stone-400">
                {t('profiles.professionSelect', 'Designation', 'ఉద్యోగ హోదా')}
              </span>
              <div className="relative">
                <select
                  value={activeProfession}
                  onChange={(e) => setActiveProfession(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:ring-1 focus:ring-maroon-800 bg-white font-bold text-stone-700 cursor-pointer min-h-[38px] transition-all"
                >
                  <option value="All">{t('profiles.allJobs', 'All Designations', 'అన్ని ఉద్యోగాలు')}</option>
                  {PROFESSION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Caste / Community Select Filter */}
            <div className="md:col-span-4 space-y-2">
              <span className="block text-[10px] uppercase tracking-widest font-bold text-stone-400 font-sans">
                {t('profiles.casteSelect', 'Caste / Community', 'కులం ఎంపిక')}
              </span>
              <div className="relative">
                <select
                  value={activeCaste}
                  onChange={(e) => setActiveCaste(e.target.value as any)}
                  className="w-full text-xs rounded-xl border border-stone-200 p-2.5 outline-none focus:ring-1 focus:ring-maroon-800 bg-white font-bold text-stone-700 cursor-pointer min-h-[38px] transition-all"
                >
                  <option value="All">{t('profiles.allCastes', 'All Castes (అన్ని కులాలు)', 'అన్ని కులాలు')}</option>
                  <option value="Reddy">Reddy (రెడ్డి)</option>
                  <option value="Kamma">Kamma (కమ్మ)</option>
                  <option value="Kapu">Kapu (కాపు)</option>
                  <option value="Goud">Goud (గౌడ్)</option>
                  <option value="Brahmin">Brahmin (బ్రాహ్మణ)</option>
                  <option value="Arya Vysya">Arya Vysya (ఆర్య వైశ్య)</option>
                  <option value="Yadav">Yadav (యాదవ్)</option>
                  <option value="Other">{t('profiles.otherCastes', 'Other/All Castes', 'ఇతర కులాలు')}</option>
                </select>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Profiles List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="text-center py-16 text-stone-400 text-sm">
            {t('profiles.loading', 'Loading verified profiles…', 'ప్రొఫైల్స్ లోడ్ అవుతున్నాయి…')}
          </div>
        ) : filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard 
                key={profile.id}
                profile={profile} 
                onRequestDetails={setSelectedProfile} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200/50 p-8 max-w-lg mx-auto">
            <HelpCircle size={44} className="mx-auto text-stone-300 mb-3" />
            <h4 className="font-serif text-lg font-bold text-stone-700">
              {t('profiles.noMatches', 'No profile matches found', 'ఎలాంటి ప్రొఫైల్స్ లభించలేదు')}
            </h4>
            <p className="text-stone-500 text-xs mt-1 leading-relaxed">
              {t(
                'profiles.noMatchesDesc',
                "We can't match any portfolios with your selected combination. Try switching search presets or cleaning filters.",
                "మీరు ఎంచుకున్న వివరాలతో ప్రొఫైల్స్ సరిపోలడం లేదు. దయచేసి ఇతర ఎంపికలను ప్రయత్నించండి."
              )}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-maroon-800 hover:bg-maroon-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              {t('profiles.clearAll', 'Clear All Filters', 'అన్ని ఫిల్టర్లను తుడిచివేయండి')}
            </button>
          </div>
        )}
      </section>

      {/* 4. Privacy Notification Center */}
      <section className="bg-white py-12 border-t border-b border-stone-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mx-auto text-gold-650">
            <Lock size={20} />
          </div>
          <h3 className="font-serif font-bold text-lg text-maroon-950">
            {t('profiles.privacyNotice', 'Privacy Protection Notice', 'వ్యక్తిగత సమాచార భద్రతా నోటీసు')}
          </h3>
          <p className="text-stone-650 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t(
              'profiles.privacyDesc',
              'To protect family privacy, full profile details and contact information are shared only after registration and verification. We never openly distribute private telephone credentials or physical house locations on global search databases.',
              'కుటుంబ గోప్యతను కాపాడటానికి, పూర్తి బయోడేటా వివరాలు మరియు ఫోన్ నంబర్లు కేవలం రిజిస్ట్రేషన్ మరియు ధృవీకరణ పూర్తయిన తర్వాతే భాగస్వామ్యం చేయబడతాయి. మేము ఫోన్ నంబర్లను లేదా ఇంటి చిరునామాలను పబ్లిక్ డేటాబేస్ లో ఎప్పుడూ లీక్ చేయము.'
            )}
          </p>
        </div>
      </section>

      {/* 5. Register CTA */}
      <section className="py-16 bg-cream-100/30 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-maroon-950">
            {t('profiles.ctaTitle', 'Ready to find your matches across Telugu communities?', 'తెలుగు కులాలలో మీ సరైన జోడిని కనుగొనడానికి సిద్ధంగా ఉన్నారా?')}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            {t(
              'profiles.ctaDesc',
              'Upload your credentials now! Get manually verified profiles shortlisted by our head matchmaking officers.',
              'ఇప్పుడే మీ సమాచారం అప్‌లోడ్ చేసి, మా సీనియర్ వివాహ అధికారుల ద్వారా ధృవీకరించబడిన ప్రొఫైల్స్ సిద్ధంగా చేసుకోండి.'
            )}
          </p>
          <button
            onClick={() => navigateToPage('register')}
            className="px-6 py-3 bg-maroon-800 hover:bg-maroon-950 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-block"
          >
            {t('profiles.ctaBtn', 'Register Your Profile Now', 'మీ ప్రొఫైల్‌ను వెంటనే నమోదు చేసుకోండి')}
          </button>
        </div>
      </section>

      {/* Detail request popup overlay */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-3xl border border-gold-300/40 shadow-2xl overflow-hidden animate-zoom-in">
            <div className="bg-maroon-900 text-white px-6 py-4">
              <h3 className="font-serif text-sm sm:text-base font-bold">
                {t('profiles.reqDetailsTitle', 'Request Details:', 'వివరాల కొరకు అభ్యర్థన:')} {displayRef(selectedProfile.id)}
              </h3>
              <p className="text-xs text-maroon-200">
                {selectedProfile.community} {selectedProfile.gender === 'Bride' ? t('profiles.brideSimp', 'Bride', 'వధువు') : t('profiles.groomSimp', 'Groom', 'వరుడు')} • {selectedProfile.age} {t('profiles.yrs', 'Yrs', 'సంవత్సరాలు')} • {selectedProfile.profession}
              </p>
            </div>
            
            <div className="p-6">
              {requestSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="text-green-500 bg-green-50 p-4 rounded-full border border-green-200 mb-4 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-maroon-900 mb-1">
                    {t('profiles.reqProcessed', 'Request Processed', 'మీ అభ్యర్థన విజయవంతమైంది')}
                  </h4>
                  <p className="text-stone-650 text-xs max-w-xs leading-relaxed">
                    {t(
                      'profiles.reqProcessedDesc',
                      'We have submitted your request for profiles match. Our senior matchmaking advisor will contact you shortly to coordinate detail swaps.',
                      'మేము మీ అభ్యర్థనను సమర్పించాము. వివరాల కొరకు మా సీనియర్ మ్యాచ్ మేకింగ్ సలహాదారు మిమ్మల్ని த్వరలో సంప్రదిస్తారు.'
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRequestSubmit} className="space-y-4">
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {t(
                      'profiles.submitPhoneText',
                      'Please submit your parent/candidate phone number. This secure verification connects matching biological details safely with families.',
                      'దయచేసి తల్లిదండ్రులు లేదా అభ్యర్థి ఫోన్ నంబర్‌ను సబ్మిట్ చేయండి. ఈ ధృవీకరణ ద్వారా ఇరు కుటుంబాల మధ్య చర్చలు ప్రారంభిస్తాము.'
                    )}
                  </p>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formName', 'Parent / Member Name', 'తల్లిదండ్రులు / సభ్యుని పేరు')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('profiles.formNamePlace', 'Enter legal name', 'పూర్తి పేరు వ్రాయండి')}
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formPhone', 'Phone Number', 'ఫోన్ నంబర్')}
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      required
                      maxLength={12}
                      pattern="[0-9]{10,12}"
                      title="Enter a 10-digit mobile number"
                      placeholder={t('profiles.formPhonePlace', '10-digit mobile phone', '10 అంకెల మొబైల్ నంబర్')}
                      value={requestPhone}
                      onChange={(e) => setRequestPhone(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formRelationship', 'Relationship to Candidate', 'అభ్యర్థితో గల సంబంధం')}
                    </label>
                    <select
                      value={requestRelationship}
                      onChange={(e) => setRequestRelationship(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    >
                      <option value="Parent">{t('profiles.relParent', 'Parent (Galli / Tallidandrulu)', 'తల్లిదండ్రులు')}</option>
                      <option value="Self">{t('profiles.relSelf', 'Self (Candidate)', 'స్వయంగా (అభ్యర్థి)')}</option>
                      <option value="Sibling">{t('profiles.relSibling', 'Sibling (Brother/Sister)', 'తోబుట్టువు (అన్న/తమ్ముడు/అక్క/చెల్లి)')}</option>
                      <option value="Relative">{t('profiles.relOther', 'Relative / Guardian', 'బంధువు / సంరక్షకుడు')}</option>
                    </select>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProfile(null)}
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold border border-stone-200 hover:bg-stone-50 text-stone-650 cursor-pointer bg-white"
                    >
                      {t('profiles.cancel', 'Cancel', 'రద్దు చేయి')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2 px-4 rounded-xl text-xs font-bold bg-maroon-800 hover:bg-maroon-900 text-white shadow-md cursor-pointer border-none"
                    >
                      {t('profiles.submitBtn', 'Request Details', 'వివరాలను అభ్యర్థించండి')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
