import { CalendarEvent, CommitteeDocs, MenuItem, Task, NewsItem, SafetyChampion } from '../types';

// 1. CALENDAR EVENTS
export const CALENDAR_EVENTS: Record<number, CalendarEvent[]> = {
    24: [{ id: 1, title: 'System Maintenance', time: '02:00 AM - 06:00 AM', type: 'maintenance' }],
    26: [{ id: 2, title: 'Safety Audit', time: '10:00 AM - 11:30 AM', type: 'audit' }],
    27: [{ id: 3, title: 'Quarterly Budget Review', time: '02:00 PM - 04:00 PM', type: 'meeting' }]
};

// 2. COMMITTEE DOCUMENTS
export const COMMITTEE_DOCS: CommitteeDocs = {
    incidents: [
        { id: 1, title: 'Slip and Fall - Warehouse Area.pdf', date: '2025-01-15', size: '2.4 MB', icon: 'picture_as_pdf' },
        { id: 2, title: 'Equipment Malfunction - Production Line.pdf', date: '2025-01-18', size: '1.8 MB', icon: 'picture_as_pdf' },
    ],
    nearMisses: [
        { id: 4, title: 'Forklift Near Collision - Loading Dock.pdf', date: '2025-01-16', size: '1.5 MB', icon: 'picture_as_pdf' },
        { id: 5, title: 'Overhead Crane Close Call.pdf', date: '2025-01-20', size: '2.2 MB', icon: 'picture_as_pdf' },
    ]
};

// 3. MENU ITEMS
export const MENU_ITEMS: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/' }, 
  { 
    id: 'safety', label: 'Health & Safety', icon: 'health_and_safety',
    sub: [
      { id: 'incidents', label: 'Incidents & Hazards', icon: 'warning', path: '/safety/incidents' },
      // --- NEW ITEMS ADDED HERE ---
      { id: 'pre-task', label: 'Pre-Task Checks', icon: 'playlist_add_check', path: '/safety/pre-task' },
      { id: 'pre-drive', label: 'Pre-Drive Inspection', icon: 'commute', path: '/safety/pre-drive' },
      { id: 'hazard-assessment', label: 'Hazard Assessment', icon: 'assignment_late', path: '/safety/hazard-assessment' },
      // ----------------------------
      { id: 'training', label: 'Safety Quiz', icon: 'quiz', path: '/safety/quiz' }, 
      { id: 'committee', label: 'H&S Committee', icon: 'groups', path: '/safety/committee' },
      { id: 'safety-calendar', label: 'Safety Calendar', icon: 'calendar_month', path: '/safety/calendar' },
      { id: 'inspections', label: 'Inspections', icon: 'fact_check', path: '/safety/inspections' }, 
    ]
  },
  { id: 'news', label: 'News & Notices', icon: 'notifications', path: '/news' },
  { 
    id: 'budget', label: 'Budget Planning', icon: 'payments',
    sub: [
      { id: 'planning', label: 'Fiscal Planning', icon: 'account_balance', path: '/budget/planning' },
      { id: 'expenses', label: 'Expenses', icon: 'receipt_long', path: '/budget/expenses' },
      { id: 'reports', label: 'Financial Reports', icon: 'description', path: '/budget/reports' }
    ]
  },
  { id: 'calendar', label: 'Events Calendar', icon: 'calendar_month', path: '/calendar' },
  { id: 'certs', label: 'Certification & Licenses', icon: 'card_membership', path: '/certs' },
  { id: 'docs', label: 'Document Center', icon: 'folder', path: '/docs' },
  { id: 'benefits', label: 'My Benefits', icon: 'favorite', path: '/benefits' },
  { id: 'learning', label: 'My Learning', icon: 'school', path: '/learning' },
  { id: 'permits', label: 'PermitsPro', icon: 'description', path: '/permits' },
  { id: 'timesheet', label: 'Time Sheet', icon: 'schedule', path: '/timesheet' }
];

// 4. DASHBOARD TASKS
export const DASHBOARD_TASKS: Task[] = [
    { id: '1', title: 'Site Safety Audit', location: 'Western Facility', date: 'Oct 26', priority: 'HIGH' },
    { id: '2', title: 'Equipment Check', location: 'Central Warehouse', date: 'Oct 28', priority: 'MED' }
];

// 5. DASHBOARD NEWS
export const DASHBOARD_NEWS: NewsItem[] = [
    { id: '1', title: 'System Maintenance', desc: 'Scheduled for Oct 24, 02:00 UTC', priority: 'HIGH', date: 'Oct 20' },
    { id: '2', title: 'New Safety Protocol', desc: 'Required reading for field staff', priority: 'MED', date: 'Oct 22' }
];
// ... (all your other data) ...

// 6. SAFETY LEADERBOARD (Paste this at the bottom)
export const SAFETY_LEADERBOARD: SafetyChampion[] = [
    { id: '1', name: 'Sarah Jenkins', role: 'Logistics Lead', points: 1250, reports: 12, badges: ['verified'] },
    { id: '2', name: 'Mike Ross', role: 'Machine Operator', points: 980, reports: 8, badges: ['star'] },
    { id: '3', name: 'David Kim', role: 'Site Supervisor', points: 850, reports: 15, badges: [] },
    { id: '4', name: 'Priya Patel', role: 'Quality Control', points: 720, reports: 5, badges: ['bolt'] },
];