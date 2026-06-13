import React from 'react';
import { Check, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function MembershipPlans() {
  const { language, t } = useLanguage();
  const [isContactModalOpen, setIsContactModalOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [fathersMobileNumber, setFathersMobileNumber] = React.useState('');
  const [whatWorks, setWhatWorks] = React.useState('');
  const [caste, setCaste] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleChoosePlan = (planName: string) => {
    setSelectedPlan(planName);
    setComments(language === 'te' ? `${planName} పట్ల ఆసక్తి కలిగి ఉన్నారు.` : `Interested in registering for ${planName}.`);
    setIsContactModalOpen(true);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !fathersMobileNumber) return;

    // Save registration inquiry locally
    const existingEnquiries = JSON.parse(localStorage.getItem('tr_contacts') || '[]');
    existingEnquiries.push({
      fullName,
      mobileNumber,
      fathersMobileNumber,
      whatWorks,
      caste,
      comments: `${comments} (Plan: ${selectedPlan})`,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('tr_contacts', JSON.stringify(existingEnquiries));

    setSubmitted(true);
    
    // Redirect to WhatsApp instantly on success
    const rawText = `Namaste Sri Lakshmi All Caste Matrimony,\n\nI want to activate the ${selectedPlan} membership plan.\n\n*My Details:*\n- Name: ${fullName}\n- Mobile: ${mobileNumber}\n- Father's Mobile: ${fathersMobileNumber}\n- Caste: ${caste}\n- Profession: ${whatWorks}\n- Specifications: ${comments}`;
    const encoded = encodeURIComponent(rawText);
    const whatsappUrl = `https://wa.me/917386915677?text=${encoded}`;
    
    setTimeout(() => {
      try {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error("Popup blocked: ", err);
      }
      setSubmitted(false);
      setIsContactModalOpen(false);
      setFullName('');
      setMobileNumber('');
      setFathersMobileNumber('');
      setWhatWorks('');
      setCaste('');
      setComments('');
    }, 2000);
  };

  return (
    <section className="py-16 bg-white relative border-y border-stone-200/50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full animate-pulse"></span>
            {t('about.membership.badge', 'Membership Plans', 'సభ్యత్వ ప్లాన్లు')}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            {t('about.membership.title', 'Choose the Right Matchmaking Package', 'సరైన మ్యాచ్ మేకింగ్ ప్యాకేజీని ఎంచుకోండి')}
          </h2>
          <p className="text-stone-605 text-sm max-w-2xl mx-auto leading-relaxed">
            {t(
              'about.membership.desc',
              'Sri Lakshmi All Caste Matrimony offers simple membership packages to help Telugu families receive suitable bride and groom profiles with personal support.',
              'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోని తెలుగు కుటుంబాలకు వ్యక్తిగత మద్దతుతో తగిన వధూవరుల ప్రొఫైల్‌లను పొందడంలో సహాయపడటానికి సరళమైన సభ్యత్వ ప్యాకేజీలను అందిస్తుంది.'
            )}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Basic Package */}
          <div className="bg-cream-50/40 rounded-3xl p-8 border border-stone-200 flex flex-col justify-between relative hover:border-[#10b981] transition-all duration-305 shadow-xs hover:shadow-lg">
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {t('about.membership.basic.name', 'Basic Package', 'బేసిక్ ప్యాకేజీ')}
                </h3>
                <div className="mt-4 flex items-baseline text-stone-900">
                  <span className="font-serif text-5xl font-extrabold tracking-tight">₹999</span>
                </div>
                <p className="text-stone-606 text-xs mt-3 leading-relaxed min-h-[40px]">
                  {t(
                    'about.membership.basic.desc',
                    'Best for families who want regular profile suggestions and simple matchmaking support.',
                    'రెగ్యులర్ ప్రొఫైల్ సిఫార్సులు మరియు సాధారణ మ్యాచ్ మేకింగ్ మద్దతును కోరుకునే కుటుంబాలకు ఇది ఉత్తమమైనది.'
                  )}
                </p>
              </div>

              <div className="border-t border-stone-200/60 pt-6">
                <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider mb-4">
                  {t('about.membership.includes', 'Includes:', 'ఫీచర్లు:')}
                </h4>
                <ul className="space-y-3">
                  {[
                    { en: '2 Months Service', te: '2 నెలల సర్వీస్' },
                    { en: 'Weekly 4 Suitable Profiles', te: 'వారానికి 4 సరిపోయే ప్రొఫైల్‌లు' },
                    { en: 'Bride/Groom profile registration', te: 'వధూవరుల ప్రొఫైల్ రిజిస్ట్రేషన్' },
                    { en: 'Basic profile review', te: 'ప్రాథమిక ప్రొఫైల్ పరిశీలన' },
                    { en: 'Community-based match suggestions', te: 'కమ్యూనిటీ ఆధారిత మ్యాచ్ సూచనలు' },
                    { en: 'WhatsApp support', te: 'వాట్సాప్ మద్దతు' },
                    { en: 'Privacy-focused profile sharing', te: 'గోప్యతతో కూడిన ప్రొఫైల్ పంపకం' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-stone-600">
                      <Check size={14} className="text-[#10b981] mt-0.5 shrink-0" />
                      <span>{language === 'te' ? item.te : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => handleChoosePlan('Basic Package (₹999)')}
                className="block w-full py-3 px-4 rounded-xl text-center bg-stone-950 hover:bg-stone-850 text-white text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer border-none font-sans"
              >
                {t('about.membership.basic.cta', 'Choose ₹999 Package', '₹999 ప్యాకేజీని ఎంచుకోండి')}
              </button>
            </div>
          </div>

          {/* Premium Package */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#10b981] flex flex-col justify-between relative hover:shadow-xl transition-all duration-305 shadow-md">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#10b981] text-white py-1 px-4 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-sm">
              {t('about.membership.premium.flag', 'Most Popular Support', 'అత్యంత ప్రజాదరణ పొందినది')}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900 flex items-center gap-2">
                  {t('about.membership.premium.name', 'Premium Package', 'ప్రీమియం ప్యాకేజీ')}
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-emerald-50 text-[#10b981] border border-emerald-100 font-sans">
                    ★ {t('about.membership.premium.status', 'VIP Support', 'VIP సపోర్ట్')}
                  </span>
                </h3>
                <div className="mt-4 flex items-baseline text-stone-900">
                  <span className="font-serif text-5xl font-extrabold tracking-tight">₹1,999</span>
                </div>
                <p className="text-stone-605 text-xs mt-3 leading-relaxed min-h-[40px]">
                  {t(
                    'about.membership.premium.desc',
                    'Best for families who want more profile options and longer matchmaking support.',
                    'మరిన్ని ప్రొఫైల్ ఎంపికలు మరియు సుదీర్ఘ మ్యాచ్ మేకింగ్ మద్దతును కోరుకునే కుటుంబాలకు ఇది అత్యుత్తమమైనది.'
                  )}
                </p>
              </div>

              <div className="border-t border-stone-100 pt-6">
                <h4 className="text-xs font-bold uppercase text-stone-700 tracking-wider mb-4">
                  {t('about.membership.includes', 'Includes:', 'ఫీచర్లు:')}
                </h4>
                <ul className="space-y-3">
                  {[
                    { en: '5 Months Service', te: '5 నెలల సర్వీస్' },
                    { en: 'Weekly 6 Suitable Profiles', te: 'వారానికి 6 సరిపోయే ప్రొఫైల్‌లు' },
                    { en: 'Bride/Groom profile registration', te: 'వధూవరుల ప్రొఫైల్ రిజిస్ట్రేషన్' },
                    { en: 'Detailed profile review', te: 'సమగ్ర ప్రొఫైల్ పరిశీలన' },
                    { en: 'Priority match suggestions', te: 'ప్రాధాన్యత మ్యాచ్ సూచనలు' },
                    { en: 'Personal matchmaking support', te: 'వ్యక్తిగత మ్యాచ్ మేకింగ్ సహాయం' },
                    { en: 'Call & WhatsApp assistance', te: 'కాల్ మరియు వాట్సాప్ సహాయం' },
                    { en: 'Family preference-based matching', te: 'కుటుంబ ప్రాధాన్యత ఆధారిత సరిపోలికలు' },
                    { en: 'Privacy-focused contact sharing', te: 'గోప్యతతో కూడిన సంప్రదింపుల వివరాల పంపకం' }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs text-stone-600">
                      <Check size={14} className="text-[#10b981] mt-0.5 shrink-0" />
                      <span>{language === 'te' ? item.te : item.en}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <button
                onClick={() => handleChoosePlan('Premium Package (₹1,999)')}
                className="block w-full py-3.5 px-4 rounded-xl text-center bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer animate-pulse border-none font-sans"
              >
                {t('about.membership.premium.cta', 'Choose ₹1,999 Package', '₹1,999 ప్యాకేజీని ఎంచుకోండి')}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Activation popup form modal */}
      {isContactModalOpen && (
        <div id="membership-contact-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl animate-fade-in font-sans">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-stone-900 to-stone-950 px-6 py-5 text-white flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-wide">
                  {t('contact.modalTitle', 'Register for ' + selectedPlan, selectedPlan + ' నమోదు చేసుకోండి')}
                </h3>
                <p className="text-[11px] text-stone-300">
                  {t('contact.modalSubtitle', 'Provide details to activate subscription', 'సభ్యత్వం సేవలను ప్రారంభించడానికి వివరాలు నమోదు చేయండి')}
                </p>
              </div>
              <button 
                onClick={() => setIsContactModalOpen(false)}
                className="text-white/80 hover:text-white hover:rotate-90 transition-transform duration-300 border-none bg-transparent cursor-pointer p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto font-sans">
              {submitted ? (
                <div className="bg-emerald-50 rounded-2xl border border-emerald-250 py-12 px-6 text-center space-y-4 animate-pulse">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto text-[#10b981] shadow-md border border-emerald-100">
                    <Check size={28} />
                  </div>
                  <h4 className="font-serif font-bold text-xl text-stone-900">
                    {t('contact.sentOk', 'Redirecting to WhatsApp...', 'ధృవీకరణ కోసం వాట్సాప్‌కు మళ్లించబడుతోంది...')}
                  </h4>
                  <p className="text-stone-650 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Opening instant activation request on WhatsApp for <strong className="text-stone-900">{fullName}</strong> under selected <strong className="text-stone-900">{selectedPlan}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.fullName', 'Full Name', 'పూర్తి పేరు')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.fullNamePlaceholder', "Enter candidate's or parent's full name", 'అభ్యర్థి లేదా తల్లిదండ్రుల పూర్తి పేరు दर्ज చేయండి')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.mobNo', 'Mobile Number', 'మొబైల్ నంబర్')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,12}"
                        placeholder={t('contact.tenDigitPlaceholder', '10-digit mobile number', '10 అంకెల మొబైల్ నంబర్')}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.fathersMobNo2', "Father's Mobile Number", 'తండ్రి యొక్క మొబైల్ నంబర్')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        pattern="[0-9]{10,12}"
                        placeholder={t('contact.fMobPlaceholder', "Father's or Guardian's mobile number", 'తండ్రి లేదా రక్షకుని మొబైల్ నంబర్')}
                        value={fathersMobileNumber}
                        onChange={(e) => setFathersMobileNumber(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.jobTitle', 'What he/she works', 'అభ్యర్థి నియామకం / ఉద్యోగం')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={t('contact.jobPlaceholder', 'e.g. Software Engineer in Hyderabad', 'ఉదా. హైదరాబాదులో సాఫ్ట్‌వేర్ ఇంజనీర్')}
                        value={whatWorks}
                        onChange={(e) => setWhatWorks(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                        {t('contact.caste', 'Caste *', 'కులం *')}
                      </label>
                      <select
                        required
                        value={caste}
                        onChange={(e) => setCaste(e.target.value)}
                        className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-[#1a1513] font-bold cursor-pointer"
                      >
                        <option value="" disabled>
                          {t('contact.selectCaste', 'Select Caste', 'కులం ఎంచుకోండి')}
                        </option>
                        {[
                          { value: 'Reddy', labelTe: 'రెడ్డి', labelEn: 'Reddy' },
                          { value: 'Kamma', labelTe: 'కమ్మ', labelEn: 'Kamma' },
                          { value: 'Kapu', labelTe: 'కాపు', labelEn: 'Kapu' },
                          { value: 'Goud', labelTe: 'గౌడ్', labelEn: 'Goud' },
                          { value: 'Brahmin', labelTe: 'బ్రాహ్మణ', labelEn: 'Brahmin' },
                          { value: 'Naidu', labelTe: 'ನಾಯుడు', labelEn: 'Naidu' },
                          { value: 'Velama', labelTe: 'వెలమ', labelEn: 'Velama' },
                          { value: 'Arya Vysya', labelTe: 'ఆర్య వైశ్య', labelEn: 'Arya Vysya' },
                          { value: 'Padmashali', labelTe: 'పద్మశాలి', labelEn: 'Padmashali' },
                          { value: 'Yadav', labelTe: 'యాదవ్', labelEn: 'Yadav' },
                          { value: 'Mudiraj', labelTe: 'ముదిరాజ్', labelEn: 'Mudiraj' },
                          { value: 'Mala', labelTe: 'మాల', labelEn: 'Mala' },
                          { value: 'Madiga', labelTe: 'మాదిగ', labelEn: 'Madiga' },
                          { value: 'Other', labelTe: 'ఇతర కులాలు / అన్ని కులాలు', labelEn: 'All Castes / Other' },
                        ].map((c) => (
                          <option key={c.value} value={c.value}>
                            {language === 'te' ? c.labelTe : c.labelEn}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.comments', 'Comments / Specifications', 'వ్యాఖ్యలు / ప్రత్యేక అభ్యర్థనలు')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('contact.commentsPlaceholder', 'Please write comments about subclass, expectations, gotram limits...', 'దయచేసి ఉపకులం, ఎత్తు, గోత్ర పరిధులు మరియు ఇతర అంచనాల గురించి రాయండి...')}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-[#10b981] bg-stone-50 text-stone-900 font-medium resize-none text-[#101010]"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsContactModalOpen(false)}
                      className="flex-1 py-3 border border-stone-300 text-stone-705 font-bold text-xs rounded-xl hover:bg-stone-50 transition-all cursor-pointer text-center font-sans"
                    >
                      {t('contact.cancel', 'Cancel', 'రద్దు చేయి')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 font-sans"
                    >
                      <Send size={14} /> {t('contact.submitBtn', 'Submit Details', 'వివరాలను సమర్పించండి')}
                    </button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
