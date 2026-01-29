"use client";
import React, { useState, useMemo } from 'react';
import { Icon, SolidButton } from '@/components/Shared';

export default function InspectionsView() {
    const [activeTab, setActiveTab] = useState('FIRE');
    
    // --- DROPDOWN STATE ---
    const [selectedBuilding, setSelectedBuilding] = useState('Admin Building');
    const [isBuildingMenuOpen, setIsBuildingMenuOpen] = useState(false);
    const buildingOptions = ['Admin Building', 'Warehouse A', 'Warehouse B', 'Vehicle Maintenance Shop'];

    // --- SORTING STATE ---
    const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({ key: null, direction: 'asc' });

    const tabs = [
        { id: 'FIRE', label: 'Fire Extinguisher', icon: 'fire_extinguisher' },
        { id: 'FIRST_AID', label: 'First Aid Kit', icon: 'medical_services' },
        { id: 'AED', label: 'AED', icon: 'monitor_heart' },
        { id: 'BUILDING', label: 'Building Inspection', icon: 'apartment' },
        { id: 'EQUIPMENT', label: 'Equipment', icon: 'handyman' },
    ];

    // --- MOCK DATA ---
    const fireData = [
        { id: 'FE-101', col1: 'Headquarters', col2: 'Main Hallway', col3: 'ABC Dry Chem', date: '2026-01-15', nextDue: '2026-02-15', status: 'PASS' },
        { id: 'FE-104', col1: 'Headquarters', col2: 'Kitchen', col3: 'K-Class', date: '2026-01-10', nextDue: '2026-02-10', status: 'ATTENTION' },
        { id: 'FE-201', col1: 'Warehouse A', col2: 'Loading Dock', col3: 'ABC Dry Chem', date: '2026-01-28', nextDue: '2026-02-28', status: 'PASS' },
        { id: 'FE-205', col1: 'Warehouse A', col2: 'Chemical Storage', col3: 'CO2', date: '2025-12-15', nextDue: '2026-01-15', status: 'FAIL' },
    ];

    const firstAidData = [
        { id: 'FA-01', col1: 'Front Office', col2: 'Level 2 Kit', col3: 'No', date: '2026-01-20', nextDue: '2026-02-20', status: 'PASS' },
        { id: 'FA-02', col1: 'Warehouse Floor', col2: 'Trauma Bag', col3: 'Yes (Bandages)', date: '2026-01-10', nextDue: '2026-02-10', status: 'ATTENTION' },
        { id: 'FA-03', col1: 'Kitchen / Breakroom', col2: 'Level 1 Kit', col3: 'Yes (Burn Gel)', date: '2025-12-05', nextDue: '2026-01-05', status: 'FAIL' },
        { id: 'EW-01', col1: 'Lab 4', col2: 'Eye Wash Station', col3: 'Solution OK', date: '2026-01-28', nextDue: '2026-02-28', status: 'PASS' },
    ];

    const aedData = [
        { id: 'AED-01', col1: 'Main Lobby', col2: '98%', col3: 'Oct 2026', date: '2026-01-25', nextDue: '2026-02-25', status: 'PASS' },
        { id: 'AED-02', col1: 'Gym / Rec Center', col2: '15%', col3: 'Dec 2025', date: '2026-01-10', nextDue: '2026-02-10', status: 'ATTENTION' },
        { id: 'AED-03', col1: '2nd Floor Hallway', col2: '88%', col3: 'Jan 2027', date: '2026-01-22', nextDue: '2026-02-22', status: 'PASS' },
    ];

    const buildingData = [
        { id: 'Roof Inspection', col1: 'Zone A', col2: 'Quarterly', col3: 'Structural', date: '2025-11-01', nextDue: '2026-02-01', status: 'PASS' },
        { id: 'Fire Doors', col1: 'All Floors', col2: 'Monthly', col3: 'Access', date: '2026-01-02', nextDue: '2026-02-02', status: 'PASS' },
        { id: 'HVAC Filters', col1: 'Rooftop Unit 4', col2: 'Bi-Annual', col3: 'Maint.', date: '2025-06-10', nextDue: '2025-12-10', status: 'ATTENTION' },
        { id: 'Emerg. Lighting', col1: 'Stairwell B', col2: 'Monthly', col3: 'Electrical', date: '2025-12-28', nextDue: '2026-01-28', status: 'FAIL' },
    ];

    const equipmentData = [
        { id: 'LD-04', col1: 'Ladder', col2: '12ft Fiberglass', col3: 'Warehouse', date: '2026-01-15', nextDue: '2026-04-15', status: 'PASS' },
        { id: 'FL-02', col1: 'Forklift', col2: 'Toyota 8FGU25', col3: 'Dock A', date: '2026-01-20', nextDue: '2026-02-20', status: 'ATTENTION' },
        { id: 'PT-12', col1: 'Power Drill', col2: 'DeWalt Hammer', col3: 'Workshop', date: '2026-01-05', nextDue: '2026-02-05', status: 'PASS' },
    ];

    // --- HELPERS ---

    const getCurrentData = () => {
        switch (activeTab) {
            case 'FIRE': return fireData;
            case 'FIRST_AID': return firstAidData;
            case 'AED': return aedData;
            case 'BUILDING': return buildingData;
            case 'EQUIPMENT': return equipmentData;
            default: return fireData;
        }
    };

    const getHeaders = () => {
        switch (activeTab) {
            case 'FIRE': return ['Asset ID', 'Building', 'Location', 'Type'];
            case 'FIRST_AID': return ['Kit ID', 'Location', 'Kit Level', 'Restock'];
            case 'AED': return ['Unit ID', 'Location', 'Battery %', 'Pads Exp'];
            case 'BUILDING': return ['Inspection Type', 'Zone / Area', 'Frequency', 'Category'];
            case 'EQUIPMENT': return ['Asset ID', 'Type', 'Model', 'Location'];
            default: return ['ID', 'Col1', 'Col2', 'Col3'];
        }
    };

    // Calculate Stats
    const currentData = getCurrentData();
    const stats = {
        total: currentData.length,
        pass: currentData.filter(i => i.status === 'PASS').length,
        attention: currentData.filter(i => i.status === 'ATTENTION').length,
        fail: currentData.filter(i => i.status === 'FAIL').length,
    };

    // Sorting Logic
    const sortedData = useMemo(() => {
        let sortableItems = [...currentData];
        if (sortConfig.key !== null) {
            sortableItems.sort((a: any, b: any) => {
                const valA = a[sortConfig.key!]?.toString().toLowerCase();
                const valB = b[sortConfig.key!]?.toString().toLowerCase();
                if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [currentData, sortConfig]);

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (name: string) => {
        if (sortConfig.key !== name) return <Icon name="unfold_more" size={16} className="text-slate-300 opacity-50" />;
        return sortConfig.direction === 'asc' 
            ? <Icon name="expand_less" size={16} className="text-indigo-600" /> 
            : <Icon name="expand_more" size={16} className="text-indigo-600" />;
    };

    const headers = getHeaders();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon name="fact_check" size={28} className="text-slate-700" />
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inspections</h2>
                    </div>
                    <p className="text-slate-500 text-sm pl-9">Manage site audits, equipment checks, and compliance.</p>
                </div>
                <div className="shrink-0">
                    <SolidButton label="New Inspection" icon="add" color="slate" />
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200">
                <div className="flex gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSortConfig({ key: null, direction: 'asc' }); }}
                            className={`pb-3 text-sm font-bold flex items-center gap-2 transition-all relative whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'text-indigo-600' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            <Icon name={tab.icon} size={18} />
                            {tab.label}
                            {activeTab === tab.id && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="space-y-6">
                
                {/* 1. DYNAMIC SUMMARY STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Items</div>
                        <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
                        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pass</div>
                        <div className="text-2xl font-bold text-emerald-700">{stats.pass}</div>
                    </div>
                    <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between">
                        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Attention</div>
                        <div className="text-2xl font-bold text-amber-700">{stats.attention}</div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
                        <div className="text-xs font-bold text-red-600 uppercase tracking-wider">Fail</div>
                        <div className="text-2xl font-bold text-red-700">{stats.fail}</div>
                    </div>
                </div>

                {/* 2. DYNAMIC TABLE */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        
                        {/* TITLE SECTION: Changes based on Tab */}
                        <div className="flex items-center gap-3">
                            <h3 className="font-bold text-slate-800 text-lg">
                                {/* If BUILDING, just say 'Building', else 'Fire Extinguisher Log' etc */}
                                {activeTab === 'BUILDING' ? 'Building' : `${tabs.find(t => t.id === activeTab)?.label} Log`}
                            </h3>
                            
                            {/* CUSTOM DROPDOWN (Replaces <select> to allow custom styles) */}
                            {activeTab === 'BUILDING' && (
                                <div className="relative group">
                                    {/* Trigger Button: No Fill, Slate Border, Slate Text */}
                                    <button 
                                        onClick={() => setIsBuildingMenuOpen(!isBuildingMenuOpen)}
                                        className="flex items-center justify-between min-w-[220px] px-4 py-2 rounded-lg text-sm font-bold bg-white text-slate-700 border border-slate-300 hover:border-slate-400 transition-colors shadow-sm"
                                    >
                                        {selectedBuilding}
                                        <Icon name={isBuildingMenuOpen ? "expand_less" : "expand_more"} size={20} className="text-slate-500" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isBuildingMenuOpen && (
                                        <>
                                            {/* Invisible backdrop to close menu on outside click */}
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setIsBuildingMenuOpen(false)}
                                            ></div>
                                            
                                            {/* The Menu List */}
                                            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-20 overflow-hidden">
                                                {buildingOptions.map((opt) => (
                                                    <div
                                                        key={opt}
                                                        onClick={() => { setSelectedBuilding(opt); setIsBuildingMenuOpen(false); }}
                                                        className={`px-4 py-2.5 text-sm font-bold cursor-pointer transition-colors ${
                                                            selectedBuilding === opt 
                                                            ? 'bg-slate-700 text-white'  // Active/Selected style
                                                            : 'text-slate-600 hover:bg-slate-700 hover:text-white' // Hover style
                                                        }`}
                                                    >
                                                        {opt}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-colors shadow-sm">
                            <Icon name="download" size={16} />
                            Export
                            <Icon name="arrow_drop_down" size={18} className="text-slate-400 -mr-1" />
                        </button>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                                        {/* HEADER 1 (ID / Name) */}
                                        <th onClick={() => requestSort('id')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none group w-1/5">
                                            <div className="flex items-center gap-1">{headers[0]} {getSortIcon('id')}</div>
                                        </th>
                                        
                                        {/* HEADER 2 */}
                                        <th onClick={() => requestSort('col1')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none">
                                            <div className="flex items-center gap-1">{headers[1]} {getSortIcon('col1')}</div>
                                        </th>

                                        {/* HEADER 3 */}
                                        <th onClick={() => requestSort('col2')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none hidden sm:table-cell">
                                            <div className="flex items-center gap-1">{headers[2]} {getSortIcon('col2')}</div>
                                        </th>

                                        {/* HEADER 4 */}
                                        <th onClick={() => requestSort('col3')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none hidden md:table-cell">
                                            <div className="flex items-center gap-1">{headers[3]} {getSortIcon('col3')}</div>
                                        </th>

                                        {/* LAST CHECK */}
                                        <th onClick={() => requestSort('date')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none">
                                            <div className="flex items-center gap-1">Last Check {getSortIcon('date')}</div>
                                        </th>

                                        {/* NEXT DUE */}
                                        <th onClick={() => requestSort('nextDue')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none">
                                            <div className="flex items-center gap-1 text-indigo-600">Next Due {getSortIcon('nextDue')}</div>
                                        </th>

                                        {/* STATUS */}
                                        <th onClick={() => requestSort('status')} className="px-4 py-3 font-bold cursor-pointer hover:bg-slate-100 transition-colors select-none">
                                            <div className="flex items-center gap-1">Status {getSortIcon('status')}</div>
                                        </th>

                                        <th className="px-4 py-3 font-bold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-slate-100">
                                    {sortedData.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                            {/* Column 1 (Bold ID) */}
                                            <td className="px-4 py-3 font-bold text-slate-700 flex items-center gap-2">
                                                <Icon name={tabs.find(t => t.id === activeTab)?.icon || 'circle'} size={16} className="text-slate-400 shrink-0" />
                                                {item.id}
                                            </td>

                                            {/* Column 2 */}
                                            <td className="px-4 py-3 text-slate-600">{item.col1}</td>

                                            {/* Column 3 */}
                                            <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{item.col2}</td>

                                            {/* Column 4 */}
                                            <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                                                {activeTab === 'AED' ? (
                                                    <span className={`font-mono text-xs px-2 py-0.5 rounded ${item.status === 'PASS' ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-600 font-bold'}`}>
                                                        {item.col3}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs">{item.col3}</span>
                                                )}
                                            </td>

                                            {/* Last Check */}
                                            <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">{item.date}</td>

                                            {/* Next Due */}
                                            <td className="px-4 py-3 text-indigo-700 font-bold whitespace-nowrap bg-indigo-50/30">
                                                {item.nextDue}
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-4 py-3">
                                                {item.status === 'PASS' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase">
                                                        Pass
                                                    </span>
                                                )}
                                                {item.status === 'ATTENTION' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase">
                                                        Attention
                                                    </span>
                                                )}
                                                {item.status === 'FAIL' && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 uppercase">
                                                        Fail
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button title="View Details" className="text-slate-400 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50 p-1.5 rounded-md border border-slate-200 hover:border-indigo-100">
                                                        <Icon name="visibility" size={18} />
                                                    </button>
                                                    <button title="Edit Record" className="text-slate-400 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50 p-1.5 rounded-md border border-slate-200 hover:border-indigo-100">
                                                        <Icon name="edit" size={18} />
                                                    </button>
                                                    <button title="Delete" className="text-slate-400 hover:text-red-600 transition-colors bg-white hover:bg-red-50 p-1.5 rounded-md border border-slate-200 hover:border-red-100">
                                                        <Icon name="delete" size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Pagination Footer */}
                        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-xs text-slate-500">Showing {currentData.length} records</span>
                            <div className="flex gap-1">
                                <button className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-50"><Icon name="chevron_left" size={18} /></button>
                                <button className="p-1 text-slate-400 hover:text-slate-600"><Icon name="chevron_right" size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}