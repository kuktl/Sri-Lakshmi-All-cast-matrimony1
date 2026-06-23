import React, { useState } from 'react';
import { CheckCircle2, Lock, ShieldCheck, Heart, UserPlus2, Upload, Clock, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { submitProfile } from '../lib/api';

interface RegisterPageProps {
  navigateToPage: (page: string) => void;
}

export default function Registration({ navigateToPage }: RegisterPageProps) {
  const { language, t } = useLanguage();

  // Detailed registration fields matching user requirements exactly
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('Bride');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [community, setCommunity] = useState('');
  const [subCommunity, setSubCommunity] = useState('');
  const [location, setLocation] = useState('');
  const [education, setEducation] = useState('');
  const [profession, setProfession] = useState('');
  const [income, setIncome] = useState('');
  const [familyDetails, setFamilyDetails] = useState('');
  const [matchDetails, setMatchDetails] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  
  // Drag and drop photo upload simulation
  const [dragActive, setDragActive] = useState(false);
  const [selectedPhotoName, setSelectedPhotoName] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedPhotoName(e.dataTransfer.files[0].name);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedPhotoName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitError('');
    setSubmitting(true);

    const ageNum = parseInt(age, 10);

    try {
      // Create a PENDING profile in the backend for admin approval.
      const { id } = await submitProfile({
        full_name: fullName.trim(),
        gender: role === 'Groom' ? 'Groom' : 'Bride',
        age: Number.isFinite(ageNum) ? ageNum : undefined,
        community: community || undefined,
        location: location || undefined,
        education: education || undefined,
        profession: profession || undefined,
        gotram: subCommunity || undefined,
        phone: phone.trim(),
        whatsapp: whatsapp || undefined,
        dob: dob || undefined,
        email: email || undefined,
        income: income || undefined,
        family_details: familyDetails || undefined,
        match_details: matchDetails || undefined,
      });

      setGeneratedId(id);
      setSubmitted(true);
      // Auto-scroll to top of container
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Instantly direct to WhatsApp with all filled data
      const rawText = `Namaste Sri Lakshmi Matrimony, I registered my ${community || 'Telugu'} ${role} profile online.\n\n*Details:*\n- Name: ${fullName}\n- Community: ${community}\n- Age: ${age} Yrs\n- Birth Date: ${dob}\n- Location: ${location}\n- Profession: ${profession}\n- Phone: ${phone}\n\nPlease expedite my matching review.`;
      const encoded = encodeURIComponent(rawText);
      const url = `https://wa.me/917386915677?text=${encoded}`;
      try {
        window.open(url, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error('Popup failed', err);
      }
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Could not submit your registration. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    const rawText = `Namaste Sri Lakshmi Matrimony, I registered my ${community || 'Telugu'} ${role} profile online.\n\n*Details:*\n- Profile ID: ${generatedId}\n- Name: ${fullName}\n- Community: ${community}\n- Age: ${age} Yrs\n- Birth Date: ${dob}\n- Location: ${location}\n- Profession: ${profession}\n- Phone: ${phone}\n\nPlease expedite my matching review.`;
    const encoded = encodeURIComponent(rawText);
    const url = `https://wa.me/919121594223?text=${encoded}`;
    try {
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error("Popup failed", err);
    }
  };

  return (
    <div className="bg-cream-50 font-sans">
      
      {/* 1. Register Hero */}
      <section className="bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gold-400 font-bold"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold text-amber-200">
              {t('reg.badge', 'Secure Vows', 'సురక్షిత పరిణయాలు')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('reg.title', 'Register Your Bride or Groom Profile', 'వధువు లేదా వరుడి ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
          </h1>
          <p className="text-[#d1d5db] text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'reg.desc',
              'Share your details and our team will help you find suitable community-based matches with verified profile support.',
              'మీ వివరాలను పంచుకోండి, మా బృందం మీకు అనుకూలమైన వధూవరుల వివరాలను కనుగొనడంలో సహాయం చేస్తుంది.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Main content structure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Registration Form Block (col span 8) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-stone-150 space-y-8">
            
            {submitted ? (
              <div className="text-center py-10 px-4 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-250 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-2xl font-extrabold text-stone-900">
                  {t('reg.submitSuccess', 'Registration Submitted Successfully!', 'నమోదు విజయవంతంగా పూర్తయింది!')}
                </h3>
                <p className="text-stone-605 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                  {t(
                    'reg.submitSuccessDesc',
                    'Thank you! Your matchmaking portfolio has been created with assigned Profile ID:',
                    'ధన్యవాదాలు! మీ ప్రొఫైల్ విజయవంతంగా సేవ్ చేయబడింది. సమీక్ష మరియు ధృవీకరణ కోసం కేటాయించిన ప్రొఫైల్ ఐడి:'
                  )}{' '}
                  <strong>{generatedId}</strong>.
                </p>

                <div className="p-5 bg-cream-50 rounded-2xl border border-stone-200 max-w-md mx-auto space-y-4 text-center">
                  <span className="text-xs font-bold text-stone-700 block">
                    {t('reg.speedUp', '⚡ Speed Up Your Verification Status', '⚡ మీ ప్రొఫైల్ పరిశీలనను త్వరితం చేయండి')}
                  </span>
                  <button
                    onClick={handleWhatsAppForward}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    {t('reg.confirmWa', 'Confirm via WhatsApp Instantly', 'వెంటనే వాట్సాప్ ద్వారా ధృవీకరించండి')}
                  </button>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName('');
                      setAge('');
                      setDob('');
                      setSubCommunity('');
                      setLocation('');
                      setEducation('');
                      setProfession('');
                      setIncome('');
                      setFamilyDetails('');
                      setMatchDetails('');
                      setPhone('');
                      setWhatsapp('');
                      setEmail('');
                      setSelectedPhotoName(null);
                    }}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                  >
                    {t('reg.another', 'Register Another Candidate Profile', 'మరొక ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <h2 className="font-serif font-extrabold text-lg text-stone-950 border-b border-stone-100 pb-3 flex items-center gap-1.5">
                  <UserPlus2 size={20} className="text-[#10b981]" />{' '}
                  {t('reg.sectionTitle', 'Candidate Bio-data Credentials', 'అభ్యర్థి బయోడేటా వివరాలు')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.fullName', 'Candidate Full Name *', 'అభ్యర్థి పూర్తి పేరు (సర్టిఫికెట్ ప్రకారం) *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('reg.legalPlaceholder', 'Enter legal birth name', 'పూర్తి పేరు రాయండి')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.gender', 'Bride / Groom *', 'వధువు / వరుడు *')}
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    >
                      <option value="Bride">{t('reg.bride', 'Bride (Aada pilla)', 'వధువు (ఆడపిల్ల)')}</option>
                      <option value="Groom">{t('reg.groom', 'Groom (Abbayi)', 'వరుడు (అబ్బాయి)')}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.age', 'Age *', 'వయస్సు *')}
                    </label>
                    <input
                      type="number"
                      required
                      min="18"
                      max="70"
                      placeholder={t('reg.agePlaceholder', 'Candidate Age', 'అభ్యర్థి వయస్సు')}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.dob', 'Date of Birth *', 'పుట్టిన తేదీ *')}
                    </label>
                    <input
                      type="date"
                      required
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Community (Select) */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.caste', 'Community *', 'కులం / సామాజిక వర్గం *')}
                    </label>
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      required
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-700"
                    >
                      <option value="">{t('reg.chooseCaste', '-- Choose Community --', '-- కులాన్ని ఎంచుకోండి --')}</option>
                      <option value="Reddy">Reddy</option>
                      <option value="Kamma">Kamma</option>
                      <option value="Kapu">Kapu / Telaga / Balija</option>
                      <option value="Goud">Goud</option>
                      <option value="Arya Vysya">Arya Vysya</option>
                      <option value="Yadav">Yadav</option>
                      <option value="Padmashali">Padmashali</option>
                      <option value="Brahmin">Brahmin</option>
                      <option value="Naidu">Naidu</option>
                      <option value="Other">Other Telugu Caste</option>
                    </select>
                  </div>

                  {/* Sub-community */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.subCaste', 'Sub-Community / Gotram', 'ఉపకులం / గోత్రము (వివరాలు)')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kalyana Goud, Idiga, Shanku Reddy, etc."
                      value={subCommunity}
                      onChange={(e) => setSubCommunity(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current Location */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.location', 'Current Location *', 'ప్రస్తుత నివాస ప్రాంతం *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad TS, Vijayawada AP"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* Highest Education */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.education', 'Highest Education *', 'చదువు (విద్యార్హత) *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. B.Tech, MBA, MCA, MBBS, MS"
                      value={education}
                      onChange={(e) => setEducation(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Profession */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.job', 'Designation & Employment *', 'ఉద్యోగం / కంపెనీ హోదా *')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Software Engineer at TCS"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* Annual Income */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.income', 'Annual Income (Optional)', 'వార్షిక ఆదాయం (INR / USD)')}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 12 Lakhs Per Annum / $110k USD"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                {/* Family Details */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    {t('reg.family', 'Family Status & Background', 'కుటుంబ నేపథ్యం / హోదా వివరాలు')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('reg.familyPlaceholder', 'Brief details about family native, sibling details, father business...', 'తండ్రిగారి వ్యాపారం, స్థానిక గ్రామం, తోబుట్టువుల వివరాలు క్లుప్తంగా రాయండి...')}
                    value={familyDetails}
                    onChange={(e) => setFamilyDetails(e.target.value)}
                    className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 resize-none"
                  ></textarea>
                </div>

                {/* Preferred Match Details */}
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    {t('reg.expectations', 'Preferred Partner Expectations', 'భాగస్వామి అంచనాలు / ప్రాధాన్యతలు')}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('reg.expPlaceholder', 'Location bounds, desired education, age gaps...', 'వయస్సు పరిధి, కనీస చదువు, ఉద్యోగ నికర అవసరాలు...')}
                    value={matchDetails}
                    onChange={(e) => setMatchDetails(e.target.value)}
                    className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 resize-none"
                  ></textarea>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 pt-3 border-t border-stone-100 flex items-center gap-1.5">
                  {t('reg.contactSec', 'Contact Information (Confidential Helpdesk)', 'సంప్రదించే సమాచారం (అత్యంత రహస్యం)')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.phone', 'Phone Number *', 'ఫోన్ నంబర్ *')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobilephone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.waNum', 'WhatsApp Number', 'వాట్సాప్ నంబర్')}
                    </label>
                    <input
                      type="tel"
                      placeholder="WhatsApp mobile"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('reg.email', 'Email ID', 'ఇమెయిల్ ఐడి')}
                    </label>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                {/* Upload Photo Placeholder Section */}
                <div className="space-y-2 pt-2 font-sans">
                  <label className="block text-[11px] font-bold text-stone-700 uppercase">
                    {t('reg.photoLabel', 'Upload Candidate Photograph', 'అభ్యర్థి ఫోటోను అప్‌లోడ్ చేయండి')}{' '}
                    <span className="text-stone-400 font-normal select-none">
                      {t('reg.locked', '(Confidential-Locked)', '(అత్యంత సురక్షితం - లాక్ చేయబడుతుంది)')}
                    </span>
                  </label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                      dragActive ? 'border-emerald-600 bg-emerald-50/10' : 'border-stone-300 bg-stone-50/50 hover:border-[#10b981]'
                    }`}
                  >
                    <input
                      type="file"
                      id="candidate-photo-file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />
                    
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-stone-200 text-stone-400 shadow-xs">
                        <Upload size={16} />
                      </div>
                      
                      {selectedPhotoName ? (
                        <div>
                          <p className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-center">
                            ✓ {selectedPhotoName}
                          </p>
                          <button
                            type="button"
                            onClick={() => setSelectedPhotoName(null)}
                            className="text-[10px] text-red-650 font-semibold underline mt-0.5 cursor-pointer"
                          >
                            Remove and re-upload
                          </button>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-stone-605">
                            <label htmlFor="candidate-photo-file" className="text-emerald-700 font-bold hover:underline cursor-pointer">
                              {t('reg.clickSelect', 'Click to select file', 'ఫైల్‌ను ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి')}
                            </label>{' '}
                            {t('reg.orDrag', 'or drag & drop photograph', 'లేదా ఫోటోను ఇక్కడికి లాగండి')}
                          </p>
                          <p className="text-[10px] text-stone-450 mt-1">Accepts PNG, JPG, JPEG formats up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Privacy Note strip */}
                <div className="bg-emerald-50/40 border border-emerald-200/20 rounded-2xl p-4 flex gap-3 text-stone-605 text-[11px] leading-relaxed">
                  <Lock size={16} className="text-[#10b981] shrink-0 self-center" />
                  <p>
                    <strong>{t('reg.privNote', 'Privacy Note:', 'వ్యక్తిగత గోప్యత గమనిక:')}</strong>{' '}
                    {t(
                      'reg.privDesc',
                      'Your details will be handled carefully and shared only with suitable matches after proper interest and approval. Candidate photograph is locked securely.',
                      'మీ ప్రొఫైల్ వివరాలు అత్యంత జాగ్రత్తగా దాచబడతాయి మరియు మీ పూర్వ అనుమతి ఉంటేనే సంబంధీకులతో పంచుకోబడతాయి, అనామక ప్రకటనలు నివారించబడతాయి.'
                    )}
                  </p>
                </div>

                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700">
                    ⚠️ {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#10b981] hover:bg-[#059669] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer transition-colors text-center"
                >
                  {submitting
                    ? t('reg.submitting', 'Submitting…', 'సమర్పిస్తోంది…')
                    : t('reg.submitBtn', 'Submit Profile Details', 'ప్రొఫైల్ వివరాలను సమర్పించండి')}
                </button>

              </form>
            )}

          </div>

          {/* Right rail: Benefits & Steps (col span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Registration Benefits with matching details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-serif font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Heart size={16} className="text-[#10b981] stroke-none fill-[#10b981]" />{' '}
                {t('reg.vowsTitle', 'Vows of Membership', 'సభ్యత్వ నియమాలు / ప్రయోజనాలు')}
              </h3>
              
              <ul className="space-y-3 text-xs text-stone-650 list-none pl-0">
                <li className="flex items-start gap-2 border-b border-stone-100 pb-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>100% Verified Alignment:</strong> {t('reg.benefit1', 'Access only verified community brides and grooms.', 'నిజమైన, ధృవీకరించబడిన వధూవరుల వివరాలు మాత్రమే పొందుతారు.')}</span>
                </li>
                <li className="flex items-start gap-2 border-b border-stone-100 pb-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span><strong>Secure Lockdown:</strong> {t('reg.benefit2', 'Candidate photo holds strict privacy lock options.', 'అభ్యర్థి ఫోటోలు అత్యంత గోప్యత పరిధిలో లాక్ చేయబడతాయి.')}</span>
                </li>
                <li className="flex items-start gap-2 border-b border-stone-100 pb-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span><strong>Manual SHORTLIST:</strong> {t('reg.benefit3', 'Receive manual recommendations from expert advisors.', 'మా సీనియర్ నిపుణుల ద్వారా వ్యక్తిగతీకరించిన నివేదికలను పొందుతారు.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] font-bold">✓</span>
                  <span><strong>Safe & No Spam:</strong> {t('reg.benefit4', 'Avoid spam, automated robotic web crawls or duplicate agencies.', 'రోబోటిక్ నిఘా, ప్రకటనలు, డూప్లికేట్ ఏజెన్సీలు నివారించబడతాయి.')}</span>
                </li>
              </ul>
            </div>

            {/* What Happens After Registration */}
            <div className="bg-cream-100/50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4 font-sans">
              <h3 className="font-serif font-extrabold text-base text-stone-900 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#10b981]" />{' '}
                {t('reg.milestoneTitle', 'Next Milestone Steps', 'తదుపరి విజయవంతమైన అడుగులు')}
              </h3>
              
              <ol className="space-y-4 text-xs text-stone-705 list-none pl-0">
                <li className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <div>
                    <strong className="block text-stone-900">{t('reg.step1', 'Review Phase', 'పరిశీలన సమయం')}</strong>
                    <span>{t('reg.step1Desc', 'Our matching team inspects uploaded credentials for accuracy guidelines.', 'మా విభాగపు బృందం నమోదు చేసిన ప్రతి పత్రాన్ని నిశితంగా పరిశీలిస్తుంది.')}</span>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <div>
                    <strong className="block text-stone-900">{t('reg.step2', 'Verification Call', 'ధృవీకరణ సంభాషణ')}</strong>
                    <span>{t('reg.step2Desc', 'We call parent/guardian to authenticate family location and gotrams.', 'కుటుంబ పెద్దలను నేరుగా సంప్రదించి, చిరునామా మరియు గోత్రాన్ని అడుగుతాము.')}</span>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <div>
                    <strong className="block text-stone-900">{t('reg.step3', 'Draft Shortlist Dispatch', 'బయోడేలా షార్ట్‌లిస్ట్')}</strong>
                    <span>{t('reg.step3Desc', 'Matching prospective portfolios are dispatched dynamically on WhatsApp.', 'అనుకూలమైన వధూవరుల వివరాలను విశ్లేషించి మీకు వాట్సాప్ ద్వారా పంపుతాము.')}</span>
                  </div>
                </li>
                <li className="flex gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">4</span>
                  <div>
                    <strong className="block text-stone-900">{t('reg.step4', 'Family Introductions', 'కుటుంబ సంభాషణలు')}</strong>
                    <span>{t('reg.step4Desc', 'We schedule mutually agreed calls or meetings respecting family assent.', 'ఇరువైపులా సమ్మతి కుదిరిన తర్వాత సమావేశాలను సులభతరం చేస్తాము.')}</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Support Desk phone info */}
            <div className="bg-white border border-stone-200 p-6 rounded-3xl text-center space-y-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto text-emerald-800">
                <Clock size={18} className="text-[#10b981]" />
              </div>
              <h4 className="font-serif font-bold text-xs text-stone-850">
                {t('reg.approvalLine', 'Express Approval Line', 'త్వరిత ప్రొఫైల్ ఆమోదం కోసం')}
              </h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Contact our helpline for instant approval and premium verification on your docket:
              </p>
              <a href="tel:+919121594223" className="text-sm font-bold text-stone-900 hover:underline block flex items-center justify-center gap-1.5 font-sans">
                <Phone size={12} className="text-[#10b981]" /> +91 91215 94223
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
