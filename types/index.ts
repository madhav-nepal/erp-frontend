// types/index.ts

// Navigation Types
export interface SubMenuItem {
    id: string;
    label: string;
    icon?: string;
    path: string; // <-- NEW FIELD
}

export interface MenuItem {
    id: string;
    label: string;
    icon: string;
    path?: string; // <-- NEW FIELD
    sub?: SubMenuItem[];
}

// Data Types
export interface CalendarEvent {
    id: number;
    title: string;
    time: string;
    type: 'maintenance' | 'audit' | 'meeting' | 'training';
}

export interface IncidentDoc {
    id: number;
    title: string;
    date: string;
    size: string;
    icon: string;
}

export interface CommitteeDocs {
    incidents: IncidentDoc[];
    nearMisses: IncidentDoc[];
}

export interface Task {
    id: string;
    title: string;
    location: string;
    date: string;
    priority: 'HIGH' | 'MED' | 'LOW';
}

export interface NewsItem {
    id: string;
    title: string;
    desc: string;
    priority: 'HIGH' | 'MED' | 'LOW';
    date: string;
}

// Component Prop Types
export interface ButtonProps {
    label: string;
    icon?: string;
    color?: 'red' | 'indigo' | 'theme';
    onClick?: () => void;
}

export interface StatCardProps {
    label: string;
    value: string | number;
    color: 'purple' | 'green' | 'blue' | 'red';
    icon: string;
}
// ... existing types

export interface SafetyChampion {
    id: string;
    name: string;
    role: string;
    points: number;
    badges: string[]; // e.g., 'Eagle Eye', 'First Responder'
    reports: number;
}