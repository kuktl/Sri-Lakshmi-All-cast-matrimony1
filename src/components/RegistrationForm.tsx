import React, { useState, useEffect } from 'react';
import { RegistrationInput } from '../types';
import { User, Phone, CheckCircle, Mail, MapPin, Award, UserCheck, Settings, Send, MessageSquare } from 'lucide-react';

export default function RegistrationForm() {
  const [formValues, setFormValues] = useState<RegistrationInput>({
    fullName: '',
    role: '',
    age: '',
    community: '',
    location: '',
    education: '',
    profession: '',
    phone: '',
    whatsapp: '',
    preferredMarriageExpectations: ''
  });

  const [activeSubmissions, setActiveSubmissions] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Read saved submissions on startup
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tr_registrations') || '[]');
    setActiveSubmissions(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Vetting inputs
    if (!formValues.fullName.trim()) return setErrorMessage('Please enter Full Name.');
    if (!formValues.role) return setErrorMessage('Please select whether candidate is a Bride or Groom.');
    
    const ageNum = parseInt(formValues.age);
    if (!formValues.age || isNaN(ageNum) || ageNum < 18 || ageNum > 70) {
      return setErrorMessage('Candidate age must be between 18 and 70.');
    }

    if (!formValues.phone || formValues.phone.length < 10) {
      return setErrorMessage('Please enter a valid 10-digit Phone Number.');
    }

    // Save registration
    const newSubmission = {
      ...formValues,
      id: 'REG-TRG-' + Math.floor(1000 + Math.random() * 9000),
      status: 'Pending Verification',
      submittedAt: new Date().toLocaleDateString()
    };

    const updatedList = [...activeSubmissions, newSubmission];
    localStorage.setItem('tr_registrations', JSON.stringify(updatedList));
    setActiveSubmissions(updatedList);
    setIsSubmitted(true);

    // Forward immediately to WhatsApp
    handleForwardWhatsApp(newSubmission);

    // Reset values
    setFormValues({
      fullName: '',
      role: '',
      age: '',
      community: '',
      location: '',
      education: '',
      profession: '',
      phone: '',
      whatsapp: '',
      preferredMarriageExpectations: ''
    });
  };

  const handleForwardWhatsApp = (sub: any) => {
    const rawText = `Namaste, I registered my ${sub.role} profile on Sri Lakshmi All Caste Matrimony.\n\n*Details:*\n- Name: ${sub.fullName}\n- Profile ID: ${sub.id}\n- Age: ${sub.age} Yrs\n- Community: ${sub.community}\n- Education: ${sub.education}\n- Profession: ${sub.profession}\n- Location: ${sub.location}\n- Preferences: ${sub.preferredMarriageExpectations}\n- Phone: ${sub.phone}\n\nPlease verify and share matching bios.`;
    const text = encodeURIComponent(rawText);
    window.open(`https://wa.me/919121594223?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = (index: number) => {
    const updated = activeSubmissions.filter((_, i) => i !== index);
    localStorage.setItem('tr_registrations', JSON.stringify(updated));
    setActiveSubmissions(updated);
  };

  return (
    <section id="register-section" className="py-16 bg-white relative">
      <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-maroon-100/10 blur-2xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3.5xl font-extrabold text-maroon-950 tracking-tight">
            Register Bride or Groom Details
          </h2>
          <p className="text-stone-500 text-sm mt-3">
            Create a profile in just 2 minutes. Our team will verify and connect you with matching traditional families who fit your partner expectations in Andhra Pradesh and Telangana.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Registration Form Block (col span 7) */}
          <div className="lg:col-span-7 bg-cream-100/40 p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-md">
            
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <UserCheck size={18} className="text-maroon-850" />
                <span className="font-serif font-bold text-base text-maroon-950">Matchmaking Lead Form</span>
              </div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-white outline-1 outline-stone-100 px-3 py-1 rounded-full">
                Free Evaluation Account
              </span>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 px-4" id="form-success-alert">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 border border-green-200 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-xl font-bold text-maroon-950">Registration Submitted!</h3>
                <p className="text-stone-600 text-xs mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you! Your matchmaking profile query has been captured in our queue. We will immediately review the credentials and connect back on your registered phone.
                </p>

                {activeSubmissions.length > 0 && (
                  <div className="mt-6 p-4.5 bg-white rounded-xl border border-green-200/60 max-w-sm mx-auto text-center space-y-3">
                    <p className="text-[11px] text-stone-600 font-semibold">
                      ⚡ Want to expedite your approval process?
                    </p>
                    <button
                      id="opt-whatsapp-speed-up"
                      onClick={() => handleForwardWhatsApp(activeSubmissions[activeSubmissions.length - 1])}
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <MessageSquare size={14} /> Send Profile on WhatsApp
                    </button>
                  </div>
                )}

                <button
                  id="reset-form-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-xs text-maroon-800 hover:text-maroon-950 hover:underline font-bold"
                >
                  Register Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs font-semibold text-red-700" id="form-error-display">
                    ⚠️ {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Candidate Full Name <span className="text-maroon-700">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                        <User size={14} />
                      </span>
                      <input
                        id="form-name-input"
                        type="text"
                        name="fullName"
                        required
                        value={formValues.fullName}
                        onChange={handleChange}
                        placeholder="Bride or Groom name"
                        className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                      />
                    </div>
                  </div>

                  {/* Role selection */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Are you registering a <span className="text-maroon-700">*</span>
                    </label>
                    <select
                      id="form-role-select"
                      name="role"
                      required
                      value={formValues.role}
                      onChange={handleChange}
                      className="w-full text-xs rounded-xl border border-stone-200 py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                    >
                      <option value="">-- Choose Role --</option>
                      <option value="Bride">Bride (Aada pilla)</option>
                      <option value="Groom">Groom (Abbayi)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Age <span className="text-maroon-700">*</span>
                    </label>
                    <input
                      id="form-age-input"
                      type="number"
                      name="age"
                      required
                      min="18"
                      max="70"
                      value={formValues.age}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      className="w-full text-xs rounded-xl border border-stone-200 py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                    />
                  </div>

                  {/* Community preset Goud */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Community / Subdivision
                    </label>
                    <input
                      id="form-community-input"
                      type="text"
                      name="community"
                      required
                      value={formValues.community}
                      onChange={handleChange}
                      placeholder="e.g. Reddy, Kamma, Goud, Kapu, etc."
                      className="w-full text-xs rounded-xl border border-stone-200 py-2.5 px-3 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-maroon-850"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Current Location <span className="text-maroon-700">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                        <MapPin size={14} />
                      </span>
                      <input
                        id="form-location-input"
                        type="text"
                        name="location"
                        required
                        value={formValues.location}
                        onChange={handleChange}
                        placeholder="City (e.g. Hyderabad, TS)"
                        className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Highest Education <span className="text-maroon-700">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                        <Award size={14} />
                      </span>
                      <input
                        id="form-education-input"
                        type="text"
                        name="education"
                        required
                        value={formValues.education}
                        onChange={handleChange}
                        placeholder="e.g. B.Tech, MBA, MBBS"
                        className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Profession details */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Profession &amp; Company <span className="text-maroon-700">*</span>
                  </label>
                  <input
                    id="form-profession-input"
                    type="text"
                    name="profession"
                    required
                    value={formValues.profession}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer at Infosys / Business Owner"
                    className="w-full text-xs rounded-xl border border-stone-200 py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Contact Mobile Number <span className="text-maroon-700">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400 pointer-events-none">
                        <Phone size={14} />
                      </span>
                      <input
                        id="form-phone-input"
                        type="tel"
                        name="phone"
                        required
                        pattern="[0-9]{10,12}"
                        value={formValues.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile phone"
                        className="w-full text-xs rounded-xl border border-stone-200 py-2.5 pl-8 pr-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                      />
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      id="form-whatsapp-input"
                      type="tel"
                      name="whatsapp"
                      placeholder="Can be same as mobile phone"
                      value={formValues.whatsapp}
                      onChange={handleChange}
                      className="w-full text-xs rounded-xl border border-stone-200 py-2.5 px-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white"
                    />
                  </div>
                </div>

                {/* Match criteria expectations */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Preferred Match Details &amp; Expectations <span className="text-stone-400 text-[10px] italic">(Optional)</span>
                  </label>
                  <textarea
                    id="form-expectations-textarea"
                    name="preferredMarriageExpectations"
                    rows={3}
                    value={formValues.preferredMarriageExpectations}
                    onChange={handleChange}
                    placeholder="Specify educational limits, location preferences, salary specs, gotram taboos, or horoscope expectations..."
                    className="w-full text-xs rounded-xl border border-stone-200 p-3 focus:outline-none focus:ring-1 focus:ring-maroon-800 bg-white resize-y"
                  ></textarea>
                </div>

                {/* Submission button */}
                <div className="pt-3">
                  <button
                    id="submit-form-button"
                    type="submit"
                    className="w-full py-3 px-4 font-bold text-sm text-white bg-maroon-900 hover:bg-maroon-950 border border-transparent rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={14} /> Submit Profile Details
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Leads status panel (col span 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Lead Tracking Section (Interactive storage logs) */}
            <div className="bg-cream-100 p-6 rounded-2xl border border-gold-300/30">
              <h3 className="font-serif font-bold text-base text-maroon-950 flex items-center gap-1.5 border-b border-stone-200 pb-3 mb-4">
                <Settings size={18} className="text-gold-650" />
                <span>Your Registration Status</span>
              </h3>

              {activeSubmissions.length > 0 ? (
                <div className="space-y-4" id="registrations-list">
                  <p className="text-[11px] text-stone-500 font-medium">
                    Following entries are saved in this browser's temporary directory. Call support to accelerate verification status:
                  </p>
                  
                  {activeSubmissions.map((sub, idx) => (
                    <div 
                      key={idx}
                      id={`registered-lead-item-${idx}`}
                      className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs relative group"
                    >
                      <button
                        onClick={() => handleDelete(idx)}
                        className="absolute top-2 right-2 text-stone-300 hover:text-red-600 transition-colors text-xs"
                        title="Delete entry"
                        aria-label="Remove entry"
                      >
                        ✕
                      </button>

                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="font-mono text-[10px] font-bold text-maroon-900 bg-maroon-50 px-2 py-0.5 rounded">
                            {sub.id}
                          </span>
                          <h4 className="font-bold text-xs text-stone-850 mt-1">{sub.fullName}</h4>
                        </div>
                        <span className="text-[10px] font-bold text-orange-700 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                          {sub.status}
                        </span>
                      </div>

                      <div className="text-[10.5px] text-stone-600 space-y-1">
                        <p><strong>Desired Role:</strong> {sub.role}</p>
                        <p className="truncate"><strong>Education:</strong> {sub.education}</p>
                        <p className="truncate"><strong>Location:</strong> {sub.location}</p>
                        <p className="text-[9.5px] text-stone-400">Registered: {sub.submittedAt}</p>
                      </div>

                      {/* Expedite button */}
                      <button
                        onClick={() => handleForwardWhatsApp(sub)}
                        className="w-full mt-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 font-bold text-[10px] text-white rounded flex items-center justify-center gap-1.5 transition-all text-center"
                      >
                        <MessageSquare size={10} /> Expedite via WhatsApp
                      </button>

                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8" id="empty-leads-log">
                  <div className="text-stone-300 text-3xl mb-2">📇</div>
                  <h4 className="font-serif text-xs font-bold text-stone-500">No Active Registrations</h4>
                  <p className="text-stone-400 text-[11px] max-w-xs mx-auto mt-1 leading-normal">
                    Once you fill out and submit the registration form, your candidate docket details will append here for active state tracking.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Helper guidelines Card */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-150 relative">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-850 mb-3 uppercase tracking-wider">
                💡 Registration Guidelines
              </h4>
              <ul className="space-y-3.5 text-stone-600 text-xs leading-relaxed list-none pl-0">
                <li className="flex gap-2">
                  <span className="text-gold-600 font-bold">1.</span>
                  <span><strong>Accurate Age:</strong> Please enter candidate age accurately matching certificates (e.g. secondary education logs) to avoid verification failure.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-600 font-bold">2.</span>
                  <span><strong>Active WhatsApp:</strong> Mention working telephone/WhatsApp contacts so matchmaker agents can forward matching PDF bio-datas immediately.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gold-600 font-bold">3.</span>
                  <span><strong>Secure Shield:</strong> Your matches are pre-approved. No information is indexed on open search portals.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
