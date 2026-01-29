"use client";
import React, { useState, useEffect, useRef } from 'react';
import { THEME_COLOR } from '../../lib/constants';
import { Icon } from './Icons';

export function CustomSelect({ options, value, onChange, placeholder }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: any) { if (containerRef.current && !containerRef.current.contains(event.target)) setIsOpen(false); }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="relative" ref={containerRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg px-3 text-sm text-left flex items-center justify-between outline-none focus:border-blue-500">
                <span className={value ? "text-slate-600" : "text-slate-400"}>{value || placeholder}</span>
                <Icon name="expand_more" size={20} className="absolute right-4 text-slate-400" />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {options.map((opt: string) => (
                        <div key={opt} onClick={() => { onChange(opt); setIsOpen(false); }} className="px-3 py-2 text-sm cursor-pointer text-slate-600 hover:text-white transition-colors">
                            <div className="w-full h-full -mx-3 -my-2 px-3 py-2" onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = THEME_COLOR; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#475569'; }}>{opt}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export function InputGroup({ label, value, icon }: any) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">{label}</label>
            <div className="relative">
                <input type="text" defaultValue={value} className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-blue-500" />
                <Icon name={icon} size={20} className="absolute right-3 top-2.5 text-slate-400" />
            </div>
        </div>
    );
}