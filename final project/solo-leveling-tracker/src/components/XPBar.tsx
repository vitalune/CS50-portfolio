'use client';

import { useUser } from '@/contexts/UserContext';

export default function XPBar() {
  const { state } = useUser();
  const progressPercentage = (state.currentXP / state.xpForNextLevel) * 100;

  return (
    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ease-out shadow-lg xp-bar"
        style={{ width: `${progressPercentage}%` }}
      >
        <div className="h-full bg-gradient-to-r from-white/20 to-transparent" />
      </div>
    </div>
  );
}