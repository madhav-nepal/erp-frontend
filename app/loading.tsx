"use client";
import React from 'react';
import { THEME_COLOR } from '@/components/Shared'; // Now using your new alias!

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-slate-50/50">
      <div className="relative w-12 h-12">
         {/* Simple CSS Spinner */}
         <div className="absolute w-full h-full border-4 border-slate-200 rounded-full"></div>
         <div 
            className="absolute w-full h-full border-4 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: `${THEME_COLOR} transparent transparent transparent` }}
         ></div>
      </div>
      <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-wider animate-pulse">
        Loading Workspace...
      </p>
    </div>
  );
}