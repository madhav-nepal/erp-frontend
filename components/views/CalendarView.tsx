"use client";
import React from 'react';
import { THEME_COLOR, Icon } from '../Shared';
import { CALENDAR_EVENTS } from '../../lib/mockData';

export default function CalendarView({ title = "Events Calendar" }: { title?: string }) {
    const days = Array.from({ length: 35 }, (_, i) => i + 1);

    // Extract events for the sidebar list
    const upcomingEvents = Object.entries(CALENDAR_EVENTS).flatMap(([day, events]) =>
        events.map(event => ({ ...event, day }))
    );

    return (
        <div className="space-y-4 h-full flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                    <Icon name="calendar_month" size={28} className="text-indigo-600" />
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                </div>
                <div className="flex gap-2">
                    <button className="p-1 hover:bg-slate-200 rounded"><Icon name="chevron_left" size={20} /></button>
                    <span className="font-bold text-slate-700">October 2025</span>
                    <button className="p-1 hover:bg-slate-200 rounded"><Icon name="chevron_right" size={20} /></button>
                </div>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* MAIN CALENDAR GRID (Left Side) */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                            <div key={d} className="py-2 text-center text-xs font-bold text-slate-500 uppercase">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                        {days.map(day => {
                            const dayEvents = CALENDAR_EVENTS[day] || [];
                            return (
                                <div key={day} className={`border-b border-r border-slate-100 p-2 min-h-[80px] hover:bg-slate-50 transition-colors relative group ${day > 31 ? 'bg-slate-50/50 text-slate-300' : ''}`}>
                                    <span className={`text-xs font-bold ${day === 27 ? 'bg-blue-600 text-white w-6 h-6 flex items-center justify-center rounded-full' : 'text-slate-700'}`}>{day <= 31 ? day : day - 31}</span>
                                    <div className="mt-1 space-y-1">
                                        {dayEvents.map((ev: any) => (
                                            <div key={ev.id} className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold truncate cursor-pointer hover:bg-indigo-200">
                                                {ev.title}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDEBAR (Restored) */}
                <div className="w-80 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col shrink-0">
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
                         <h3 className="font-bold text-slate-700 text-sm">Upcoming Events</h3>
                         <button className="text-slate-400 hover:text-blue-600"><Icon name="filter_list" size={18} /></button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                         {upcomingEvents.length === 0 && <p className="text-slate-400 text-center text-sm py-4">No upcoming events</p>}
                         
                         {upcomingEvents.map((ev: any, idx) => (
                             <div key={idx} className="p-3 border border-slate-100 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors group cursor-pointer">
                                 <div className="flex items-center justify-between mb-1">
                                     <span className="text-xs font-bold text-slate-500 group-hover:text-blue-600">Oct {ev.day}</span>
                                     <span className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${ev.type === 'audit' ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>{ev.type}</span>
                                 </div>
                                 <h4 className="font-bold text-slate-800 text-sm mb-0.5">{ev.title}</h4>
                                 <div className="flex items-center gap-1 text-slate-400 text-xs">
                                     <Icon name="schedule" size={14} />
                                     <span>{ev.time}</span>
                                 </div>
                             </div>
                         ))}
                    </div>
                    <div className="p-3 border-t border-slate-100">
                         <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 transition-colors">
                            Sync Calendar
                         </button>
                    </div>
                </div>
            </div>
        </div>
    );
}