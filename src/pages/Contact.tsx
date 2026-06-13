import React, { useState } from 'react';
import { Phone, MessageSquare, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import FAQAccordion from '../components/FAQAccordion';

interface ContactPageProps {
  navigateToPage: (page: string) => void;
}

export default function Contact({ navigateToPage }: ContactPageProps) {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [fathersMobileNumber, setFathersMobileNumber] = useState('');
  const [whatWorks, setWhatWorks] = useState('');
  const [caste, setCaste] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !fathersMobileNumber) return;

    // Save contact enquiry locally
    const existingEnquiries = JSON.parse(localStorage.getItem('tr_contacts') || '[]');
    existingEnquiries.push({
      fullName,
      mobileNumber,
      fathersMobileNumber,
      whatWorks,
      caste,
      comments,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('tr_contacts', JSON.stringify(existingEnquiries));

    setSubmitted(true);

    const text = `Namaste Sri Lakshmi All Caste Matrimony,\n\nI want to send a match enquiry.\n\n*My Details:*\n- Name: ${fullName}\n- Mobile: ${mobileNumber}\n- Father's Mobile: ${fathersMobileNumber}\n- Caste: ${caste}\n- Profession: ${whatWorks}\n- Specifications: ${comments}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/917386915677?text=${encoded}`;
    try {
      window.open(url, '_blank', 'noreferrer,noopener');
    } catch (err) {
      console.error("Popup blocked: ", err);
    }

    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setMobileNumber('');
      setFathersMobileNumber('');
      setWhatWorks('');
      setCaste('');
      setComments('');
    }, 4000);
  };

  const handleCall = () => {
    window.location.href = 'tel:+919121594223';
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Namaste Sri Lakshmi All Caste Matrimony. Seeking matchmaking enquiry guidelines.");
    window.open(`https://wa.me/917386915677?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-cream-50 font-sans">
      
      {/* 1. Contact Hero */}
      <section className="bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 py-16 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-400 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-8 bg-gold-400"></span>
            <span className="text-gold-400 text-xs tracking-widest uppercase font-bold text-amber-200">
              {t('contact.badge', 'Always Available', 'ఎల్లప్పుడూ అందుబాటులో ఉంటాము')}
            </span>
            <span className="h-[1px] w-8 bg-gold-400"></span>
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('contact.title', 'Contact Sri Lakshmi All Caste Matrimony', 'శ్రీ లక్ష్మి అన్ని కులాల మ్యాట్రిమోనిని సంప్రదించండి')}
          </h1>
          <p className="text-stone-300 text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            {t(
              'contact.desc',
              'Seek instant support or schedule a matchmaking consultation with our senior officers today.',
              'మా సీనియర్ అధికారులతో మ్యాచింగ్ కన్సల్టేషన్ లేదా తక్షణ సహాయాన్ని నేటి రోజే పొందండి.'
            )}
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card: Call */}
          <div id="contact-card-call" className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 flex items-start gap-4 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center border border-emerald-100 flex-shrink-0">
              <Phone size={18} className="text-[#10b981]" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                {t('contact.callNow', 'Call Us Now', 'కాల్ చేయండి')}
              </span>
              <a href="tel:+919121594223" className="block text-sm font-bold text-stone-900 hover:underline mt-0.5">
                +91 91215 94223
              </a>
              <a href="tel:+917386915677" className="block text-sm font-bold text-stone-900 hover:underline mt-0.5">
                +91 73869 15677
              </a>
              <p className="text-[10px] text-stone-500 mt-1.5 leading-relaxed">
                {t('contact.directCall', 'Direct support call desk', 'ప్రత్యక్ష సహాయ కేంద్రం')}
              </p>
            </div>
          </div>

          {/* Card: Email */}
          <div id="contact-card-email" className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 flex items-start gap-4 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#10b981] flex items-center justify-center border border-amber-100 flex-shrink-0">
              <Mail size={18} />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                {t('contact.emailQueries', 'Email Queries', 'ఇమెయిల్ ప్రశ్నలు')}
              </span>
              <a href="mailto:info@srilakshmiallcastematrimony.com" className="block text-sm font-bold text-stone-850 hover:underline mt-0.5 truncate max-w-[160px] lg:max-w-xs">
                info@srilakshmiallcastematrimony.com
              </a>
              <p className="text-[10px] text-stone-500 mt-0.5 leading-relaxed">
                {t('contact.ticketing', 'Official support ticketing', 'అధికారిక సపోర్ట్ మెయిల్')}
              </p>
            </div>
          </div>

          {/* Card: Office */}
          <div id="contact-card-office" className="bg-white rounded-2xl shadow-lg border border-stone-200 p-5 flex items-start gap-4 transition-transform hover:-translate-y-0.5">
            <div className="w-10 h-10 rounded-xl bg-stone-50 text-stone-655 flex items-center justify-center border border-stone-200 flex-shrink-0">
              <MapPin size={18} className="text-[#10b981]" />
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                {t('contact.hq', 'Headquarters', 'ప్రధాన కార్యాలయం')}
              </span>
              <span className="block text-xs font-bold text-stone-800 mt-0.5 leading-tight">
                {t('contact.hqAddr', 'Tirupati, Hyderabad, All Over AP & TS', 'తిరుపతి, హైదరాబాద్, ఆంధ్రప్రదేశ్ మరియు తెలంగాణ అంతటా')}
              </span>
              <p className="text-[10px] text-stone-500 mt-1 leading-relaxed">
                {t('contact.visitHelp', 'Visit for manual match help', 'స్వయంగా కలవండి')}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Message Form & Operational detail grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Enquiry Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-md border border-stone-150 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-stone-900">
                {t('contact.formTitle', 'Send Your Match Enquiry', 'మీ మ్యాచ్ విచారణ వివరాలు పంపండి')}
              </h3>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">
                {t('contact.formSubtitle', 'Our matchmaking specialist will check suitable bio-charts and call you back.', 'మా నిపుణులకు మీ వివరాలు అందించి, పట్టికలు సరిపోల్చి వెంటనే మీకు కాల్ చేస్తారు.')}
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 rounded-2xl border border-emerald-250 py-10 px-6 text-center space-y-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-sm border border-emerald-150 animate-bounce">
                  <Check size={26} />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  {t('contact.sentOk', 'Thank You! Enquiry Sent', 'ధన్యవాదాలు! మీ వివరాలు విజయవంతంగా పంపబడ్డాయి')}
                </h4>
                <p className="text-stone-650 text-xs max-w-sm mx-auto leading-relaxed">
                  {t('contact.receivedText', 'We have received your enquiry for', 'మేము మీ విచారణను విజయవంతంగా స్వీకరించాము -')}{' '}
                  <strong>{fullName}</strong>.{' '}
                  {t('contact.reachBackText', 'Our matchmaking team will reach out directly to you at', 'మా బృందం మిమ్మల్ని త్వరలోనే ఈ మొబైల్ నంబర్ వద్ద సంప్రదిస్తారు:')}{' '}
                  <strong>{mobileNumber}</strong>.{' '}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    {t('contact.fullName', 'Full Name', 'పూర్తి పేరు')}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t('contact.fullNamePlaceholder', "Enter candidate's or parent's full name", 'అభ్యర్థి లేదా తల్లిదండ్రుల పూర్తి పేరు दर्ज చేయండి')}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.mobNo', 'Mobile Number', 'మొబైల్ నంబర్')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('contact.tenDigitPlaceholder', '10-digit mobile number', '10 అంకెల మొబైల్ నంబర్')}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      {t('contact.fathersMobNo2', "Father's Mobile Number", 'తండ్రి యొక్క మొబైల్ నంబర్')}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={t('contact.fMobPlaceholder', "Father's or Guardian's mobile number", 'తండ్రి లేదా రక్షకుని మొబైల్ నంబర్')}
                      value={fathersMobileNumber}
                      onChange={(e) => setFathersMobileNumber(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#374151] uppercase mb-1">
                      {t('contact.jobTitle', 'What he/she works', 'అభ్యర్థి నియామకం / ఉద్యోగం')}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('contact.jobPlaceholder', 'e.g. Software Engineer in Hyderabad', 'ఉదా. హైదరాబాదులో సాఫ్ట్‌వేర్ ఇంజనీర్')}
                      value={whatWorks}
                      onChange={(e) => setWhatWorks(e.target.value)}
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-950 font-medium"
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
                      className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 text-stone-900 cursor-pointer font-semibold"
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
                        { value: 'Naidu', labelTe: 'నాయుడు', labelEn: 'Naidu' },
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
                    rows={4}
                    placeholder={t('contact.commentsPlaceholder', 'Please write comments about subclass, expectations, gotram limits...', 'దయచేసి ఉపకులం, ఎత్తు, గోత్ర పరిధులు మరియు ఇతర అంచనాల గురించి రాయండి...')}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-stone-50 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send size={14} /> {t('contact.submitBtn', 'Submit Enquiry Details', 'వివరాలను సమర్పించండి')}
                </button>

              </form>
            )}

          </div>

          {/* Operational Hours & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business hours and address details */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
              <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
                <Clock size={16} className="text-[#10b981]" /> {t('contact.workHours', 'Office Hours & Visitations', 'కార్యాలయ పని వేళలు')}
              </h4>
              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>{t('contact.workingDays', 'Monday - Saturday:', 'సోమవారం - శనివారం:')}</span>
                  <span className="font-bold text-stone-850">9:30 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-stone-100 pb-2">
                  <span>{t('contact.sunday', 'Sunday (Prior Appt Only):', 'ఆదివారం (ముందస్తు అనుమతి):')}</span>
                  <span className="font-bold text-stone-850">10:00 AM - 2:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>{t('contact.holidays', 'National Holidays:', 'జాతీయ సెలవులు:')}</span>
                  <span className="text-orange-600 font-bold">{t('contact.closed', 'Closed', 'సెలవు')}</span>
                </li>
              </ul>
              <div className="p-4 bg-cream-50 rounded-2xl border border-stone-200 text-[11px] text-[#4b5563] leading-relaxed">
                <strong>{t('contact.apptNote', 'Appointment Note:', 'ముందస్తు సమాచారం:')}</strong>{' '}
                {t(
                  'contact.apptDesc',
                  'Families looking for detailed astrology compatibility layout checks are advised to schedule appointments with our matchmaking advisors at least 1 day in advance.',
                  'వివరణాత్మక జాతక అనుకూలత తనిఖీలు కోరుకునే కుటుంబాలు కనీసం 1 రోజు ముందుగానే మా సలహాదారులతో అపాయింట్‌మెంట్‌ను ఖరారు చేసుకోవాల్సిందిగా అభ్యర్థిస్తున్నాము.'
                )}
              </div>
            </div>

            {/* Location Address Detail card */}
            <div className="bg-white rounded-3xl p-1 overflow-hidden border border-stone-200 shadow-md">
              <div className="relative h-64 bg-stone-50 flex items-center justify-center text-center p-6">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                
                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-950 mx-auto border border-emerald-150 shadow-md">
                    <MapPin size={22} className="text-[#10b981]" />
                  </div>
                  <div>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-stone-850">
                      {t('contact.visitOffice', 'Visitable Head Office Location', 'మా ప్రధాన కార్యాలయ చిరునామా')}
                    </h5>
                    <p className="text-[11px] text-stone-500 mt-1 max-w-xs mx-auto">
                      {t('contact.fullAddr', 'Tirupati, Hyderabad, All Over Andhra Pradesh and Telangana.', 'తిరుపతి, హైదరాబాద్, ఆంధ్రప్రదేశ్ మరియు తెలంగాణ అంతటా.')}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-emerald-700 font-semibold uppercase tracking-widest bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200/20 max-w-fit mx-auto">
                    {t('contact.nearMetro', '✓ Serving All Over AP & TS', '✓ ఆంధ్రప్రదేశ్ మరియు తెలంగాణ అంతటా బ్రాంచీలు')}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3.5 Interactive Map Section */}
      <section className="py-12 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-black text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('contact.mapTitle', 'Our Physical Presence & Interactive Map', 'మా కార్యాలయాల స్థానం & ఇంటరాక్టివ్ లొకేషన్ మ్యాప్')}
            </h3>
            <p className="text-stone-500 text-xs sm:text-sm mt-2 leading-relaxed font-semibold">
              {t(
                'contact.mapDesc',
                'Visit our offices in Tirupati or Hyderabad. Connect with senior matchmaking coordinators directly for verified horoscope pairings.',
                'తిరుపతి లేదా హైదరాబాద్ నగరాలలో గల మా సమన్వయ కేంద్రాలను నేరుగా సందర్శించి సీనియర్ అధికారుల సమక్షంలో వెరిఫైడ్ సంబంధాలను ఎంపిక చేసుకోండి.'
              )}
            </p>
          </div>
          
          <div className="rounded-3xl overflow-hidden shadow-lg border border-stone-200 bg-stone-50 p-2 sm:p-3 animate-fade-in">
            <div className="w-full h-[325px] sm:h-[450px] rounded-2xl overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.240755910399!2d79.378939!3d13.626818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78068859a2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1718210000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Sri Lakshmi Matrimony Office Map"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WhatsApp CTA banner */}
      <section className="py-12 bg-cream-100/50 text-center relative border-t border-stone-100">
        <div className="max-w-2xl mx-auto px-4 space-y-4">
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900">
            {t('contact.needHelpTitle', 'Need Help Finding a Suitable Match?', 'మీకు సరైన సంబంధం కనుగొనడంలో సహాయం కావలెనా?')}
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
            {t(
              'contact.needHelpDesc',
              'Contact our matchmaking team today and secure immediate personal support on your mobile.',
              'మా మ్యాచ్ మేకింగ్ బృందంతో వెంటనే చాట్ చేసి మీ మొబైల్ లోనే ప్రత్యక్ష సలహాలు పొందండి.'
            )}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleWhatsApp}
              className="px-5 py-2.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              {t('contact.waBtn', 'WhatsApp Instantly', 'వెంటనే వాట్సాప్ చేయండి')}
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQs Preview */}
      <section className="py-16 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 z-10 relative">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-serif text-xl sm:text-2xl font-extrabold text-stone-900">
              {t('contact.faq', 'Frequently Asked Questions', 'తరచుగా అడిగే ప్రశ్నలు (FAQs)')}
            </h3>
            <p className="text-stone-500 text-xs mt-1">
              {t('contact.faqSub', 'Quick answers regarding matchmaking safety guidelines.', 'మ్యాచ్ మేకింగ్ భద్రతా మార్గదర్శకాలపై త్వరిత సమాధానాలు.')}
            </p>
          </div>
          <FAQAccordion showTitle={false} />
        </div>
      </section>

    </div>
  );
}
