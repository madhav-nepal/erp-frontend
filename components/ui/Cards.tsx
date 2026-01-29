"use client";
import React, { useState } from 'react';
import { THEME_COLOR } from '../../lib/constants';
import { StatCardProps, IncidentDoc } from '../../types';
import { Icon } from './Icons';

// --- 1. STATS CARD ---
export function StatsCard({ label, value, color, icon }: StatCardProps) {
    const bgColors: any = { purple: 'bg-purple-50 text-purple-600', green: 'bg-emerald-50 text-emerald-600', blue: 'bg-blue-50 text-blue-600', red: 'bg-rose-50 text-rose-600' };
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${bgColors[color]}`}>
                    <Icon name={icon} size={24} />
                </div>
                <p className="text-xs font-bold text-slate-500">{label}</p>
            </div>
            <span className={`text-2xl font-bold ${bgColors[color].split(' ')[1]}`}>{value}</span>
        </div>
    );
}

// --- 2. INCIDENT CARD ---
interface IncidentCardProps {
    date: string;
    type: string;
    typeColor: 'yellow' | 'red' | 'orange';
    status: string;
    statusColor: 'red' | 'amber' | 'green';
    title: string;
    desc: string;
}

export function IncidentCard({ date, type, typeColor, status, statusColor, title, desc }: IncidentCardProps) {
    const typeClasses: any = { yellow: 'bg-yellow-100 text-yellow-700', red: 'bg-rose-100 text-rose-700', orange: 'bg-orange-100 text-orange-700' };
    const statusClasses: any = { red: 'bg-rose-500 text-white', amber: 'bg-amber-400 text-white', green: 'bg-emerald-500 text-white' };
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">{date}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${typeClasses[typeColor]}`}>{type}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${statusClasses[statusColor]}`}>{status}</span>
                </div>
                <div className="flex gap-2">
                    <button className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Icon name="edit_square" size={18} /></button>
                    <button className="text-rose-500 hover:bg-rose-50 p-1 rounded"><Icon name="delete" size={18} /></button>
                </div>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">{title}</h4>
            <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
        </div>
    );
}

// --- 3. DOCUMENT CARD ---
interface DocumentCardProps {
    title: string;
    icon: string;
    iconColor: string;
    bgColor: string;
    reportBtnLabel: string;
    category: string;
    docs: IncidentDoc[];
}

export function DocumentCard({ title, icon, iconColor, bgColor, reportBtnLabel, category, docs }: DocumentCardProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <div className={`rounded-xl border border-slate-200 shadow-sm overflow-hidden ${bgColor}`}>
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm ${iconColor}`}>
                            <Icon name={icon} size={28} />
                        </div>
                        <div><h3 className="font-bold text-slate-800 text-lg">{title}</h3></div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 bg-white rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap">
                            <Icon name="upload" size={18} />{reportBtnLabel}
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 bg-white rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap">
                            <Icon name="add" size={18} />Create Category
                        </button>
                    </div>
                </div>
                <div className="relative mb-3">
                    <Icon name="search" size={20} className="absolute left-3 top-2.5 text-slate-400" />
                    <input type="text" placeholder="Search Documents" className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-10 pr-4 text-sm text-slate-600 outline-none focus:border-blue-500"/>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button onClick={() => setIsCollapsed(!isCollapsed)} className="w-full flex items-center justify-between p-3 bg-slate-50/50 border-b border-slate-100 hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-2">
                            <Icon name={isCollapsed ? 'chevron_right' : 'expand_more'} className="text-slate-400" />
                            <span className={`w-2.5 h-2.5 rounded-full ${iconColor.replace('text-', 'bg-')}`}></span>
                            <span className="font-bold text-slate-700 text-sm">{category}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{docs.length} documents</span>
                    </button>
                    {!isCollapsed && <div className="divide-y divide-slate-100">{docs.map((doc: IncidentDoc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors group">
                            <div className="flex items-center gap-3">
                                <Icon name={doc.icon} size={24} className={iconColor} />
                                <div><h4 className="font-bold text-slate-700 text-sm">{doc.title}</h4><p className="text-xs text-slate-400">{doc.date} • {doc.size}</p></div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"><Icon name="visibility" size={20} /></button>
                                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors"><Icon name="download" size={20} /></button>
                                <button className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500 transition-colors"><Icon name="delete" size={20} /></button>
                            </div>
                        </div>
                    ))}</div>}
                </div>
            </div>
        </div>
    );
}