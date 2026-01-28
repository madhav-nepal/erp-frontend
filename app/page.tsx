"use client";
import React, { useState, useEffect } from 'react';

// --- CONFIGURATION ---
// This defines which icons open which sub-menus
const SUB_MENUS: Record<string, { label: string; icon: string }[]> = {
  Benefits: [ // Matches your HTML example
    { label: "Overview", icon: "grid_view" },
    { label: "Health & Wellness", icon: "favorite" },
    { label: "Safety Boots", icon: "foot_bones" },
    { label: "Safety Rewards", icon: "stars" },
    { label: "Tools Allowance", icon: "handyman" },
  ],
  Safety: [
    { label: "Overview", icon: "dashboard" },
    { label: "Incidents", icon: "warning" },
    { label: "Inspections", icon: "checklist" },
    { label: "Training", icon: "model_training" },
  ],
  Events: [
    { label: "Calendar", icon: "calendar_month" },
    { label: "Upcoming", icon: "event_upcoming" },
  ]
};

export default function Dashboard() {
  // State to track which Primary Nav item is active
  const [activeModule, setActiveModule] = useState<string | null>(null); // e.g. 'Benefits'
  const [apiStatus, setApiStatus] = useState("Checking...");

  // Toggle Logic: If you click the same one, it closes. If new, it opens.
  const toggleModule = (moduleName: string) => {
    if (activeModule === moduleName) {
      setActiveModule(null); // Close it
    } else {
      setActiveModule(moduleName); // Open new one
    }
  };

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status ? "Online" : "Error"))
      .catch(() => setApiStatus("Offline"));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 font-sans text-[13px]">
      
      {/* --- HEADER (Matches your HTML h-[88px]) --- */}
      <header className="w-full h-[88px] flex items-center justify-between px-6 bg-white border-b border-slate-200 z-50 shrink-0">
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="bg-[#1173d4] rounded-lg p-2 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[24px]">domain</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold leading-tight uppercase tracking-wider text-slate-800">ORG PORTAL</h1>
            <p className="text-slate-400 text-[10px] font-medium tracking-tight">Enterprise ERP</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl px-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </div>
            <input 
              className="block w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#1173d4]/20 focus:border-[#1173d4] transition-all" 
              placeholder="Search data points..." 
              type="text"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1">
          <HeaderIcon icon="notifications" badge />
          <HeaderIcon icon="light_mode" />
          <HeaderIcon icon="settings" />
          
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-2 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 leading-none">Mike Smith</p>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Corp Director</p>
            </div>
            <div className="size-9 rounded-full border border-[#1173d4]/20 shadow-sm flex items-center justify-center bg-slate-50 overflow-hidden text-[#1173d4]">
               <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- COL 1: PRIMARY RAIL (Matches your HTML w-14) --- */}
        <aside className="relative w-14 flex-shrink-0 flex flex-col border-r border-slate-200 bg-[#f8fafc] z-40">
          <nav className="flex flex-col flex-1">
             {/* Simple Link (No Submenu) */}
            <PrimaryLink 
               icon="home" 
               label="Dashboard" 
               active={activeModule === null} 
               onClick={() => setActiveModule(null)} 
            />
            
            {/* Modules with Submenus */}
            <PrimaryLink 
               icon="mail" 
               label="Notices" 
            />
            <PrimaryLink 
               icon="calendar_today" 
               label="Events" 
               active={activeModule === 'Events'}
               onClick={() => toggleModule('Events')}
            />
            <PrimaryLink 
               icon="redeem" 
               label="Benefits" 
               active={activeModule === 'Benefits'}
               onClick={() => toggleModule('Benefits')}
            />
            <PrimaryLink 
               icon="folder" 
               label="Documents" 
            />
            <PrimaryLink 
               icon="health_and_safety" 
               label="Safety" 
               active={activeModule === 'Safety'}
               onClick={() => toggleModule('Safety')}
            />
          </nav>
        </aside>

        {/* --- COL 2: SECONDARY NAV (Matches your HTML w-60) --- */}
        {/* Conditionally rendered based on state */}
        {activeModule && SUB_MENUS[activeModule] && (
           <aside className="relative w-60 flex-shrink-0 flex flex-col bg-white border-r border-slate-200 z-30 animation-slide-in">
              <div className="pt-4">
                 <h2 className="text-[12px] font-bold text-slate-800 tracking-tight mb-4 px-6">{activeModule}</h2>
                 <nav className="flex flex-col">
                    {SUB_MENUS[activeModule].map((item, idx) => (
                       <SecondaryLink key={idx} icon={item.icon} label={item.label} active={idx === 0} />
                    ))}
                 </nav>
              </div>
           </aside>
        )}

        {/* --- COL 3: MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          <div className="flex-1 overflow-y-auto px-6 py-6">
             
             {/* Dynamic Title based on selection */}
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 text-2xl font-bold tracking-tight">
                   {activeModule ? `${activeModule} Overview` : 'Executive Dashboard'}
                </h2>
                <div className="flex gap-2">
                   <span className={`px-2 py-1 text-[10px] font-bold rounded border ${apiStatus === 'Online' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                      API: {apiStatus}
                   </span>
                </div>
             </div>

             {/* DASHBOARD CONTENT */}
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pb-4">
                
                {/* Sample Widget 1 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between h-full">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-800 text-[12px]">Total Employees</h3>
                      <span className="material-symbols-outlined text-slate-400 text-[18px]">groups</span>
                   </div>
                   <div className="flex flex-col items-center py-6">
                      <div className="text-3xl font-black text-[#1173d4]">1,284</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Staff</div>
                   </div>
                </div>

                {/* Sample Widget 2 */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col">
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-800 text-[12px]">Recent Incidents</h3>
                      <span className="material-symbols-outlined text-rose-500 text-[18px]">warning</span>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                         <span className="text-xs font-medium text-slate-700">Spill in Bay 4</span>
                         <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">REVIEW</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100">
                         <span className="text-xs font-medium text-slate-700">Wiring Issue</span>
                         <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">ASSIGNED</span>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </main>

        {/* --- COL 4: RIGHT ACTION PANE (Matches your HTML style) --- */}
        <aside className="w-64 flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto hidden xl:block">
           <div className="p-4 space-y-6">
              <div>
                 <h3 className="text-[13px] font-bold text-slate-900 tracking-wide mb-2">Action Pane</h3>
                 <hr className="border-slate-100 mb-4"/>
                 <div className="space-y-4">
                    <h4 className="text-[13px] font-bold text-slate-900 mb-4">Important Dates</h4>
                    <DateBadge month="NOV" day="10" label="Annual Audit" />
                    <DateBadge month="NOV" day="15" label="Safety Drill" />
                 </div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                 <h3 className="text-[13px] font-bold text-slate-900 tracking-wide mb-3">Quick Links</h3>
                 <div className="flex flex-col gap-1">
                    <QuickLink label="Policy PDF" />
                    <QuickLink label="Vendor Portal" />
                    <QuickLink label="Reimbursement Form" />
                 </div>
              </div>
           </div>
        </aside>

      </div>
    </div>
  );
}

// --- HELPER COMPONENTS (Using your styles) ---

function PrimaryLink({ icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center justify-center h-14 w-full transition-colors border-b border-slate-100 relative group
        ${active ? 'bg-white text-[#1173d4]' : 'text-slate-500 hover:text-[#1173d4] hover:bg-slate-50'}
      `}
      title={label}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {active && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg