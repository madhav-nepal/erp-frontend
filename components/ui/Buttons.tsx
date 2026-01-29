"use client";
import React from 'react';
import { THEME_COLOR } from '../../lib/constants';
import { Icon } from './Icons'; // Import local or from Shared

export function SolidButton({ label, icon, color, onClick }: any) {
   const colorClasses: any = {
       red: 'bg-rose-600 hover:bg-rose-700',
       indigo: 'bg-indigo-600 hover:bg-indigo-700',
       theme: `bg-[${THEME_COLOR}] hover:bg-opacity-90`
   };
   return (
      <button onClick={onClick} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold text-white transition-colors shadow-sm ${colorClasses[color] || ''}`} style={color === 'theme' ? { backgroundColor: THEME_COLOR } : {}}>
         <Icon name={icon} size={12} />
         {label}
      </button>
   );
}

export function FilterButton({ label, active, onClick }: any) {
    return (
        <button onClick={onClick} className={`px-4 py-1.5 rounded-md text-xs font-bold border transition-colors hover:bg-slate-50`} style={{ backgroundColor: active ? THEME_COLOR : 'white', color: active ? 'white' : '#475569', borderColor: active ? THEME_COLOR : '#e2e8f0' }}>
            {label}
        </button>
    );
}

export function ViewButton() {
   return <button className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-colors" style={{ color: THEME_COLOR, backgroundColor: `${THEME_COLOR}15` }}><Icon name="visibility" size={12} />View</button>;
}