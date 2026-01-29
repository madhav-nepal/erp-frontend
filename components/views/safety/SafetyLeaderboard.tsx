"use client";
import React from 'react';
import { Icon, THEME_COLOR } from '@/components/Shared';
import { SafetyChampion } from '@/types';

export default function SafetyLeaderboard({ champions }: { champions: SafetyChampion[] }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-fit">
            <div className="px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-2 mb-1">
                    <Icon name="emoji_events" size={24} className="text-amber-500" />
                    <h3 className="font-bold text-slate-800">Safety Champions</h3>
                </div>
                <p className="text-xs text-slate-500">Top contributors this month</p>
            </div>
            
            <div className="divide-y divide-slate-50">
                {champions.map((champ, index) => (
                    <div key={champ.id} className="px-5 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                        {/* Rank Badge */}
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 
                            ${index === 0 ? 'bg-amber-100 text-amber-700' : 
                              index === 1 ? 'bg-slate-200 text-slate-600' : 
                              index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'}`}>
                            {index + 1}
                        </div>

                        {/* Avatar & Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                                <h4 className="text-sm font-bold text-slate-700 truncate">{champ.name}</h4>
                                {champ.badges.includes('verified') && <Icon name="verified" size={14} className="text-blue-500" />}
                                {champ.badges.includes('star') && <Icon name="star" size={14} className="text-amber-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 truncate">{champ.role}</p>
                        </div>

                        {/* Points */}
                        <div className="text-right">
                            <span className="block text-sm font-bold text-indigo-600">{champ.points}</span>
                            <span className="text-[10px] text-slate-400">pts</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center justify-center gap-1 w-full">
                    View Full Rankings <Icon name="arrow_forward" size={14} />
                </button>
            </div>
        </div>
    );
}