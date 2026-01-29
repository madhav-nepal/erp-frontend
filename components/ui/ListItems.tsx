"use client";
import React from 'react';
import { THEME_COLOR } from '@/lib/constants'; // Use alias
import { ViewButton } from './Buttons'; 
// Import your types!
import { Task, NewsItem } from '@/types'; 

// 1. INCIDENT ROW (Define specific props instead of any)
interface IncidentRowProps {
    type: string;
    desc: string;
    loc: string;
    time: string;
    color: 'red' | 'amber' | 'blue';
    status: string;
}

export function IncidentRow({ type, desc, loc, time, color, status }: IncidentRowProps) {
   const colors = { 
       red: 'bg-red-50 text-red-600', 
       amber: 'bg-amber-50 text-amber-600', 
       blue: 'bg-blue-50 text-blue-600' 
   };
   
   return (
      <div className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between group">
         <div className="flex items-center gap-4 flex-1">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase min-w-[70px] text-center ${colors[color]}`}>{type}</span>
            <div>
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors" style={{ '--hover-color': THEME_COLOR } as any}>{desc}</p>
                <p className="text-xs text-slate-400">{loc} • {time}</p>
            </div>
         </div>
         <div className="flex items-center gap-4">
             <div className="text-right"><span className="text-xs font-bold text-slate-600 block">{status}</span></div>
             <ViewButton />
         </div>
      </div>
   );
}

// 2. ADVISORY ROW (Use NewsItem type subset)
export function AdvisoryRow({ title, desc, priority }: Partial<NewsItem>) {
   return (
      <div className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group">
         <div>
             <h4 className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{title}</h4>
             <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
         </div>
         <div className="flex items-center gap-4">
             <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded ${priority === 'HIGH' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{priority}</span>
             <ViewButton />
         </div>
      </div>
   );
}

// 3. TASK ROW (Use Task type subset)
export function TaskRow({ title, location, date, priority }: Partial<Task>) {
   return (
      <div className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group">
         <div>
             <h4 className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{title}</h4>
             <p className="text-xs text-slate-500 mt-0.5">{location}</p>
         </div>
         <div className="flex items-center gap-4">
             <div className="text-right">
                 <span className="text-xs font-bold text-slate-600 block">{date}</span>
                 <span className={`text-[9px] font-bold ${priority === 'HIGH' ? 'text-red-500' : 'text-amber-500'}`}>{priority}</span>
             </div>
             <ViewButton />
         </div>
      </div>
   );
}

// 4. LOADING SKELETON
export function ListSkeleton() {
    return (
        <div className="px-5 py-3 flex items-center justify-between animate-pulse">
             <div className="space-y-2 w-full max-w-[200px]">
                 <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-2 bg-slate-100 rounded w-1/2"></div>
             </div>
             <div className="h-6 w-16 bg-slate-100 rounded"></div>
        </div>
    );
}