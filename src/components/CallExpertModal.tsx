import React, { useState } from 'react';
import { X, Phone, User, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CallExpertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CallExpertModal({ isOpen, onClose }: CallExpertModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    // Simulate API request persistence in localStorage
    const callbackRequests = JSON.parse(localStorage.getItem('tr_callback_requests') || '[]');
    callbackRequests.push({ name, phone, preferredTime, timestamp: new Date().toISOString() });
    localStorage.setItem('tr_callback_requests', JSON.stringify(callbackRequests));

    setSubmitted(true);

    const timeStr = preferredTime || 'Anytime (9 AM to 8 PM)';
    const text = `Namaste Sri Lakshmi All Caste Matrimony,\nI would like to request a callback from a Matchmaking Expert:\n\n*My Details:*\n- Name: ${name}\n- Phone: ${phone}\n- Preferred Time: ${timeStr}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/919121594223?text=${encoded}`;
    try {
      window.open(url, '_blank', 'noreferrer,noopener');
    } catch (err) {
      console.error("Popup failed", err);
    }

    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setPreferredTime('');
      onClose();
    }, 3000);
  };

  return (
    <div id="expert-callback-modal" className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs font-sans">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gold-300/40 bg-white shadow-2xl">
        
        {/* Custom Maroon background header with traditional pattern */}
        <div className="bg-maroon-900 px-6 py-5 text-white">
          <button 
            id="close-callback-modal"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white hover:rotate-90 transition-transform duration-300 border-none bg-transparent"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-gold-500/20 text-gold-300 p-2 rounded-full border border-gold-400/30">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">{t('expert.title', 'Talk to Matchmaking Expert', 'మ్యారేజ్ మ్యాచ్ మేకింగ్ ఎక్స్‌పర్ట్‌తో మాట్లాడండి')}</h3>
              <p className="text-xs text-maroon-200">{t('expert.subtitle', 'Personalized assistance for Telugu Families', 'తెలుగు కుటుంబాల కోసం ప్రత్యేక వ్యక్తిగత సహాయం')}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-fade-in font-sans">
              <div className="text-green-500 bg-green-50 p-4 rounded-full border border-green-200 mb-4 scale-110">
                <CheckCircle size={36} />
              </div>
              <h4 className="font-serif text-xl font-bold text-maroon-900 mb-2">{t('expert.successHeader', 'Request Submitted!', 'అభ్యర్థన సమర్పించబడింది!')}</h4>
              <p className="text-stone-600 text-sm max-w-xs font-medium">
                {t('expert.thankYou', 'Thank you,', 'ధన్యవాదాలు,')} <strong>{name}</strong>. {t('expert.callNotice', 'Our senior matrimonial matchmaker will call you back within 2 hours.', 'మా సీనియర్ వైవాహిక మ్యాచ్ మేకర్ 2 గంటల లోపు మీకు తిరిగి కాల్ చేస్తారు.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <p className="text-stone-600 text-xs leading-relaxed font-medium">
                {t('expert.formDesc', 'Provide your details below. Our experienced matchmaker will contact you to understand your bride/groom expectations and help filter genuine profiles.', 'దయచేసి కింద మీ వివరాలు తెలపండి. మా అనుభవజ్ఞులైన మ్యాచ్ మేకర్ మిమ్మల్ని సంప్రదించి, మీ వధూవరుల అంచనాలకు సరిపోయే సహజమైన ప్రొఫైల్‌లను ఎంపిక చేయడంలో సహాయపడతారు.')}
              </p>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  {t('expert.fullName', 'Your Full Name', 'మీ పూర్తి పేరు')} <span className="text-maroon-700">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    <User size={16} />
                  </span>
                  <input
                    id="callback-name-input"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('expert.placeholderName', 'Enter your name', 'మీ పేరు నమోదు చేయండి')}
                    className="w-full rounded-lg border border-stone-200 py-2 pl-9 pr-4 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  {t('expert.phone', 'Phone Number', 'ఫోన్ నెంబర్')} <span className="text-maroon-700">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    <Phone size={16} />
                  </span>
                  <input
                    id="callback-phone-input"
                    type="tel"
                    required
                    pattern="[0-9]{10,12}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('expert.placeholderPhone', '10-digit mobile number', '10 అంకెల మొబైల్ నంబర్')}
                    className="w-full rounded-lg border border-stone-200 py-2 pl-9 pr-4 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  {t('expert.preferredTime', 'Preferred Calling Time', 'కాల్ చేయడానికి అనుకూల సమయం')}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                    <Calendar size={16} />
                  </span>
                  <select
                    id="callback-time-select"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 py-2 pl-9 pr-4 text-sm bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-transparent transition-all"
                  >
                    <option value="">{t('expert.timeAny', 'Anytime (9 AM to 8 PM)', 'ఏ సమయంలోనైనా (ఉదయం 9 నుండి రాత్రి 8)')}</option>
                    <option value="morning">{t('expert.timeMorning', 'Morning (9 AM to 12 PM)', 'ఉదయం (ఉదయం 9 నుండి మధ్యాహ్నం 12)')}</option>
                    <option value="afternoon">{t('expert.timeAfternoon', 'Afternoon (12 PM to 5 PM)', 'మధ్యాహ్నం (మధ్యాహ్నం 12 నుండి సాయంత్రం 5)')}</option>
                    <option value="evening">{t('expert.timeEvening', 'Evening (5 PM to 8 PM)', 'సాయంత్రం (సాయంత్రం 5 నుండి రాత్రి 8)')}</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="submit-callback-request"
                  type="submit"
                  className="w-full py-2.5 px-4 font-medium text-sm text-white bg-maroon-800 hover:bg-maroon-900 border border-transparent rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone size={16} /> {t('expert.submitBtn', 'Connect with Matchmaker', 'మ్యాచ్ మేకర్‌తో మాట్లాడండి')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
