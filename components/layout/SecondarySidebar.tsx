"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { THEME_COLOR, Icon } from '../Shared';

export default function SecondarySidebar({ activeCategoryLabel, subMenuItems, isCollapsed, setIsCollapsed }: any) {
    const pathname = usePathname();

    return (
       <aside className={`bg-white border-r border-slate-200 flex flex-col z-30 transition-all duration-300 ease-in-out overflow-hidden ${isCollapsed ? 'w-[72px]' : 'w-[240px]'}`}>
          <div className={`h-12 flex items-center border-b border-slate-100 shrink-0 bg-slate-50/50 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
             {!isCollapsed && <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest truncate">{activeCategoryLabel}</h2>}
             {isCollapsed && <Icon name="more_horiz" size={20} className="text-slate-400" />}
          </div>
          <nav className="p-0 flex-1 overflow-y-auto">
             {subMenuItems.map((subItem: any) => {
                const isActive = pathname === subItem.path;
                return (
                   <Link
                      key={subItem.id}
                      href={subItem.path}
                      style={{ 
                         borderLeft: isActive ? `4px solid ${THEME_COLOR}` : '4px solid transparent',
                         borderBottom: isActive ? `1px solid ${THEME_COLOR}` : '1px solid #f1f5f9',
                         color: isActive ? THEME_COLOR : '#64748b',
                         backgroundColor: isActive ? `${THEME_COLOR}15` : 'transparent'
                      }}
                      className={`w-full flex items-center transition-all h-12 hover:bg-slate-50 ${isCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-6'}`}
                      title={isCollapsed ? subItem.label : ''}
                   >
                      {subItem.icon && <Icon name={subItem.icon} size={18} className={`shrink-0 ${isActive ? '' : 'opacity-70'}`} />}
                      {!isCollapsed && <span className={`text-[14px] whitespace-nowrap ${isActive ? 'font-bold' : ''}`}>{subItem.label}</span>}
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