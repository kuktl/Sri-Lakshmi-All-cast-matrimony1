import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { Lock, FileText, CheckCircle, Search, Filter, HelpCircle, Heart, MapPin, Briefcase, Eye, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { fetchApprovedProfiles, submitLead } from '../lib/api';
import { displayRef } from '../lib/format';

interface ProfileShowcaseProps {
  onRegisterScroll: () => void;
  activeTab: 'All' | 'Bride' | 'Groom';
  setActiveTab: (tab: 'All' | 'Bride' | 'Groom') => void;
}

export default function ProfileShowcase({ onRegisterScroll, activeTab, setActiveTab }: ProfileShowcaseProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [searchEducation, setSearchEducation] = useState('');
  const { t } = useLanguage();
  
  // Detail Request modal state
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [photoProfile, setPhotoProfile] = useState<Profile | null>(null);
  const [requestName, setRequestName] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [requestRelationship, setRequestRelationship] = useState('Parent');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Load approved profiles from the backend API for the featured showcase.
  const [allProfiles, setAllProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    let active = true;
    fetchApprovedProfiles()
      .then((profiles) => {
        if (active) setAllProfiles(profiles);
      })
      .catch((err) => console.error('Failed to load profiles', err));
    return () => {
      active = false;
    };
  }, []);

  // Filter profiles based on tabs and search query using allProfiles
  const filteredProfiles = allProfiles.filter((profile) => {
    const matchesTab = activeTab === 'All' || profile.gender === activeTab;
    const matchesLocation = profile.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesEducation = profile.education.toLowerCase().includes(searchEducation.toLowerCase()) || 
                             profile.profession.toLowerCase().includes(searchEducation.toLowerCase());
    return matchesTab && matchesLocation && matchesEducation;
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
        message: `Requested details for profile ${selectedProfile.id} (${selectedProfile.community} ${selectedProfile.gender}, ${selectedProfile.profession}). Relationship: ${requestRelationship}`,
      });
    } catch (err) {
      console.error('Failed to submit profile request', err);
    }

    setRequestSubmitted(true);

    const text = `Namaste Sri Lakshmi All Caste Matrimony,\nI am requesting bio details for Profile ${selectedProfile.id}:\n\n*My Details:*\n- Requesting Person: ${requestName}\n- Phone: ${requestPhone}\n- Relationship: ${requestRelationship}\n\n*Target Profile:*\n- Profile ID: ${selectedProfile.id}\n- Community: ${selectedProfile.community}\n- Role: ${selectedProfile.gender}\n- Profession: ${selectedProfile.profession}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/919121594223?text=${encoded}`;
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
    }, 4000);
  };

  return (
    <section id="profiles-section" className="py-16 bg-cream-100/50 sawtooth-bg relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-maroon-950 tracking-tight">
            {t('showcase.title', 'Explore Verified Bride & Groom Profiles', 'వెరిఫైడ్ వధూవరుల ప్రొఫైల్స్ పరిశీలించండి')}
          </h2>
          <p className="text-stone-500 text-sm mt-3 leading-relaxed">
            {t(
              'showcase.desc',
              'Browse verified prospects across respected Telugu communities. Complete details regarding horoscope, family background, and photographs are locked to safeguard candidate privacy.',
              'గౌరవనీయమైన వివిధ తెలుగు సమాజాలకు చెందిన ధృవీకరించబడిన ప్రొఫైల్స్ వీక్షించండి. కుటుంబ గోప్యతను కాపాడటానికి జాతకం, కుటుంబ నేపథ్యం మరియు ఫొటోలు భద్రపరచబడ్డాయి.'
            )}
          </p>
        </div>

        {/* Dynamic Filters Bar */}
        <div className="bg-white rounded-2xl shadow-md border border-stone-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            
            {/* Gender Switch Tabs */}
            <div className="flex bg-stone-100 p-1.5 rounded-xl w-full lg:w-auto" id="profile-gender-tabs">
              {(['All', 'Bride', 'Groom'] as const).map((tab) => (
                <button
                  key={tab}
                  id={`tab-filter-${tab.toLowerCase()}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 lg:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeTab === tab 
                      ? 'bg-maroon-800 text-white shadow-sm' 
                      : 'text-stone-600 hover:text-maroon-800'
                  }`}
                >
                  {tab === 'All' 
                    ? t('showcase.tabAll', 'All Profiles', 'మొత్తం ప్రొఫైల్స్') 
                    : tab === 'Bride' 
                      ? t('showcase.tabBride', 'Brides (Aadapillalu)', 'వధువులు (ఆడపిల్లలు)') 
                      : t('showcase.tabGroom', 'Grooms (Abbayilu)', 'వరులు (అబ్బాయిలు)')}
                </button>
              ))}
            </div>

            {/* In-Line Quick Search Inputs */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 flex-grow lg:justify-end">
              <div className="relative flex-1 max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                  <MapPin size={14} />
                </span>
                <input
                  id="filter-location-input"
                  type="text"
                  placeholder={t('showcase.filterLoc', 'Filter by Location... (e.g. Hyderabad)', 'ప్రాంతం ద్వారా వెతకండి... (ఉదా. హైదరాబాద్)')}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-600 focus:bg-stone-50/50"
                />
              </div>

              <div className="relative flex-1 max-w-xs">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                  <Briefcase size={14} />
                </span>
                <input
                  id="filter-education-input"
                  type="text"
                  placeholder={t('showcase.filterEdu', 'Education / Profession...', 'విద్య / వృత్తి ద్వారా...')}
                  value={searchEducation}
                  onChange={(e) => setSearchEducation(e.target.value)}
                  className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-600 focus:bg-stone-50/50"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Profiles Cards Grid */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="profiles-grid">
            {filteredProfiles.map((profile) => (
              <div 
                key={profile.id}
                id={`profile-card-${profile.id}`}
                className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Visual Traditional Frame Accent */}
                <div className="absolute top-0 left-0 w-2 h-full bg-maroon-800/10 group-hover:bg-maroon-800 transition-colors"></div>

                {/* Card Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4 pl-2 font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-maroon-900 bg-maroon-50 px-2.5 py-1 rounded-md border border-maroon-100">
                      {displayRef(profile.id)}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                    profile.gender === 'Bride'
                      ? 'text-pink-700 bg-pink-50 border-pink-200' 
                      : 'text-blue-700 bg-blue-50 border-blue-200'
                  }`}>
                    {profile.community} {profile.gender === 'Bride' ? t('profiles.brideSimp', 'Bride', 'వధువు') : t('profiles.groomSimp', 'Groom', 'వరుడు')}
                  </span>
                </div>

                {/* Profile Core Metas */}
                <div className="space-y-3.5 flex-grow pl-2">
                  <div className="flex items-start gap-3.5">
                    {/* Candidate Photo / Monogram */}
                    <div className="relative flex-none">
                      {profile.imageUrl ? (
                        <div className={`w-15 h-15 rounded-full overflow-hidden border-2 shadow-sm ${
                          profile.gender === 'Bride' ? 'border-maroon-800' : 'border-gold-500'
                        }`}>
                          <img 
                            src={profile.imageUrl} 
                            alt={`${profile.gender} portrait`}
                            className="w-full h-full object-cover filter brightness-[0.98]"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-serif text-lg font-bold border-2 ${
                          profile.gender === 'Bride'
                            ? 'bg-gradient-to-br from-pink-100 to-amber-100 text-pink-900 border-pink-300'
                            : 'bg-gradient-to-br from-blue-100 to-gold-200 text-blue-950 border-blue-300'
                        }`}>
                          {profile.gender === 'Bride' ? 'F' : 'M'}
                        </div>
                      )}
                      <div className="absolute -bottom-1.5 -right-1.5 bg-gold-450 p-0.5 rounded-full border border-white text-stone-900 shadow-sm" title="Community Verified">
                        <CheckCircle size={11} className="fill-emerald-800 text-gold-200" />
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-serif font-bold text-base text-stone-850">
                        {profile.community} {profile.gender === 'Bride' ? t('profiles.brideSimp', 'Bride', 'వధువు') : t('profiles.groomSimp', 'Groom', 'వరుడు')}, {profile.age} {t('profiles.yrs', 'Yrs', 'సంవత్సరాలు')}
                      </h3>
                      <p className="text-stone-500 text-xs font-medium flex items-center gap-1">
                        <Briefcase size={12} className="text-stone-400" />
                        {profile.education}
                      </p>
                      <p className="text-maroon-800 text-xs font-semibold">
                        {profile.profession}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-1 bg-stone-50/70 p-3 rounded-xl border border-stone-100 text-[11px] text-stone-600">
                    <div>
                      <span className="text-stone-400 block font-medium">{t('profiles.heightVal', 'Height:', 'ఎత్తు:')}</span>
                      <span className="font-semibold text-stone-700">{profile.height || '5\'5"'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-medium">{t('profiles.gotramVal', 'Gotram:', 'గోత్రం:')}</span>
                      <span className="font-semibold text-stone-700">{profile.gotram || t('profiles.gotramVer', 'Verified', 'ధృవీకరించబడినది')}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-medium">{t('profiles.nativeVal', 'Native Place:', 'స్వస్థలం:')}</span>
                      <span className="font-semibold text-stone-700 truncate block max-w-full" title={profile.nativePlace}>{profile.nativePlace || 'Telangana'}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block font-medium">{t('profiles.starVal', 'Star (Nakshatram):', 'నక్షత్రం:')}</span>
                      <span className="font-semibold text-stone-700">{profile.star || t('profiles.starMatch', 'Matching', 'సరిపోలే నక్షత్రం')}</span>
                    </div>
                  </div>

                  {/* Privacy locked block indicator */}
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400 bg-stone-50 p-2 rounded-lg border border-stone-100">
                    <Lock size={12} className="text-orange-400" />
                    <span>{t('profiles.lockMsg', 'Family background & contact locked.', 'కుటుంబ వివరాలు & ఫోన్ నంబర్లు లాక్ చేయబడ్డాయి.')}</span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="pt-4 mt-1 border-t border-stone-100 pl-2 flex gap-2">
                  <button
                    id={`view-btn-${profile.id}`}
                    onClick={() => setPhotoProfile(profile)}
                    className="flex-none py-2.5 px-3 font-semibold text-xs text-gold-700 hover:text-white bg-gold-50 hover:bg-gold-500 border border-gold-200 hover:border-transparent rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Eye size={13} /> {t('profiles.viewBtn', 'View', 'చూడండి')}
                  </button>
                  <button
                    id={`request-btn-${profile.id}`}
                    onClick={() => setSelectedProfile(profile)}
                    className="flex-1 py-2.5 px-4 font-semibold text-xs text-maroon-800 hover:text-white bg-maroon-50 hover:bg-maroon-800 border border-maroon-200 hover:border-transparent rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <FileText size={12} /> {t('profiles.reqBtn', 'Request Profile Details', 'ప్రొఫైల్ వివరాలను అభ్యర్థించండి')}
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-stone-150 p-6" id="no-profiles-helper">
            <HelpCircle size={44} className="mx-auto text-stone-300 mb-3" />
            <h4 className="font-serif text-lg font-bold text-stone-700">{t('profiles.noMatch', 'No profile matches found', 'మ్యాచింగ్ ప్రొఫైల్స్ ఏవీ లభించలేదు')}</h4>
            <p className="text-stone-500 text-sm max-w-md mx-auto mt-1 leading-relaxed">
              {t(
                'profiles.noMatchDesc',
                'Try adjusting your location helper, spelling, or education filter query (e.g. use shorter text like \"B.Tech\" or \"Dallas\").',
                'దయచేసి మీ ప్రాంత వివరాలు లేదా విద్యా వడపోతను మార్చి ప్రయత్నించండి (ఉదా. "B.Tech" లేదా "Hyderabad" అని క్లుప్తంగా వెతకండి).'
              )}
            </p>
          </div>
        )}

        {/* Small warn privacy note */}
        <div className="mt-8 bg-gold-50 border border-gold-300/40 rounded-xl p-4 flex gap-3 text-stone-600 text-xs max-w-3xl mx-auto font-sans" id="privacy-warning-note">
          <Lock size={16} className="text-gold-605 shrink-0 self-center" />
          <p className="leading-relaxed">
            <strong>{t('profiles.warningTitle', 'Privacy Protection Notice:', 'వ్యక్తిగత గోప్యతా రక్షణ సూచిక:')}</strong>{' '}
            {t(
              'profiles.warningDesc',
              'To protect family privacy and security, full profile details, photographs, horoscope degrees, and physical house addresses are only shared with registered, phone-verified members after securing reciprocal interest confirmation.',
              'కుటుంబాల భద్రత మరియు గోప్యత కొరకే ప్రొఫైల్ వివరాలు, ఫొటోలు, జాతక చక్రాలు మరియు చిరునామాలు కేవలం ఫోన్ ద్వారా ధృవీకరించబడిన మరియు నిజమైన ఆసక్తి గల సభ్యులతో మాత్రమే ఇరు పక్షాల అంగీకారం తర్వాత పంచుకోబడును.'
            )}
          </p>
        </div>

      </div>

      {/* Profile Detail Request Popup Modal */}
      {selectedProfile && (
        <div id="profile-request-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold-300/40 bg-white shadow-2xl">
            {/* Header */}
            <div className="bg-maroon-900 px-6 py-4.5 text-white">
              <h3 className="font-serif text-base font-bold tracking-wide">
                {t('profiles.reqDetailsTitle', 'Request Details:', 'వివరాల కొరకు అభ్యర్థన:')} {displayRef(selectedProfile.id)}
              </h3>
              <p className="text-xs text-maroon-200">
                {selectedProfile.community} {selectedProfile.gender === 'Bride' ? t('profiles.brideSimp', 'Bride', 'వధువు') : t('profiles.groomSimp', 'Groom', 'వరుడు')} • {selectedProfile.age} {t('profiles.yrs', 'Yrs', 'సంవత్సరాలు')} • {selectedProfile.profession}
              </p>
            </div>

            {/* Request form or confirmation */}
            <div className="p-6">
              {requestSubmitted ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="text-green-500 bg-green-50 p-4 rounded-full border border-green-200 mb-4 animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-maroon-900 mb-2">
                    {t('profiles.reqProcessed', 'Request Processed', 'మీ అభ్యర్థన విజయవంతమైంది')}
                  </h4>
                  <p className="text-stone-605 text-xs max-w-xs leading-relaxed">
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
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formName', 'Parent / Member Name', 'తల్లిదండ్రులు / సభ్యుని పేరు')}
                    </label>
                    <input
                      id="req-detail-name"
                      type="text"
                      required
                      placeholder={t('profiles.formNamePlace', 'Enter legal name', 'పూర్తి పేరు వ్రాయండి')}
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formPhone', 'Phone Number', 'ఫోన్ నంబర్')}
                    </label>
                    <input
                      id="req-detail-phone"
                      type="tel"
                      inputMode="numeric"
                      required
                      maxLength={12}
                      pattern="[0-9]{10,12}"
                      title="Enter a 10-digit mobile number"
                      placeholder={t('profiles.formPhonePlace', '10-digit mobile phone', '10 అంకెల మొబైల్ నంబర్')}
                      value={requestPhone}
                      onChange={(e) => setRequestPhone(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      className="w-full text-xs rounded-lg border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('profiles.formRelationship', 'Relationship to Candidate', 'అభ్యర్థితో గల సంబంధం')}
                    </label>
                    <select
                      id="req-detail-relation"
                      value={requestRelationship}
                      onChange={(e) => setRequestRelationship(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 p-2.5 focus:outline-none focus:ring-1 focus:ring-maroon-900 bg-stone-50"
                    >
                      <option value="Parent">{t('profiles.relParent', 'Parent (Galli / Tallidandrulu)', 'తల్లిదండ్రులు')}</option>
                      <option value="Self">{t('profiles.relSelf', 'Self (Candidate)', 'స్వయంగా (అభ్యర్థి)')}</option>
                      <option value="Sibling">{t('profiles.relSibling', 'Sibling (Brother/Sister)', 'తోబుట్టువు (అన్న/తమ్ముడు/అక్క/చెల్లి)')}</option>
                      <option value="Relative">{t('profiles.relOther', 'Relative / Guardian', 'బంధువు / సంరక్షకుడు')}</option>
                    </select>
                  </div>

                  <div className="flex gap-2.5 pt-2">
                    <button
                      id="req-detail-cancel-btn"
                      type="button"
                      onClick={() => setSelectedProfile(null)}
                      className="flex-1 py-2 px-4 rounded-lg text-xs font-semibold border border-stone-200 hover:bg-stone-50 text-stone-600 bg-white cursor-pointer"
                    >
                      {t('profiles.cancel', 'Cancel', 'రద్దు చేయి')}
                    </button>
                    <button
                      id="req-detail-submit-btn"
                      type="submit"
                      className="flex-1 py-2 px-4 rounded-lg text-xs font-semibold bg-maroon-800 hover:bg-maroon-900 text-white shadow-md cursor-pointer border-none"
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

      {/* Photo flash card */}
      {photoProfile && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setPhotoProfile(null)}
        >
          <div
            className="relative w-full max-w-xs bg-white rounded-2xl overflow-hidden shadow-2xl border border-gold-300/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPhotoProfile(null)}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors border-none cursor-pointer"
            >
              <X size={16} />
            </button>
            <img
              src={photoProfile.imageUrl}
              alt={`${photoProfile.community} ${photoProfile.gender}`}
              referrerPolicy="no-referrer"
              className="w-full aspect-square object-cover"
            />
            <div className="px-4 py-3 text-center bg-maroon-900 text-white">
              <h3 className="font-serif font-bold text-base">
                {photoProfile.community} {photoProfile.gender === 'Bride' ? t('profiles.brideSimp', 'Bride', 'వధువు') : t('profiles.groomSimp', 'Groom', 'వరుడు')}
              </h3>
              <p className="text-gold-200 text-xs mt-0.5">{displayRef(photoProfile.id)} · {photoProfile.age} {t('profiles.yrs', 'Yrs', 'సంవత్సరాలు')}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
