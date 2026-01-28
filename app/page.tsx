"use client";
import React, { useState, useEffect, useRef } from 'react';

// --- THEME COLOR ---
const THEME_COLOR = '#426377'; 

// --- MOCK DATA FOR CALENDAR ---
const CALENDAR_EVENTS: any = {
    24: [{ id: 1, title: 'System Maintenance', time: '02:00 AM - 06:00 AM', type: 'maintenance' }],
    26: [{ id: 2, title: 'Safety Audit', time: '10:00 AM - 11:30 AM', type: 'audit' }],
    27: [{ id: 3, title: 'Quarterly Budget Review', time: '02:00 PM - 04:00 PM', type: 'meeting' }]
};

// --- MOCK DATA FOR H&S COMMITTEE DOCUMENTS ---
const COMMITTEE_DOCS = {
    incidents: [
        { id: 1, title: 'Slip and Fall - Warehouse Area.pdf', date: '2025-01-15', size: '2.4 MB', icon: 'picture_as_pdf' },
        { id: 2, title: 'Equipment Malfunction - Production Line.pdf', date: '2025-01-18', size: '1.8 MB', icon: 'picture_as_pdf' },
        { id: 3, title: 'Chemical Spill - Storage Room.pdf', date: '2025-01-22', size: '3.1 MB', icon: 'picture_as_pdf' },
    ],
    nearMisses: [
        { id: 4, title: 'Forklift Near Collision - Loading Dock.pdf', date: '2025-01-16', size: '1.5 MB', icon: 'picture_as_pdf' },
        { id: 5, title: 'Overhead Crane Close Call.pdf', date: '2025-01-20', size: '2.2 MB', icon: 'picture_as_pdf' },
        { id: 6, title: 'Electrical Hazard Identification.pdf', date: '2025-01-24', size: '1.9 MB', icon: 'picture_as_pdf' },
    ]
};

// --- DATA STRUCTURE ---
type MenuItem = {
  id: string;
  label: string;
  icon: string;
  sub?: { id: string; label: string; icon?: string }[];
};

const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' }, 
  { 
    id: 'safety', label: 'Health & Safety', icon: 'health_and_safety',
    sub: [
      { id: 'incidents', label: 'Incidents & Hazards', icon: 'warning' },
      { id: 'training', label: 'Safety Training', icon: 'model_training' },
      { id: 'committee', label: 'H&S Committee', icon: 'groups' },
      { id: 'safety-calendar', label: 'Safety Calendar', icon: 'calendar_month' },
      { id: 'inspections', label: 'Inspections', icon: 'fact_check' }, 
    ]
  },
  { id: 'news', label: 'News & Notices', icon: 'notifications' },
  { 
    id: 'budget', label: 'Budget Planning', icon: 'payments',
    sub: [
      { id: 'planning', label: 'Fiscal Planning', icon: 'account_balance' },
      { id: 'expenses', label: 'Expenses', icon: 'receipt_long' },
      { id: 'reports', label: 'Financial Reports', icon: 'description' }
    ]
  },
  { id: 'calendar', label: 'Events Calendar', icon: 'calendar_month' },
  { id: 'certs', label: 'Certification & Licenses', icon: 'card_membership' },
  { id: 'docs', label: 'Document Center', icon: 'folder' },
  { 
    id: 'benefits', label: 'My Benefits', icon: 'favorite',
    sub: [
        { id: 'health', label: 'Health Plan', icon: 'medical_services' },
        { id: 'savings', label: 'Savings & RRSP', icon: 'savings' }
    ]
  },
  { id: 'learning', label: 'My Learning', icon: 'school' },
  { id: 'quiz', label: 'My Quiz', icon: 'help' },
  { id: 'permits', label: 'PermitsPro', icon: 'description' },
  { 
    id: 'timesheet', label: 'Time Sheet', icon: 'schedule',
    sub: [
        { id: 'current', label: 'Current Period', icon: 'today' },
        { id: 'history', label: 'History', icon: 'history' }
    ]
  },
];

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<string>('safety');
  const [activePage, setActivePage] = useState<string>('committee');
  
  const [isPrimaryCollapsed, setIsPrimaryCollapsed] = useState(false);
  const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState(false);
  
  const [apiStatus, setApiStatus] = useState("Checking...");

  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState<number>(27);
  const [activeInspectionTab, setActiveInspectionTab] = useState("Fire Extinguisher");

  const currentSubMenu = MENU_ITEMS.find(item => item.id === activeCategory)?.sub;

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status ? "Online" : "Error"))
      .catch(() => setApiStatus("Offline"));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 font-sans text-[13px]" style={{ color: THEME_COLOR }}>
      
      {/* --- HEADER --- */}
      <header className="w-full h-16 text-white flex items-center justify-between px-5 shadow-md z-50 shrink-0 relative" style={{ backgroundColor: THEME_COLOR }}>
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3 min-w-[200px]">
           <span className="material-symbols-outlined text-[40px] leading-none" style={{ fontSize: '40px' }}>apartment</span>
           <div className="flex flex-col justify-between h-[38px]">
              <h1 className="font-bold text-xl leading-none tracking-tight pt-0.5">ORG PORTAL</h1>
              <span className="text-[11px] opacity-80 uppercase tracking-wider font-medium leading-none pb-0.5">Enterprise ERP</span>
           </div>
        </div>

        {/* Center: Search Bar */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg hidden md:block">
           <div className="relative text-white/80 focus-within:text-white transition-colors">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[20px]">search</span>
              <input 
                type="text" 
                placeholder="Search operations, personnel, or assets..." 
                className="w-full h-10 bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-black/30 focus:border-white/30 transition-all shadow-inner"
              />
           </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 min-w-[200px] justify-end">
           <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">notifications</span></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">light_mode</span></button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><span className="material-symbols-outlined text-[20px]">settings</span></button>
           </div>
           
           <div className="h-8 w-[1px] bg-white/20 mx-1"></div>
           
           <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block leading-tight">
                 <p className="font-bold text-sm">Mike Smith</p>
                 <p className="text-[10px] opacity-80 font-medium">Corp Director</p>
              </div>
              <div className="size-9 rounded-full bg-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white/20" style={{ color: THEME_COLOR }}>
                 MS
              </div>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- PANE 1: PRIMARY CATEGORIES --- */}
        <aside 
            className={`bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 ease-in-out relative
            ${isPrimaryCollapsed ? 'w-[72px]' : 'w-[260px]'}
            `}
        >
           <nav className="flex-1 overflow-y-auto">
              {MENU_ITEMS.map((item) => {
                 const isActive = activeCategory === item.id;
                 
                 return (
                    <button
                       key={item.id}
                       onClick={() => {
                          setActiveCategory(item.id);
                          if (item.sub && item.sub.length > 0) setActivePage(item.sub[0].id);
                       }}
                       style={{ 
                           borderLeft: isActive ? `4px solid ${THEME_COLOR}` : '4px solid transparent',
                           borderBottom: isActive ? `1px solid ${THEME_COLOR}` : '1px solid #f1f5f9',
                           color: isActive ? THEME_COLOR : '#64748b',
                           backgroundColor: isActive ? `${THEME_COLOR}15` : 'transparent'
                       }}
                       className={`w-full flex items-center h-12 transition-all group relative ${isPrimaryCollapsed ? 'justify-center px-0' : 'justify-between px-4'} hover:bg-slate-50`}
                       title={isPrimaryCollapsed ? item.label : ''}
                    >
                       <div className="flex items-center gap-3">
                          <span className={`material-symbols-outlined text-[22px] shrink-0 ${isActive ? '' : 'group-hover:text-slate-600'}`}>
                             {item.icon}
                          </span>
                          {!isPrimaryCollapsed && (
                             <span className={`text-[15px] font-medium whitespace-nowrap ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                          )}
                       </div>
                       {!isPrimaryCollapsed && item.sub && (
                          <span className="material-symbols-outlined text-[16px]" style={{ color: isActive ? THEME_COLOR : '#cbd5e1' }}>chevron_right</span>
                       )}
                    </button>
                 );
              })}
           </nav>

           <div className={`h-10 border-t border-slate-200 flex items-center bg-slate-50 shrink-0 ${isPrimaryCollapsed ? 'justify-center' : 'justify-end pr-4'}`}>
                <button 
                    onClick={() => setIsPrimaryCollapsed(!isPrimaryCollapsed)}
                    className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
                    style={{ color: isPrimaryCollapsed ? undefined : '#94a3b8' }}
                >
                    <span className="material-symbols-outlined">
                        {isPrimaryCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
                    </span>
                </button>
           </div>
        </aside>

        {/* --- PANE 2: SECONDARY SUB-MENU --- */}
        {currentSubMenu && (
           <aside 
                className={`bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300 ease-in-out overflow-hidden
                ${isSecondaryCollapsed ? 'w-[72px]' : 'w-[240px]'}
                `}
           >
              <div className={`h-12 flex items-center border-b border-slate-100 shrink-0 bg-slate-50/50 ${isSecondaryCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
                 {!isSecondaryCollapsed && (
                     <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest truncate">
                        {MENU_ITEMS.find(i => i.id === activeCategory)?.label}
                     </h2>
                 )}
                 {isSecondaryCollapsed && (
                     <span className="material-symbols-outlined text-slate-400 text-[20px]">more_horiz</span>
                 )}
              </div>

              <nav className="p-0 flex-1 overflow-y-auto">
                 {currentSubMenu.map((subItem) => {
                    const isPageActive = activePage === subItem.id;

                    return (
                       <button
                          key={subItem.id}
                          onClick={() => setActivePage(subItem.id)}
                          style={{ 
                             borderLeft: isPageActive ? `4px solid ${THEME_COLOR}` : '4px solid transparent',
                             borderBottom: isPageActive ? `1px solid ${THEME_COLOR}` : '1px solid #f1f5f9',
                             color: isPageActive ? THEME_COLOR : '#64748b',
                             backgroundColor: isPageActive ? `${THEME_COLOR}15` : 'transparent'
                          }}
                          className={`w-full flex items-center transition-all h-12 hover:bg-slate-50
                             ${isSecondaryCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-6'}
                          `}
                          title={isSecondaryCollapsed ? subItem.label : ''}
                       >
                          {subItem.icon && (
                             <span className={`material-symbols-outlined text-[18px] shrink-0 ${isPageActive ? '' : 'opacity-70'}`}>{subItem.icon}</span>
                          )}
                          {!isSecondaryCollapsed && (
                             <span className={`text-[14px] whitespace-nowrap ${isPageActive ? 'font-bold' : ''}`}>{subItem.label}</span>
                          )}
                       </button>
                    );
                 })}
              </nav>

              <div className={`h-10 border-t border-slate-200 flex items-center bg-slate-50 shrink-0 ${isSecondaryCollapsed ? 'justify-center' : 'justify-end pr-4'}`}>
                <button 
                    onClick={() => setIsSecondaryCollapsed(!isSecondaryCollapsed)}
                    className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center"
                >
                    <span className="material-symbols-outlined">
                        {isSecondaryCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
                    </span>
                </button>
              </div>
           </aside>
        )}

        {/* --- PANE 3: MAIN CONTENT AREA --- */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 relative">
          
          <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0">
             <div className="flex items-center gap-2 text-slate-500 text-xs">
                <span className="font-semibold text-slate-800">
                   {MENU_ITEMS.find(i => i.id === activeCategory)?.label}
                </span>
                
                {currentSubMenu && (
                   <>
                      <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                      <span className="font-bold" style={{ color: THEME_COLOR }}>
                         {currentSubMenu.find(s => s.id === activePage)?.label}
                      </span>
                   </>
                )}
             </div>

             <span className={`text-[10px] px-2 py-0.5 rounded border ${apiStatus === 'Online' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                API: {apiStatus}
             </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
             
             {/* --- CONTENT SWITCHING LOGIC --- */}

             {activeCategory === 'safety' && activePage === 'committee' ? (
                // --- NEW H&S COMMITTEE VIEW ---
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-[28px] text-blue-600">groups</span>
                                <h2 className="text-2xl font-bold text-slate-900">H&S Committee</h2>
                        </div>
                        <p className="text-slate-500 text-sm">Access and manage Health & Safety Committee documents and reports.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Incident Reports Card */}
                        <DocumentCard
                            title="Incident Reports"
                            // Description removed as requested
                            icon="warning"
                            iconColor="text-orange-500"
                            bgColor="bg-orange-50/50"
                            reportBtnLabel="Incident Report"
                            category="All Incidents"
                            docs={COMMITTEE_DOCS.incidents}
                        />
                        {/* Near Miss Reports Card */}
                        <DocumentCard
                            title="Near Miss Reports"
                            // Description removed as requested
                            icon="error"
                            iconColor="text-yellow-500"
                            bgColor="bg-yellow-50/50"
                            reportBtnLabel="Near Miss Report"
                            category="All Near Misses"
                            docs={COMMITTEE_DOCS.nearMisses}
                        />
                    </div>
                </div>

             ) : activeCategory === 'safety' && activePage === 'safety-calendar' ? (
                // --- NEW SAFETY CALENDAR VIEW ---
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-[28px] text-indigo-500">calendar_month</span>
                                <h2 className="text-2xl font-bold text-slate-900">Safety Calendar</h2>
                            </div>
                            <p className="text-slate-500 text-sm">Schedule and manage upcoming safety events and meetings</p>
                        </div>
                        <button 
                            className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-bold text-white transition-colors shadow-sm hover:bg-opacity-90"
                            style={{ backgroundColor: THEME_COLOR }}
                        >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                            Create Event
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
                        {/* CALENDAR GRID */}
                        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                            <div className="flex items-center justify-between mb-4 shrink-0">
                                <h3 className="font-bold text-slate-800 text-lg">January 2026</h3>
                                <div className="flex gap-2">
                                    <button className="p-1 hover:bg-slate-50 rounded"><span className="material-symbols-outlined text-slate-500">chevron_left</span></button>
                                    <button className="p-1 hover:bg-slate-50 rounded"><span className="material-symbols-outlined text-slate-500">chevron_right</span></button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-7 border-b border-slate-200 text-center text-xs font-bold text-slate-500 py-2 shrink-0">
                                <div>SUN</div><div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div>
                            </div>
                            <div className="grid grid-cols-7 auto-rows-fr flex-1">
                                {[...Array(35)].map((_, i) => {
                                    const day = i - 3;
                                    const isDateValid = day > 0 && day <= 31;
                                    const isSelected = selectedDate === day;
                                    const isToday = day === 27;
                                    const hasEvent = isDateValid && CALENDAR_EVENTS[day];

                                    return (
                                        <div 
                                            key={i} 
                                            onClick={() => isDateValid && setSelectedDate(day)}
                                            className={`
                                                border-b border-r border-slate-100 p-1 relative cursor-pointer transition-all
                                                ${i % 7 === 6 ? 'border-r-0' : ''} 
                                                ${isSelected ? 'bg-blue-50/50' : 'hover:bg-slate-50'}
                                            `}
                                            style={isSelected ? { borderColor: THEME_COLOR, borderWidth: '1px', borderStyle: 'solid' } : {}}
                                        >
                                            {isDateValid && (
                                                <>
                                                    <span 
                                                        className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-red-500 text-white' : 'text-slate-700'}`}
                                                    >
                                                        {day}
                                                    </span>
                                                    {hasEvent && (
                                                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* EVENT LIST */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col h-full">
                            <div className="border-b border-slate-100 pb-3 mb-3 shrink-0">
                                <h4 className="font-bold text-slate-700 text-sm">Events for Jan {selectedDate}, 2026</h4>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto space-y-3">
                                {CALENDAR_EVENTS[selectedDate] ? (
                                    CALENDAR_EVENTS[selectedDate].map((event: any) => (
                                        <div key={event.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 hover:border-indigo-200 transition-colors cursor-pointer group">
                                            <div className="flex items-start justify-between mb-1">
                                                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{event.type}</span>
                                                <span className="material-symbols-outlined text-[16px] text-slate-300 group-hover:text-indigo-400">arrow_forward</span>
                                            </div>
                                            <h5 className="font-bold text-slate-800 text-sm mb-1">{event.title}</h5>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                {event.time}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-32 text-slate-400 text-center">
                                        <span className="material-symbols-outlined text-[32px] mb-2 opacity-50">event_busy</span>
                                        <p className="text-xs">No events scheduled</p>
                                        <button className="text-xs text-indigo-600 font-bold mt-2 hover:underline">Add Event</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

             ) : activeCategory === 'calendar' ? (
                // CALENDAR VIEW (Simplified)
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center text-slate-400">
                        Calendar Placeholder
                    </div>
                </div>
             ) : activeCategory === 'safety' && activePage === 'inspections' ? (
                // --- INSPECTIONS VIEW ---
                <div className="space-y-4 h-full flex flex-col">
                    {/* ... (Inspections content from previous step) ... */}
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center text-slate-400">
                        Inspections Placeholder
                    </div>
                </div>
             ) : activeCategory === 'safety' && activePage === 'incidents' ? (
                // --- INCIDENTS VIEW (Existing) ---
                <div className="space-y-4">
                    {/* ... (Incidents content from previous step) ... */}
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 text-center text-slate-400">
                        Incidents Placeholder
                    </div>
                </div>
             ) : (
                // --- DEFAULT DASHBOARD ---
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {MENU_ITEMS.find(i => i.id === activeCategory)?.label || 'Dashboard'}
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Real-time operational overview</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-10 text-center text-slate-400">
                            Widget Area
                        </div>
                    </div>
                </div>
             )}

          </div>
        </main>

        {/* --- PANE 4: ACTION ITEMS SIDEBAR --- */}
        <aside className="w-72 bg-white border-l border-slate-200 flex-shrink-0 flex flex-col hidden 2xl:flex overflow-y-auto">
           <div className="p-5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Pending Actions</h3>
              <div className="bg-slate-800 rounded-xl p-5 text-white shadow-lg mb-5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[60px]">schedule</span>
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1">Timesheet Submission</p>
                 <p className="text-sm font-bold mb-4">Due in 14h 42m</p>
                 <button className="w-full py-2 hover:bg-opacity-90 rounded-lg text-[11px] font-bold transition-colors" style={{ backgroundColor: THEME_COLOR }}>Open Timesheet</button>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}

// --- NEW COMPONENTS FOR H&S COMMITTEE ---

function DocumentCard({ title, icon, iconColor, bgColor, reportBtnLabel, category, docs }: any) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`rounded-xl border border-slate-200 shadow-sm overflow-hidden ${bgColor}`}>
            {/* REDUCED PADDING: p-6 -> p-4 */}
            <div className="p-4">
                {/* HEADER: Reduced mb-6 -> mb-3 */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-white shadow-sm ${iconColor}`}>
                            <span className="material-symbols-outlined text-[28px]">{icon}</span>
                        </div>
                        <div>
                            {/* REMOVED DESCRIPTION BELOW TITLE */}
                            <h3 className="font-bold text-slate-800 text-lg">{title}</h3>
                        </div>
                    </div>
                    {/* COMPACT BUTTONS: px-3 py-1.5, gap-1, whitespace-nowrap */}
                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 bg-white rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap">
                            <span className="material-symbols-outlined text-[18px]">upload</span>
                            {reportBtnLabel}
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 border border-slate-300 bg-white rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-colors whitespace-nowrap">
                            <span className="material-symbols-outlined text-[18px]">add</span>
                            Create Category
                        </button>
                    </div>
                </div>

                {/* REDUCED SPACING: mb-3 */}
                <div className="relative mb-3">
                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
                    <input
                        type="text"
                        placeholder="Search Documents"
                        className="w-full h-10 bg-white border border-slate-200 rounded-lg pl-10 pr-4 text-sm text-slate-600 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full flex items-center justify-between p-3 bg-slate-50/50 border-b border-slate-100 hover:bg-slate-100 transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400">{isCollapsed ? 'chevron_right' : 'expand_more'}</span>
                            <span className={`w-2.5 h-2.5 rounded-full ${iconColor.replace('text-', 'bg-')}`}></span>
                            <span className="font-bold text-slate-700 text-sm">{category}</span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{docs.length} documents</span>
                    </button>
                    
                    {!isCollapsed && (
                        <div className="divide-y divide-slate-100">
                            {docs.map((doc: any) => (
                                <DocumentItem key={doc.id} doc={doc} iconColor={iconColor} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function DocumentItem({ doc, iconColor }: any) {
    return (
        // COMPACT ITEM: p-3 (was p-4)
        <div className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[24px] ${iconColor}`}>{doc.icon}</span>
                <div>
                    <h4 className="font-bold text-slate-700 text-sm">{doc.title}</h4>
                    <p className="text-xs text-slate-400">{doc.date} • {doc.size}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
                <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
                <button className="p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
            </div>
        </div>
    );
}

// --- INSPECTION STATS CARD ---
function StatsCard({ label, value, color, icon }: any) {
    const bgColors: any = {
        purple: 'bg-purple-50 text-purple-600',
        green: 'bg-emerald-50 text-emerald-600',
        blue: 'bg-blue-50 text-blue-600',
        red: 'bg-rose-50 text-rose-600'
    };

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${bgColors[color]}`}>
                    <span className="material-symbols-outlined text-[24px]">{icon}</span>
                </div>
                <p className="text-xs font-bold text-slate-500">{label}</p>
            </div>
            <span className={`text-2xl font-bold ${bgColors[color].split(' ')[1]}`}>{value}</span>
        </div>
    );
}

// --- SHARED COMPONENTS (Simplified for length) ---
function FilterButton({ label, active }: any) {
    return <button className={`px-4 py-1.5 rounded-md text-xs font-bold border transition-colors ${active ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>{label}</button>;
}
function IncidentCard({ date, type, typeColor, status, statusColor, title, desc }: any) {
    return <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"><h4 className="font-bold">{title}</h4><p className="text-xs">{desc}</p></div>;
}