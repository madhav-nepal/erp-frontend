"use client";
import React from 'react';
import { THEME_COLOR, Icon } from '../Shared'; // Import Icon from Shared

export default function Header() {
  return (
      <header className="w-full h-16 text-white flex items-center justify-between px-5 shadow-md z-50 shrink-0 relative" style={{ backgroundColor: THEME_COLOR }}>
        {/* Logo Area */}
        <div className="flex items-center gap-3 min-w-[200px]">
           {/* OLD: <span className="material-symbols-outlined text-[40px]...">apartment</span> */}
           {/* NEW: */}
           <Icon name="apartment" size={40} className="leading-none" />
           
           <div className="flex flex-col justify-between h-[38px]">
              <h1 className="font-bold text-xl leading-none tracking-tight pt-0.5">ORG PORTAL</h1>
              <span className="text-[11px] opacity-80 uppercase tracking-wider font-medium leading-none pb-0.5">Enterprise ERP</span>
           </div>
        </div>

        {/* Search Bar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg hidden md:block">
           <div className="relative text-white/80 focus-within:text-white transition-colors">
              {/* OLD: <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px]">search</span> */}
              {/* NEW: */}
              <div className="absolute left-3 top-2.5">
                  <Icon name="search" size={20} />
              </div>
              <input type="text" placeholder="Search operations, personnel, or assets..." className="w-full h-10 bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-black/30 focus:border-white/30 transition-all shadow-inner"/>
           </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4 min-w-[200px] justify-end">
           <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/10 rounded-full"><Icon name="notifications" size={20} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full"><Icon name="light_mode" size={20} /></button>
              <button className="p-2 hover:bg-white/10 rounded-full"><Icon name="settings" size={20} /></button>
           </div>
           <div className="h-8 w-[1px] bg-white/20 mx-1"></div>
           <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block leading-tight">
                 <p className="font-bold text-sm">Mike Smith</p>
                 <p className="text-[10px] opacity-80 font-medium">Corp Director</p>
              </div>
              <div className="size-9 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white/20" style={{ color: THEME_COLOR }}>MS</div>
           </div>
        </div>
      </header>
  );
}