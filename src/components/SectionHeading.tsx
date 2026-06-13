import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  centered?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl mb-12 ${centered ? 'text-center mx-auto' : 'text-left'}`}>
      
      {badge && (
        <div className={`flex items-center gap-2 mb-2 ${centered ? 'justify-center' : 'justify-start'}`}>
          <span className="h-[1px] w-6 bg-gold-450"></span>
          <span className="text-gold-550 text-[10px] tracking-widest uppercase font-extrabold">{badge}</span>
          <span className="h-[1px] w-6 bg-gold-450"></span>
        </div>
      )}

      <h2 className="font-serif text-2.5xl sm:text-3.5xl font-extrabold text-maroon-950 tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-stone-500 text-xs sm:text-sm mt-2.5 max-w-2xl mx-auto leading-relaxed font-medium">
          {subtitle}
        </p>
      )}

      <div className={`w-12 h-1 bg-gold-500 rounded-full mt-4 ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
}
