import React, { useState } from 'react';
import { Sparkles, Heart, Check, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onTalkToExpertClick: () => void;
  onRegisterClick: () => void;
}

export default function HeroSection({ onTalkToExpertClick, onRegisterClick }: HeroSectionProps) {
  const { language, t } = useLanguage();
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [fatherMobile, setFatherMobile] = useState('');
  const [caste, setCaste] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Caste list with translations
  const castes = [
    { value: 'Reddy', labelTe: 'రెడ్డి', labelEn: 'Reddy' },
    { value: 'Kamma', labelTe: 'కమ్మ', labelEn: 'Kamma' },
    { value: 'Kapu', labelTe: 'కాపు', labelEn: 'Kapu' },
    { value: 'Goud', labelTe: 'గౌడ్', labelEn: 'Goud' },
    { value: 'Brahmin', labelTe: 'బ్రాహ్మణ', labelEn: 'Brahmin' },
    { value: 'Naidu', labelTe: 'నాయుడు', labelEn: 'Naidu' },
    { value: 'Velama', labelTe: 'వెలమ', labelEn: 'Velama' },
    { value: 'Arya Vysya', labelTe: 'ఆర్య వైశ్య', labelEn: 'Arya Vysya' },
    { value: 'Padmashali', labelTe: 'పద్మశాలి', labelEn: 'Padmashali' },
    { value: 'Yadav', labelTe: 'యాదవ్', labelEn: 'Yadav' },
    { value: 'Mudiraj', labelTe: 'ముదిరాజ్', labelEn: 'Mudiraj' },
    { value: 'Mala', labelTe: 'మాల', labelEn: 'Mala' },
    { value: 'Madiga', labelTe: 'మాదిగ', labelEn: 'Madiga' },
    { value: 'Other', labelTe: 'ఇతర కులాలు / అన్ని కులాలు', labelEn: 'All Castes / Other' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !gender || !fatherMobile || !caste) return;

    setIsSubmitted(true);
    
    // Direct integration with WhatsApp to send lead instantly
    const text = `Namaste Sri Lakshmi All Caste Matrimony,\nI have submitted my profile registration:\n\n*Candidate Details:*\n- Full Name: ${fullName}\n- Mobile Number: ${mobileNumber}\n- Gender: ${gender}\n- Father's Mobile: ${fatherMobile}\n- Caste: ${caste}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/917386915677?text=${encoded}`;
    try {
      window.open(url, '_blank', 'noreferrer,noopener');
    } catch (err) {
      console.error("Popup blocked or failed in sandbox", err);
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative min-h-0 lg:min-h-[90vh] flex items-center justify-start bg-cover bg-center lg:bg-[right_center] overflow-hidden py-8 sm:py-20 lg:py-28"
      style={{
        backgroundImage: "linear-gradient(to right, rgba(20, 8, 8, 0.92) 0%, rgba(25, 12, 12, 0.85) 45%, rgba(20, 8, 8, 0.40) 100%), url('https://i.pinimg.com/1200x/52/f6/61/52f66140b9017a8b55c6bb7660aa5074.jpg')"
      }}
    >
      {/* Subtle Bottom Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e140e] via-transparent to-transparent pointer-events-none"></div>

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-60 z-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 font-sans">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Side: Empty space on desktop to showcase the beautiful couple background */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7"></div>

          {/* Right Side: Dynamic Registration Form */}
          <div className="col-span-12 lg:col-span-6 xl:col-span-5 w-full px-0 sm:px-2" id="hero-right-form-wrapper">
            <div className="bg-stone-900/90 backdrop-blur-md rounded-2xl border border-white/10 p-4 sm:p-8 shadow-2xl text-white relative overflow-hidden">
              {/* Traditional design accents */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none"></div>
              
              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-gold-400 animate-pulse" />
                    <span className="text-[10px] tracking-widest uppercase font-bold text-gold-400">
                      {t('hero.form.badge', 'Verified Telugu Matrimony', 'ధృవీకరించబడిన తెలుగు మ్యాట్రిమోని')}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-1">
                    {t('hero.form.title', 'Register Your Profile Today', 'ఈరోజే మీ ప్రొఫైల్‌ను నమోదు చేసుకోండి')}
                  </h2>
                  <p className="text-stone-300 text-xs sm:text-sm mb-4 font-normal">
                    {t(
                      'hero.form.desc',
                      'Fill in your details below. Our senior matchmaking officers will contact you shortly to verify and suggest premium matches.',
                      'క్రింది వివరాలను పూరించండి. మా సీనియర్ మ్యాచ్ మేకింగ్ అధికారులు త్వరలోనే మిమ్మల్ని సంప్రదించి, ఉత్తమ సంబంధాలను సూచిస్తారు.'
                    )}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-stone-200 uppercase mb-1">
                        {t('hero.form.nameLabel', 'Full Name / Candidate Name *', 'అభ్యర్థి పూర్తి పేరు *')}
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={t('hero.form.namePlaceholder', 'e.g. Srikant Reddy', 'ఉదా. శ్రీకాంత్ రెడ్డి')}
                        className="w-full text-xs p-2.5 sm:p-3 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white/5 text-white placeholder-stone-400"
                      />
                    </div>

                    {/* Mobile Number & Father's Mobile Number in a grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-200 uppercase mb-1">
                          {t('hero.form.mobileLabel', 'Mobile Number *', 'మొబైల్ సంఖ్య *')}
                        </label>
                        <input 
                          type="tel" 
                          required 
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          placeholder="e.g. 91215 94223"
                          className="w-full text-xs p-2.5 sm:p-3 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white/5 text-white placeholder-stone-400"
                        />
                      </div>

                      {/* Father's Mobile Number */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-200 uppercase mb-1">
                          {t('hero.form.fatherMobileLabel', "Father's Mobile Number *", 'తండ్రి మొబైల్ సంఖ్య *')}
                        </label>
                        <input 
                          type="tel" 
                          required 
                          value={fatherMobile}
                          onChange={(e) => setFatherMobile(e.target.value)}
                          placeholder="e.g. 73869 15677"
                          className="w-full text-xs p-2.5 sm:p-3 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white/5 text-white placeholder-stone-400"
                        />
                      </div>
                    </div>

                    {/* Gender dropdown & Caste dropdown in a grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Gender */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-200 uppercase mb-1">
                          {t('hero.form.genderLabel', 'Gender *', 'లింగం *')}
                        </label>
                        <select 
                          required
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full text-xs p-2.5 sm:p-3 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-900 text-white cursor-pointer"
                        >
                          <option value="" disabled className="text-stone-400">
                            {t('hero.form.genderSelect', 'Select Gender', 'లింగం ఎంచుకోండి')}
                          </option>
                          <option value="Bride">{t('hero.form.genderBride', 'Bride (Female)', 'వధువు (స్త్రీ)')}</option>
                          <option value="Groom">{t('hero.form.genderGroom', 'Groom (Male)', 'వరుడు (పురుషుడు)')}</option>
                        </select>
                      </div>

                      {/* Caste */}
                      <div>
                        <label className="block text-[11px] font-bold text-stone-200 uppercase mb-1">
                          {t('hero.form.casteLabel', 'Caste *', 'కులం *')}
                        </label>
                        <select 
                          required
                          value={caste}
                          onChange={(e) => setCaste(e.target.value)}
                          className="w-full text-xs p-2.5 sm:p-3 rounded-xl border border-white/15 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-900 text-white cursor-pointer"
                        >
                          <option value="" disabled className="text-stone-400">
                            {t('hero.form.casteSelect', 'Select Caste', 'కులం ఎంచుకోండి')}
                          </option>
                          {castes.map((c) => (
                            <option key={c.value} value={c.value}>
                              {language === 'te' ? c.labelTe : c.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-2 sm:mt-4 py-3 sm:py-4 px-4 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm sm:text-base rounded-xl cursor-pointer shadow-lg active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {t('hero.form.submitButton', 'Submit Profile Registration', 'రిజిస్ట్రేషన్ సమర్పించండి')}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-400 text-[#10b981] rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <Check size={36} />
                  </div>
                  <h3 className="font-serif text-2xl font-extrabold text-white">
                    {t('hero.form.successTitle', 'Registration Submitted!', 'రిజిస్ట్రేషన్ విజయవంతంగా సమర్పించబడింది!')}
                  </h3>
                  <p className="text-stone-300 text-sm leading-relaxed max-w-sm mx-auto">
                    {t(
                      'hero.form.successDesc',
                      'Thank you for registering. We are forwarding you to our matchmaking desk via WhatsApp to complete your profile verification quickly.',
                      'నమోదు చేసుకున్నందుకు ధన్యవాదాలు. మీ ప్రొఫైల్ త్వరితగతిన ధృవీకరించుకోవడానికి మా మ్యాచ్‌మేకింగ్ హెల్ప్‌డెస్క్ వాట్సాప్ విండోకి అనుసంధానించబడుతోంది.'
                    )}
                  </p>
                  
                  <div className="pt-4 border-t border-white/10 mt-6">
                    <p className="text-[10px] text-stone-400 mb-2">
                      {t('hero.form.notRedirected', 'If WhatsApp did not open automatically, click below:', 'ఒకవేళ వాట్సాప్ ఆటోమేటిక్‌గా ఓపెన్ కాకపోతే, క్రింది బటన్ క్లిక్ చేయండి:')}
                    </p>
                    <a
                      href={`https://wa.me/917386915677?text=${encodeURIComponent(`Namaste Sri Lakshmi All Caste Matrimony, I want to speed up my registration for ${fullName}, phone:${mobileNumber}, Caste:${caste}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold shadow-md transition-colors"
                    >
                      <Phone size={14} /> {t('hero.form.connectWa', 'Connect on WhatsApp', 'వాట్సాప్ ద్వారా కనెక్ట్ అవ్వండి')}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


