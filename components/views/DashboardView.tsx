"use client";
import React, { useState, useEffect } from 'react';
// 1. Use Enterprise Aliases (@) for imports
import { SolidButton, THEME_COLOR, IncidentRow, AdvisoryRow, TaskRow, ListSkeleton, Icon } from '@/components/Shared';
import { getDashboardTasks, getDashboardNews } from '@/services/dashboardService';
// 2. Import Types for strict state management
import { Task, NewsItem } from '@/types';

export default function DashboardView() {
    // 3. Strictly type the state (No more 'any')
    const [tasks, setTasks] = useState<Task[]>([]);
    const [news, setNews] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // We know these return the correct types now
                const fetchedTasks = await getDashboardTasks();
                const fetchedNews = await getDashboardNews();
                setTasks(fetchedTasks || []);
                setNews(fetchedNews || []);
            } catch (e) {
                console.error("Failed to load dashboard data", e);
            }
            setIsLoading(false);
        };
        loadData();
    }, []);

    const renderContent = (data: any[], Component: any) => {
        if (isLoading) {
            return <><ListSkeleton /><ListSkeleton /></>;
        }
        return data.map((item: any) => <Component key={item.id} {...item} />);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Dashboard</h2>
                   <p className="text-slate-500 text-sm mt-1">Real-time operational overview</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {/* 1. PRIORITY INCIDENTS */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
                      <div className="flex items-center gap-2">
                         <Icon name="warning" size={20} className="text-rose-500" />
                         <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Priority Incidents</h3>
                      </div>
                      <SolidButton label="Report New" icon="add" color="red" />
                   </div>
                   <div className="divide-y divide-slate-50">
                      {/* Note: In a real app, these would also come from an API */}
                      <IncidentRow type="INCIDENT" desc="Minor spill in Loading Bay 4" loc="Sector West" time="2h ago" color="red" status="In Review" />
                      <IncidentRow type="HAZARD" desc="Exposed wiring detected" loc="Main Office Annex" time="5h ago" color="amber" status="Assigned" />
                   </div>
                </div>

                {/* 2. NEWS & NOTICES */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
                      <div className="flex items-center gap-2">
                         <Icon name="campaign" size={20} style={{ color: THEME_COLOR }} />
                         <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">News & Notices</h3>
                      </div>
                      <SolidButton label="View All" icon="arrow_forward" color="theme" />
                   </div>
                   <div className="divide-y divide-slate-50">
                      {/* AdvisoryRow expects 'desc' and 'priority' which match our NewsItem type */}
                      {renderContent(news, (item: NewsItem) => (
                          <AdvisoryRow title={item.title} desc={item.desc} priority={item.priority} />
                      ))}
                   </div>
                </div>

                 {/* 3. ASSIGNED TASKS */}
                 <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                   <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
                      <div className="flex items-center gap-2">
                         <Icon name="assignment_turned_in" size={20} className="text-indigo-500" />
                         <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Assigned Tasks</h3>
                      </div>
                      <SolidButton label="View All" icon="arrow_forward" color="indigo" />
                   </div>
                   <div className="divide-y divide-slate-50">
                      {/* FIX: Changed 'loc' to 'location' to match the Task type! */}
                      {renderContent(tasks, (item: Task) => (
                          <TaskRow title={item.title} location={item.location} date={item.date} priority={item.priority} />
                      ))}
                   </div>
                </div>
            </div>
        </div>
    );
}