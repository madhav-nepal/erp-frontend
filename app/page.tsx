"use client";
import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiStatus, setApiStatus] = useState("Checking connection...");

  // This connects to your Python Backend!
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/`)
      .then(res => res.json())
      .then(data => setApiStatus(data.status || "Connected"))
      .catch(err => setApiStatus("Backend Offline"));
  }, []);

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-[#f8fafc] text-slate-900 font-sans text-[13px]">
      {/* HEADER */}
      <header className="w-full h-14 flex items-center justify-between px-4 bg-white border-b border-slate-200 z-50 shrink-0">
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="bg-[#1173d4] rounded-lg p-1.5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[20px]">grid_view</span>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-bold leading-tight uppercase tracking-wider text-slate-800">ORG PORTAL</h1>
            <p className="text-slate-400 text-[9px] font-medium tracking-tight">Enterprise ERP</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {/* API STATUS INDICATOR */}
           <div className={`px-2 py-1 rounded text-[10px] font-bold ${apiStatus.includes("Offline") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
              API: {apiStatus}
           </div>
           <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-100 shadow-sm flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">person</span>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className={`relative w-64 flex-shrink-0 flex flex-col border-r border-slate-200 bg-[#f8fafc] ${sidebarOpen ? '' : 'hidden'}`}>
          <div className="flex flex-col overflow-y-auto py-2">
            <nav className="flex flex-col space-y-1">
              <SidebarItem icon="home" label="Dashboard" active />
              <SidebarItem icon="notifications" label="Advisory & Notices" />
              <SidebarItem icon="payments" label="Budget Planning" />
              <SidebarItem icon="assignment" label="Tasks" />
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
            <div className="mb-6">
              <h2 className="text-slate-900 text-xl font-black tracking-tight">Overview</h2>
            </div>
            
            <div className="space-y-6">
              <section className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-[14px]">Incidents & Hazards</h3>
                  </div>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-[11px] font-bold hover:bg-red-600 transition-colors">Report</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                      <tr>
                        <th className="px-5 py-2.5 text-[11px] font-bold text-slate-500 tracking-wide">Type</th>
                        <th className="px-5 py-2.5 text-[11px] font-bold text-slate-500 tracking-wide">Description</th>
                        <th className="px-5 py-2.5 text-[11px] font-bold text-slate-500 tracking-wide">Location</th>
                        <th className="px-5 py-2.5 text-[11px] font-bold text-slate-500 tracking-wide">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <TableRow type="Incident" desc="Minor spill in Loading Bay 4" loc="Sector West" status="In Review" color="red" />
                      <TableRow type="Hazard" desc="Exposed wiring detected" loc="Main Office Annex" status="Assigned" color="amber" />
                      <TableRow type="Near Miss" desc="Forklift close call" loc="Central Warehouse" status="Resolved" color="blue" />
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Helper Components
function SidebarItem({ icon, label, active = false }: { icon: string, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-5 py-3 transition-colors ${active ? 'bg-white text-[#1173d4] border-l-[3px] border-[#1173d4] shadow-sm' : 'text-slate-500 hover:text-[#1173d4] hover:bg-white'}`}>
      <span className="material-symbols-outlined text-[20px]">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}

function TableRow({ type, desc, loc, status, color }: any) {
  const colors: any = { red: 'bg-red-50 text-red-600', amber: 'bg-amber-50 text-amber-600', blue: 'bg-blue-50 text-blue-600' };
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-4 whitespace-nowrap">
        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${colors[color]}`}>{type}</span>
      </td>
      <td className="px-5 py-4"><p className="text-[12px] font-semibold text-slate-800">{desc}</p></td>
      <td className="px-5 py-4 text-[12px] text-slate-600">{loc}</td>
      <td className="px-5 py-4 whitespace-nowrap"><span className="text-[12px] font-medium">{status}</span></td>
    </tr>
  );
}