"use client";
import React from 'react';
import { IncidentRow, Icon } from '@/components/Shared';
import SafetyLeaderboard from './SafetyLeaderboard';
import { SAFETY_LEADERBOARD } from '@/lib/mockData';

// 1. Report Form Component
function ReportIncidentForm() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    {/* Updated accent color to match new theme */}
                    <div className="w-1 h-4 bg-slate-700 rounded-full"></div>
                    <h3 className="font-bold text-slate-800">Report Incident</h3>
                </div>
                <button className="text-slate-400 hover:text-blue-600"><Icon name="settings" size={18} /></button>
            </div>
            
            <div className="space-y-4">
                {/* Date Row */}
                <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Date of Occurrence</label>
                    <input type="date" className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-slate-600 bg-slate-50/50" defaultValue="2026-01-27" />
                </div>

                {/* Report Type */}
                <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                     <select className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 text-slate-600 bg-white">
                        <option>Select report type...</option>
                        <option>Incident (Accident)</option>
                        <option>Hazard (Observation)</option>
                        <option>Near Miss</option>
                     </select>
                </div>

                {/* Title */}
                <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Subject</label>
                     <input type="text" placeholder="e.g. Forklift collision in Zone B" className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 placeholder:text-slate-300" />
                </div>

                {/* Details */}
                <div>
                     <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description</label>
                     <textarea rows={3} placeholder="Describe what happened..." className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-500 placeholder:text-slate-300 resize-none"></textarea>
                </div>

                {/* Buttons */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                    <button className="border border-slate-200 rounded-lg py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                        <Icon name="attach_file" size={16} /> Attach Media
                    </button>
                    {/* Matches the Header Color */}
                    <button className="bg-slate-700 rounded-lg py-2 text-xs font-bold text-white hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors shadow-sm">
                        <Icon name="send" size={16} /> Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

// 2. Main View
export default function IncidentsView() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start h-full">
            
            {/* --- LEFT COLUMN (Header + Filters + List) --- */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* 1. Header Row (Title Left, Button Right) */}
                <div className="flex items-center justify-between">
                    {/* TITLE BLOCK */}
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            {/* Icon color updated to match theme */}
                            <Icon name="verified_user" size={28} className="text-slate-700" />
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Incidents & Hazards</h2>
                        </div>
                        <p className="text-slate-500 text-sm pl-9">Real-time safety log and risk mitigation tracking.</p>
                    </div>

                    {/* BUTTON (Manual Button to guarantee color match) */}
                    <div className="shrink-0">
                        <button className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm">
                            <Icon name="add" size={18} />
                            <span>Create New</span>
                        </button>
                    </div>
                </div>

                {/* 2. Filters (Matches Header Color) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                     {['All Reports', 'Active Cases', 'Investigating', 'Closed', 'Drafts'].map((filter, i) => (
                        <button key={filter} className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${i === 0 ? 'bg-slate-700 text-white border-slate-700 shadow-md' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'}`}>
                            {filter}
                        </button>
                     ))}
                </div>

                {/* 3. The List */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[500px]">
                    <div className="divide-y divide-slate-50">
                        <IncidentRow type="INCIDENT" desc="Forklift bumper damage detected" loc="Warehouse B" time="45m ago" color="red" status="New" />
                        <IncidentRow type="HAZARD" desc="Slippery floor near chemical storage" loc="Main Lab" time="2h ago" color="amber" status="Assigned" />
                        <IncidentRow type="NEAR MISS" desc="Pallet stacking height exceeded" loc="Loading Dock" time="4h ago" color="blue" status="Resolved" />
                        <IncidentRow type="OBSERVATION" desc="PPE compliance check passed" loc="Site A" time="1d ago" color="blue" status="Closed" />
                        <IncidentRow type="HAZARD" desc="Emergency exit blocked by boxes" loc="Corridor 4" time="2d ago" color="red" status="Urgent" />
                    </div>
                </div>
            </div>

            {/* --- RIGHT COLUMN (Form + Leaderboard) --- */}
            <div className="space-y-6 pt-2">
                
                {/* 1. Form */}
                <ReportIncidentForm />

                {/* 2. Leaderboard */}
                <div>
                    <SafetyLeaderboard champions={SAFETY_LEADERBOARD} />
                </div>
            </div>

        </div>
    );
}