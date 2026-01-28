"use client";
import React, { useState, useEffect } from 'react';

// --- CONFIGURATION: Define your sub-menus here ---
const SUB_MENUS: Record<string, { label: string; icon: string }[]> = {
  Benefits: [
    { label: "Overview", icon: "grid_view" },
    { label: "Health & Wellness", icon: "favorite" },
    { label: "Safety Boots", icon: "foot_bones" },
    { label: "Safety Rewards", icon: "stars" },
    { label: "Tools Allowance", icon: "handyman" },
  ],
  Safety: [
    { label: "Dashboard", icon: "dashboard" },
    { label: "Incidents", icon: "warning" },
    { label: "Inspections", icon: "checklist" },
    { label: "Training", icon: "model_training" },
  ],
  Events: [
    { label: "Calendar", icon: "calendar_month" },
    { label: "Upcoming", icon: "event_upcoming" },
  ],
  Budget: [
    { label: "Planning", icon: "account_balance" },
    { label: "Expenses", icon: "receipt_long" },
  ]
};

export default function Dashboard() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState("Checking...");

  // Toggle Logic: Click once to open, click again to close
  const toggleModule = (moduleName: string) => {
    if (activeModule === moduleName) {
      setActiveModule(null);
    } else {
      setActiveModule(moduleName);
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
      
      {/* --- HEADER --- */}
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
              placeholder="Search operations, personnel, or assets..." 
              type="text"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
           <div className={`mr-4 px-2 py-1 rounded text-[10px] font-bold border ${apiStatus === 'Online' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
              API: {apiStatus}
           </div>
          <IconButton icon="notifications" badge />
          <IconButton icon="settings" />
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          <div className="flex items-center gap-2 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Mike Smith</p>
              <p className="text-[10px] text-slate-500 font-medium">Corp Director</p>
            </div>
            <div className="size-9 rounded-full border border-[#1173d4]/20 shadow-sm flex items-center justify-center bg-slate-50 text-[#1173d4]">
               <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        
        {/* --- COL 1: PRIMARY RAIL (Icons Only) --- */}
        <aside className="relative w-[72px] flex-shrink-0 flex flex-col border-r border-slate-200 bg-white z-40 items-center py-4 gap-2">
            <PrimaryIcon icon="home" label="Dashboard" active={activeModule === null} onClick={() => setActiveModule(null)} />
            <div className="w-8 h-[1px] bg-slate-100 my-1"></div>
            <PrimaryIcon icon="redeem" label="Benefits" active={activeModule === 'Benefits'} onClick={() => toggleModule('Benefits')} />
            <PrimaryIcon icon="health_and_safety" label="Safety" active={activeModule === 'Safety'} onClick={() => toggleModule('Safety')} />
            <PrimaryIcon icon="calendar_today" label="Events" active={activeModule === 'Events'} onClick={() => toggleModule('Events')} />
            <PrimaryIcon icon="payments" label="Budget" active={activeModule === 'Budget'} onClick={() => toggleModule('Budget')} />
            <PrimaryIcon icon="folder" label="Docs" active={activeModule === 'Docs'} onClick={() => toggleModule('Docs')} />
        </aside>

        {/* --- COL 2: SECONDARY NAV (Slide-out) --- */}
        {activeModule && SUB_MENUS[activeModule] && (
           <aside className="w-60 bg-[#f8fafc] border-r border-slate-200 flex flex-col z-30 animate-in slide-in-from-left-2 duration-200">
              <div className="p-5 border-b border-slate-100">
                 <h2 className="font-bold text-slate-800 text-sm tracking-tight">{activeModule}</h2>
                 <p className="text-[10px] text-slate-400 font-medium mt-0.5">Module Navigation</p>
              </div>
              <nav className="p-3 space-y-1 overflow-y-auto flex-1">
                 {SUB_MENUS[activeModule].map((item, idx) => (
                    <SecondaryLink key={idx} icon={item.icon} label={item.label} active={idx === 0} />
                 ))}
              </nav>
           </aside>
        )}

        {/* --- COL 3: MAIN CONTENT --- */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50 relative">
          <div className="flex-1 overflow-y-auto px-8 py-8">
             
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h2 className="text-slate-900 text-2xl font-bold tracking-tight">
                      {activeModule ? `${activeModule} Overview` : 'Executive Dashboard'}
                   </h2>
                   <p className="text-slate-500 text-sm mt-1">Real-time operational data</p>
                </div>
                <button className="bg-[#1173d4] hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-colors flex items-center gap-2">
                   <span className="material-symbols-outlined text-[16px]">add</span>
                   Quick Action
                </button>
             </div>

             {/* WIDGETS GRID */}
             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-4">
                
                {/* Incidents Widget */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                      <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-rose-500 text-[20px]">warning</span>
                         <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Priority Incidents</h3>
                      </div>
                   </div>
                   <div className="divide-y divide-slate-50">
                      <IncidentRow type="INCIDENT" desc="Minor spill in Loading Bay 4" time="2h ago" color="red" />
                      <IncidentRow type="HAZARD" desc="Exposed wiring detected" time="5h ago" color="amber" />
                   </div>
                </div>

                {/* Advisory Widget */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                      <div className="flex items-center gap-2">
                         <span className="material-symbols-outlined text-[#1173d4] text-[20px]">campaign</span>
                         <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Advisory & Notices</h3>
                      </div>
                   </div>
                   <div className="p-0">
                      <AdvisoryRow title="System Maintenance" desc="Scheduled for Oct 24, 02:00 UTC" />
                      <AdvisoryRow title="New Safety Protocol" desc="Required reading for field staff" />
                   </div>
                </div>

             </div>
          </div>
        </main>

        {/* --- COL 4: ACTION PANE (Always Visible on Large Screens) --- */}
        <aside className="w-72 bg-white border-l border-slate-200 flex-shrink-0 flex flex-col hidden 2xl:flex">
           <div className="p-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Action Items</h3>
              
              {/* Timesheet */}
              <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg mb-8 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-[60px]">schedule</span>
                 </div>
                 <p className="text-[10px] font-bold text-slate-400 mb-1">Timesheet Submission</p>
                 <p className="text-sm font-bold mb-4">Due in 14h 42m</p>
                 <button className="w-full py-2 bg-[#1173d4] hover:bg-blue-600 rounded-lg text-[11px] font-bold transition-colors">Open Timesheet</button>
              </div>

              {/* Tasks */}
              <div className="space-y-4">
                 <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-slate-400 text-[18px]">check_circle</span>
                    <h4 className="font-bold text-slate-700 text-sm">Your Tasks</h4>
                 </div>
                 <TaskItem label="Approve Budget Q3" date="Today" />
                 <TaskItem label="Review Safety Logs" date="Tomorrow" />
              </div>

           </div>
        </aside>

      </div>
    </div>
  );
}

// --- COMPONENT HELPERS ---

function IconButton({ icon, badge }: any) {
  return (
    <button className="relative size-9 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      {badge && <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white"></span>}
    </button>
  );
}

function PrimaryIcon({ icon, label, active, onClick }: any) {
   return (
      <button 
         onClick={onClick}
         className={`size-12 rounded-xl flex items-center justify-center transition-all duration-200 group relative
            ${active ? 'bg-[#1173d4] text-white shadow-md shadow-blue-200' : 'text-slate-400 hover:bg-slate-50 hover:text-[#1173d4]'}
         `}
         title={label}
      >
         <span className="material-symbols-outlined text-[24px]">{icon}</span>
         {/* Tooltip */}
         <span className="absolute left-14 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            {label}
         </span>
      </button>
   );
}

function SecondaryLink({ icon, label, active }: any) {
   return (
      <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group
         ${active ? 'bg-white text-[#1173d4] shadow-sm font-semibold' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'}
      `}>
         <span className={`material-symbols-outlined text-[18px] ${active ? 'text-[#1173d4]' : 'text-slate-400 group-hover:text-slate-600'}`}>{icon}</span>
         <span className="text-[12px]">{label}</span>
      </a>
   );
}

function IncidentRow({ type, desc, time, color }: any) {
   const colors: any = { red: 'bg-red-50 text-red-600', amber: 'bg-amber-50 text-amber-600' };
   return (
      <div className="px-6 py-4 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer group">
         <div className="flex items-center gap-3">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${colors[color]}`}>{type}</span>
            <span className="text-xs font-medium text-slate-700 group-hover:text-[#1173d4] transition-colors">{desc}</span>
         </div>
         <span className="text-[10px] text-slate-400 font-medium">{time}</span>
      </div>
   );
}

function AdvisoryRow({ title, desc }: any) {
   return (
      <div className="px-6 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors cursor-pointer group">
         <h4 className="text-xs font-bold text-slate-700 group-hover:text-[#1173d4]">{title}</h4>
         <p className="text-[10px] text-slate-500 mt-0.5">{desc}</p>
      </div>
   );
}

function TaskItem({ label, date }: any) {
   return (
      <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50 hover:border-blue-200 transition-colors cursor-pointer">
         <span className="text-xs font-medium text-slate-600">{label}</span>
         <span className="text-[10px] font-bold text-slate-400">{date}</span>
      </div>
   );
}