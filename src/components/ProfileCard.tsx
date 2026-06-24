import React, { useState } from 'react';
import { Profile } from '../types';
import { Lock, CheckCircle, Briefcase, FileText, Eye, X } from 'lucide-react';
import { profileRef } from '../lib/format';

interface ProfileCardProps {
  key?: string;
  profile: Profile;
  onRequestDetails: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onRequestDetails }: ProfileCardProps) {
  const [showPhoto, setShowPhoto] = useState(false);
  const refCode = profileRef(profile);

  return (
    <div
      id={`profile-card-${profile.id}`}
      className="bg-white rounded-2xl shadow-sm border border-stone-200/60 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
    >
      {/* Visual Traditional Frame Accent */}
      <div className="absolute top-0 left-0 w-2 h-full bg-maroon-800/10 group-hover:bg-maroon-800 transition-colors"></div>

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4 pl-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-maroon-900 bg-maroon-50 px-2.5 py-1 rounded-md border border-maroon-100">
            {refCode}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
          profile.gender === 'Bride'
            ? 'text-pink-700 bg-pink-50 border-pink-200'
            : 'text-blue-700 bg-blue-50 border-blue-200'
        }`}>
          {profile.community} {profile.gender}
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
              {profile.community} {profile.gender}, {profile.age} Yrs
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
            <span className="text-stone-400 block font-medium">Height:</span>
            <span className="font-semibold text-stone-700">{profile.height || '5\'5"'}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Gotram:</span>
            <span className="font-semibold text-stone-700">{profile.gotram || 'Verified'}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Native Place:</span>
            <span className="font-semibold text-stone-700 truncate block max-w-full" title={profile.nativePlace}>{profile.nativePlace || 'Telangana'}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-medium">Star (Nakshatram):</span>
            <span className="font-semibold text-stone-700">{profile.star || 'Matching'}</span>
          </div>
        </div>

        {/* Privacy locked block indicator */}
        <div className="flex items-center gap-1.5 text-[10px] text-stone-400 bg-stone-50 p-2 rounded-lg border border-stone-100">
          <Lock size={12} className="text-orange-400 animate-pulse" />
          <span>Family background & contact details locked.</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-4 mt-1 border-t border-stone-100 pl-2 flex gap-2">
        <button
          id={`view-btn-${profile.id}`}
          onClick={() => setShowPhoto(true)}
          className="flex-none py-2.5 px-3 font-semibold text-xs text-gold-700 hover:text-white bg-gold-50 hover:bg-gold-500 border border-gold-200 hover:border-transparent rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Eye size={13} /> View
        </button>
        <button
          id={`request-btn-${profile.id}`}
          onClick={() => onRequestDetails(profile)}
          className="flex-1 py-2.5 px-4 font-semibold text-xs text-maroon-800 hover:text-white bg-maroon-50 hover:bg-maroon-800 border border-maroon-200 hover:border-transparent rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <FileText size={12} /> Request Profile Details
        </button>
      </div>

      {/* Photo flash card */}
      {showPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="relative w-full max-w-xs bg-white rounded-2xl overflow-hidden shadow-2xl border border-gold-300/50 animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPhoto(false)}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors border-none cursor-pointer"
            >
              <X size={16} />
            </button>
            <img
              src={profile.imageUrl}
              alt={`${profile.community} ${profile.gender}`}
              referrerPolicy="no-referrer"
              className="w-full aspect-square object-cover"
            />
            <div className="px-4 py-3 text-center bg-maroon-900 text-white">
              <h3 className="font-serif font-bold text-base">
                {profile.community} {profile.gender}
              </h3>
              <p className="text-gold-200 text-xs mt-0.5">{refCode} · {profile.age} Yrs</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
