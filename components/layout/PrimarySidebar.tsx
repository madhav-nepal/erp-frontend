"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { THEME_COLOR, Icon } from '../Shared';

export default function PrimarySidebar({ menuItems, isCollapsed, setIsCollapsed }: any) {
    const pathname = usePathname();

    // Helper to check if a category is active based on current URL
    const isActiveCategory = (item: any) => {
        if (item.path === pathname) return true;
        // If the current URL starts with one of the submenu paths (e.g., /safety/incidents starts with /safety)
        if (item.sub) return item.sub.some((sub: any) => pathname.startsWith(sub.path));
        return false;
    };

    return (
        <aside className={`bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 ease-in-out relative ${isCollapsed ? 'w-[72px]' : 'w-[260px]'}`}>
           <nav className="flex-1 overflow-y-auto">
              {menuItems.map((item: any) => {
                 const active = isActiveCategory(item);
                 // If item has a path (like Dashboard), go there. If it has subs, go to the first sub's path.
                 const href = item.path || (item.sub ? item.sub[0].path : '#');

                 return (
                    <Link
                       key={item.id}
                       href={href}
                       style={{ 
                           borderLeft: active ? `4px solid ${THEME_COLOR}` : '4px solid transparent',
                           borderBottom: active ? `1px solid ${THEME_COLOR}` : '1px solid #f1f5f9',
                           color: active ? THEME_COLOR : '#64748b',
                           backgroundColor: active ? `${THEME_COLOR}15` : 'transparent'
                       }}
                       className={`w-full flex items-center h-12 transition-all group relative ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'} hover:bg-slate-50`}
                       title={isCollapsed ? item.label : ''}
                    >
                       <div className="flex items-center gap-3">
                          <Icon name={item.icon} size={22} className={`shrink-0 ${active ? '' : 'group-hover:text-slate-600'}`} />
                          {!isCollapsed && <span className={`text-[15px] font-medium whitespace-nowrap ${active ? 'font-bold' : ''}`}>{item.label}</span>}
                       </div>
                       {!isCollapsed && item.sub && <Icon name="chevron_right" size={16} style={{ color: active ? THEME_COLOR : '#cbd5e1' }} />}
                    </Link>
                 );
              })}
           </nav>
           <div className={`h-10 border-t border-slate-200 flex items-center bg-slate-50 shrink-0 ${isCollapsed ? 'justify-center' : 'justify-end pr-4'}`}>
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center">
                    <Icon name={isCollapsed ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'} />
                </button>
           </div>
        </aside>
    );
}