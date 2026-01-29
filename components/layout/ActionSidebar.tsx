"use client";
import React from 'react';
import { THEME_COLOR, Icon } from '../Shared';

export default function ActionSidebar() {
    return (
        <aside className="w-72 bg-white border-l border-slate-200 flex-shrink-0 flex flex-col hidden 2xl:flex overflow-y-auto">
           <div className="p-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Pending Actions</h3>
              <div className="bg-slate-800 rounded-xl p-5 text-white shadow-lg mb-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon name="schedule" size={60} />
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1">Timesheet Submission</p>
                 <p className="text-sm font-bold mb-4">Due in 14h 42m</p>
                 <button className="w-full py-2 hover:bg-opacity-90 rounded-lg text-[11px] font-bold transition-colors" style={{ backgroundColor: THEME_COLOR }}>Open Timesheet</button>
              </div>
              <div className="h-px bg-slate-100 my-5"></div>
              <div className="mb-5">
                 <h4 className="font-bold text-slate-700 text-sm mb-3">Quick Links</h4>
                 <div className="space-y-2">
                    <a href="#" className="block text-xs hover:underline" style={{ color: THEME_COLOR }}>Submit Expense Report</a>
                    <a href="#" className="block text-xs hover:underline" style={{ color: THEME_COLOR }}>Request Time Off</a>
                    <a href="#" className="block text-xs hover:underline" style={{ color: THEME_COLOR }}>IT Support Ticket</a>
                 </div>
              </div>
           </div>
        </aside>
    );
}