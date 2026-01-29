"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import PrimarySidebar from './PrimarySidebar';
import SecondarySidebar from './SecondarySidebar';
import ActionSidebar from './ActionSidebar';
import { THEME_COLOR, Icon } from '../Shared';
import { MENU_ITEMS } from '../../lib/mockData';

export default function Shell({ children }: { children: React.ReactNode }) {
    const [isPrimaryCollapsed, setIsPrimaryCollapsed] = useState(false);
    const [isSecondaryCollapsed, setIsSecondaryCollapsed] = useState(false);
    
    // Determine current section based on URL
    const pathname = usePathname();
    
    // Find which Main Menu Item is active based on the URL
    const activeMenuItem = MENU_ITEMS.find(item => {
        if (item.path === pathname) return true;
        if (item.sub) return item.sub.some(sub => pathname.startsWith(sub.path));
        return false;
    });

    const activeSubMenu = activeMenuItem?.sub;
    const activeSubPage = activeSubMenu?.find(sub => pathname === sub.path);

    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-50 font-sans text-[13px]" style={{ color: THEME_COLOR }}>
            <Header />
            <div className="flex flex-1 overflow-hidden relative">
                <PrimarySidebar 
                    menuItems={MENU_ITEMS} 
                    isCollapsed={isPrimaryCollapsed}
                    setIsCollapsed={setIsPrimaryCollapsed}
                />
                
                {activeSubMenu && (
                   <SecondarySidebar 
                        activeCategoryLabel={activeMenuItem?.label}
                        subMenuItems={activeSubMenu}
                        isCollapsed={isSecondaryCollapsed}
                        setIsCollapsed={setIsSecondaryCollapsed}
                   />
                )}

                <main className="flex-1 flex flex-col overflow-hidden bg-slate-50/50 relative">
                     {/* BREADCRUMB BAR */}
                    <div className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-5 shrink-0">
                        <div className="flex items-center gap-2 text-slate-500 text-xs">
                            <span className="font-semibold text-slate-800">{activeMenuItem?.label || 'Dashboard'}</span>
                            {activeSubPage && (
                            <>
                                <Icon name="chevron_right" size={10} />
                                <span className="font-bold" style={{ color: THEME_COLOR }}>{activeSubPage.label}</span>
                            </>
                            )}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded border border-green-200 bg-green-50 text-green-700">API: Online</span>
                    </div>

                    {/* DYNAMIC PAGE CONTENT */}
                    <div className="flex-1 overflow-y-auto p-3">
                        {children}
                    </div>
                </main>

                <ActionSidebar />
            </div>
        </div>
    );
}