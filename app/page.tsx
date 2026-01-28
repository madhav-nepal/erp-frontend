"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [apiStatus, setApiStatus] = useState("Checking...");
  const [activeLink, setActiveLink] = useState("Dashboard");

  // Connect to Python Backend
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status ? "Online" : "Error"))
      .catch(() => setApiStatus("Offline"));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 font-sans text-[13px]">
      
      {/* --- HEADER (h-[107px]) --- */}
      <header className="w-full h-[107px] flex items-center justify-between px-8 bg-white border-b border-slate-200 z-50 shrink-0">
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="bg-[#1173d4] rounded-xl p-2.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[28px]">domain</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold leading-tight uppercase tracking-wider text-slate-800">ORG PORTAL</h1>
            <p className="text-slate-400 text-[10px] font-medium tracking-tight">Enterprise ERP</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl px-12">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input 
              className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1173d4]/20 focus:border-[#1173d4] transition-all" 
              placeholder="Search operations, personnel, or assets..." 
              type="text"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
           {/* API Badge */}
           <div className={`mr-4 px-2 py-1 rounded text-[10px] font-bold border ${apiStatus === 'Online' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
              API: {apiStatus}
           </div>

          <IconButton icon="notifications" badge />
          <IconButton icon="light_mode" />
          <IconButton icon="settings" />
          
          <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-3 pl-1">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">Mike Smith</p>
              <p className="text-[10px] text-slate-500 font-medium leading-none">Ops Director</p>
            </div>
            <div className="size-10 rounded-full border border-[#1173d4] shadow-sm flex items-center justify-center bg-transparent text-[#1173d4]">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* --- SIDEBAR (w-64) --- */}
        <aside className="relative w-64 flex-shrink-0 flex flex-col justify-between border-r border-slate-200 bg-[#f8fafc]">
          <div className="flex flex-col overflow-y-auto">
            <nav className="flex flex-col">
              <SidebarItem icon="home" label="Dashboard" active={activeLink === "Dashboard"} onClick={() => setActiveLink("Dashboard")} />
              <SidebarItem icon="notifications" label="Advisory & Notices" />
              <SidebarItem icon="payments" label="Budget Planning" hasSubmenu />
              <SidebarItem icon="calendar_today" label="Events Calendar" />
              <SidebarItem icon="card_membership" label="Certification & Licenses" />
              <SidebarItem icon="folder" label="Document Center" />
              <SidebarItem icon="health_and_safety" label="Health & Safety" hasSubmenu />
              <SidebarItem icon="assignment" label="Tasks" />
              <SidebarItem icon="fact_check" label="Inspections" />
            </nav>
          </div>
          {/* Collapse Button */}
          <button className="absolute -right-3 top-1/2 -translate-y-1/2 size-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#1173d4] shadow-sm z-10 transition-transform active:scale-95">
             <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          </button>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-slate-50">
            <div className="mb-6">
              <h2 className="text-slate-900 text-2xl font-black tracking-tight">Overview</h2>
            </div>
            
            <div className="space-y-[15px]">
              
              {/* WIDGET 1: Incidents Table */}
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-red-500 text-[20px]">report_problem</span>
                    <h3 className="font-bold text-slate-800 text-[14px]">Incidents, Hazards & Near Misses</h3>
                  </div>
                  <button className="px-3.5 py-1.5 bg-red-500 text-white rounded text-[11px] font-bold hover:bg-red-600 transition-colors mb-0.5">Report</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Type</th>
                        <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Description</th>
                        <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Location</th>
                        <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Status</th>
                        <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Reported</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <IncidentRow type="Incident" desc="Minor spill in Loading Bay 4" loc="Sector West" status="In Review" color="amber" time="2h ago" />
                      <IncidentRow type="Hazard" desc="Exposed wiring detected" loc="Main Office Annex" status="Assigned" color="blue" time="5h ago" />
                      <IncidentRow type="Near Miss" desc="Forklift close call in Aisle 12" loc="Central Warehouse" status="Resolved" color="emerald" time="Oct 23, 14:00" />
                    </tbody>
                  </table>
                </div>
              </section>

              {/* WIDGET 2: Advisory List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                 <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-amber-500 text-[20px]">campaign</span>
                       <h3 className="font-bold text-slate-800 text-[14px]">Advisory & Notices</h3>
                    </div>
                    <button className="px-3.5 py-1.5 bg-amber-500 text-white rounded text-[11px] font-bold hover:bg-amber-600 transition-colors mb-0.5">View All</button>
                 </div>
                 <div className="divide-y divide-slate-100">
                    <AdvisoryItem icon="priority_high" iconColor="text-amber-500" badge="ALERT" title="System Maintenance Update" desc="Scheduled maintenance for all cloud services starting Oct 24, 02:00 UTC." />
                    <AdvisoryItem icon="info" iconColor="text-blue-500" badge="PROTOCOL" title="New Health & Safety Protocol" desc="Required reading for all operational staff regarding field visits." />
                    <AdvisoryItem icon="check_circle" iconColor="text-emerald-500" badge="POLICY" title="Q4 Budget Finalization" desc="Sector managers must submit final departmental requirements by Friday COB." />
                 </div>
              </div>

              {/* WIDGET 3: Tasks */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                 <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-indigo-500 text-[20px]">fact_check</span>
                       <h3 className="font-bold text-slate-800 text-[14px]">Assigned Tasks</h3>
                    </div>
                    <button className="px-3.5 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 rounded text-[11px] font-bold transition-colors mb-0.5">View All</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-50/50">
                          <tr>
                             <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Type</th>
                             <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Location</th>
                             <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide">Due date</th>
                             <th className="px-6 py-3 text-[11px] font-bold text-slate-500 tracking-wide text-right">Priority</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <TaskRow title="Site Safety Audit" loc="Western Facility" date="Oct 26, 2023" priority="High" pColor="red" />
                          <TaskRow title="Equipment Integrity Check" loc="Central Warehouse" date="Oct 28, 2023" priority="Medium" pColor="amber" />
                       </tbody>
                    </table>
                 </div>
              </div>

            </div>
          </div>

          {/* --- RIGHT ACTION PANE (w-72) --- */}
          <aside className="w-72 flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto hidden xl:block">
             <div className="p-5 space-y-6">
                
                {/* Quizzes */}
                <div>
                   <PaneHeader icon="help_center" title="Outstanding Quizzes" />
                   <div className="space-y-3">
                      <QuizCard title="Risk Mitigation 2.1" category="Compliance" time="2d left" timeColor="text-red-500" />
                      <QuizCard title="Privacy Refresh" category="Annual" time="8d left" timeColor="text-slate-400" />
                   </div>
                </div>

                <div className="w-full h-[0.5px] bg-[#1173d4]/20"></div>

                {/* Courses */}
                <div>
                   <PaneHeader icon="school" title="Outstanding Courses" />
                   <div className="space-y-4">
                      <CourseItem title="Cybersecurity 101" percent={65} color="bg-[#1173d4]" />
                      <CourseItem title="Ethics & Conduct" percent={12} color="bg-slate-300" />
                   </div>
                </div>

                <div className="w-full h-[0.5px] bg-[#1173d4]/20"></div>

                {/* Timesheet */}
                <div>
                   <PaneHeader icon="schedule" title="Timesheet" />
                   <div className="bg-slate-900 rounded-xl p-5 text-white shadow-lg shadow-slate-200">
                      <p className="text-[10px] font-bold text-white mb-1">Timesheet Submission</p>
                      <p className="text-sm font-bold mb-4">Due in 14h 42m</p>
                      <div className="grid grid-cols-2 gap-2 mb-4 text-center">
                         <div className="bg-white/10 rounded-md py-2">
                            <p className="text-lg font-black leading-none">14</p>
                            <p className="text-[7px] uppercase tracking-tighter mt-1 opacity-60">Hrs</p>
                         </div>
                         <div className="bg-white/10 rounded-md py-2">
                            <p className="text-lg font-black leading-none">42</p>
                            <p className="text-[7px] uppercase tracking-tighter mt-1 opacity-60">Min</p>
                         </div>
                      </div>
                      <button className="w-full py-2 bg-[#1173d4] hover:bg-[#1173d4]/90 rounded-lg text-[11px] font-bold transition-all">Open Timesheet</button>
                   </div>
                </div>

                <div className="w-full h-[0.5px] bg-[#1173d4]/20"></div>

                {/* Dates */}
                <div>
                   <p className="text-[14px] font-bold text-black tracking-wide mb-3">Important Dates</p>
                   <div className="space-y-3">
                      <DateItem month="NOV" day="10" label="Annual Audit" />
                      <DateItem month="NOV" day="15" label="Safety Drill" />
                      <DateItem month="AUG" day="10-13" label="Emergency Management" />
                   </div>
                </div>

             </div>
          </aside>
        </main>
      </div>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function IconButton({ icon, badge }: any) {
  return (
    <button className="relative size-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
      <span className="material-symbols-outlined text-[22px]">{icon}</span>
      {badge && <span className="absolute top-2.5 right-2.5 size-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
    </button>
  );
}

function SidebarItem({ icon, label, active, hasSubmenu, onClick }: any) {
  return (
    <a 
      href="#" 
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3.5 border-b border-[#1173d4]/20 transition-colors
        ${active ? 'bg-white text-[#1173d4] border-l-[3px] border-l-[#1173d4] shadow-sm' : 'text-slate-500 hover:text-[#1173d4] hover:bg-white'}
      `}
    >
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className={`font-medium ${active ? 'font-semibold' : ''}`}>{label}</span>
      {hasSubmenu && <span className="material-symbols-outlined text-[16px] ml-auto">chevron_right</span>}
    </a>
  );
}

function IncidentRow({ type, desc, loc, status, color, time }: any) {
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-5 whitespace-nowrap">
        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${color === 'amber' ? 'bg-amber-50 text-amber-600' : color === 'blue' ? 'bg-blue-50 text-blue-600' : color === 'emerald' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>{type}</span>
      </td>
      <td className="px-6 py-5"><p className="text-[12px] font-semibold text-slate-800">{desc}</p></td>
      <td className="px-6 py-5 text-[12px] text-slate-600">{loc}</td>
      <td className="px-6 py-5 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <span className={`size-1.5 rounded-full ${color === 'amber' ? 'bg-amber-500' : color === 'blue' ? 'bg-blue-500' : 'bg-emerald-500'}`}></span>
          <span className={`text-[12px] font-medium ${color === 'amber' ? 'text-amber-600' : color === 'blue' ? 'text-blue-600' : 'text-emerald-600'}`}>{status}</span>
        </div>
      </td>
      <td className="px-6 py-5 text-[12px] text-slate-500 whitespace-nowrap">{time}</td>
    </tr>
  );
}

function AdvisoryItem({ icon, iconColor, badge, title, desc }: any) {
   return (
      <div className="px-6 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 min-w-[100px]">
               <span className={`material-symbols-outlined text-[20px] ${iconColor}`}>{icon}</span>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${iconColor}`}>{badge}</span>
            </div>
            <div className="flex flex-col">
               <p className="text-[13px] font-bold text-slate-800 leading-tight">{title}</p>
               <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">HIGH</span>
            <span className="material-symbols-outlined text-slate-300 text-[16px]">chevron_right</span>
         </div>
      </div>
   );
}

function TaskRow({ title, loc, date, priority, pColor }: any) {
   return (
      <tr className="hover:bg-slate-50 transition-colors">
         <td className="px-6 py-4 text-[12px] font-semibold text-slate-800">{title}</td>
         <td className="px-6 py-4 text-[12px] text-slate-600">{loc}</td>
         <td className="px-6 py-4 text-[12px] text-slate-500">{date}</td>
         <td className="px-6 py-4 text-right">
            <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${pColor === 'red' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>{priority}</span>
         </td>
      </tr>
   );
}

function PaneHeader({ icon, title }: any) {
   return (
      <div className="flex items-center gap-2 mb-3">
         <span className="material-symbols-outlined text-[18px] text-slate-400">{icon}</span>
         <span className="text-[14px] font-bold text-black tracking-wide">{title}</span>
      </div>
   );
}

function QuizCard({ title, category, time, timeColor }: any) {
   return (
      <div className="p-3 border border-slate-100 rounded-lg hover:border-[#1173d4]/30 transition-colors group cursor-pointer">
         <p className="text-[12px] font-bold text-slate-800 mb-1 group-hover:text-[#1173d4]">{title}</p>
         <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-500">{category}</span>
            <span className={`text-[10px] font-bold ${timeColor}`}>{time}</span>
         </div>
      </div>
   );
}

function CourseItem({ title, percent, color }: any) {
   return (
      <div>
         <div className="flex justify-between items-center mb-1.5">
            <p className="text-[11px] font-semibold text-slate-700 truncate">{title}</p>
            <span className="text-[10px] font-bold text-slate-400">{percent}%</span>
         </div>
         <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
         </div>
      </div>
   );
}

function DateItem({ month, day, label }: any) {
   return (
      <div className="flex items-center gap-3">
         <div className="bg-[#1173d4] rounded p-1 text-center min-w-[36px]">
            <p className="text-[8px] font-bold text-white uppercase">{month}</p>
            <p className="text-[12px] font-black text-white">{day}</p>
         </div>
         <p className="text-[12px] font-medium text-black leading-tight">{label}</p>
      </div>
   );
}