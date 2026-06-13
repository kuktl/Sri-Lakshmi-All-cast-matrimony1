import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQAccordionProps {
  showTitle?: boolean;
}

export default function FAQAccordion({ showTitle = true }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']); // default open the first FAQ
  const { t } = useLanguage();

  const toggleFAQ = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter(item => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const accordionList = (
    <div className="space-y-4" id="faq-accordions-group">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openIds.includes(item.id);
        const questionText = t(`faq.${item.id}.question`, item.question, item.teluguQuestion || item.question);
        const answerText = t(`faq.${item.id}.answer`, item.answer, item.teluguAnswer || item.answer);

        return (
          <div 
            key={item.id}
            id={`faq-accordion-item-${item.id}`}
            className="bg-white rounded-xl shadow-xs border border-stone-200/65 overflow-hidden transition-all duration-300 hover:border-gold-300"
          >
            {/* Header Toggle Click Button */}
            <button
              id={`faq-btn-${item.id}`}
              onClick={() => toggleFAQ(item.id)}
              className="w-full px-6 py-4.5 flex items-center justify-between text-left font-sans font-semibold text-stone-850 hover:text-maroon-900 transition-colors focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2.5 pr-4 text-xs sm:text-sm md:text-base leading-snug">
                <HelpCircle size={18} className="text-maroon-800 shrink-0" />
                <span>{questionText}</span>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gold-600 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Collapsible Answer Content */}
            <div 
              id={`faq-answer-content-${item.id}`}
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-56 border-t border-stone-100' : 'max-h-0'
              }`}
            >
              <p className="px-6 py-4 text-xs sm:text-sm text-stone-600 leading-relaxed bg-stone-50">
                {answerText}
              </p>
            </div>

          </div>
        );
      })}
    </div>
  );

  if (!showTitle) {
    return accordionList;
  }

  return (
    <section id="faq-section" className="py-16 bg-cream-100/35 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="h-[1px] w-12 bg-gold-400"></span>
            <span className="mandala-bullet"></span>
            <span className="h-[1px] w-12 bg-gold-400"></span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-maroon-950 tracking-tight">
            {t('faq.section_title', 'Frequently Asked Questions', 'తరచుగా అడిగే ప్రశ్నలు (FAQs)')}
          </h2>
          <p className="text-stone-500 text-sm mt-3">
            {t(
              'faq.section_desc',
              'Get instant answers regarding our matrimonial community matching criteria, profile verification safety, and register procedures.',
              'మా వివాహ మ్యాచ్ మేకింగ్ ప్రమాణాలు, ప్రొఫైల్స్ ధృవీకరణ భద్రత మరియు రిజిస్ట్రేషన్ విధానాల గురించి ఇక్కడే తక్షణ సమాధానాలు పొందండి.'
            )}
          </p>
        </div>

        {accordionList}

      </div>
    </section>
  );
}
