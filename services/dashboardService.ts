// services/dashboardService.ts
import { DASHBOARD_TASKS, DASHBOARD_NEWS } from '../lib/mockData';

export const getDashboardTasks = async () => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return DASHBOARD_TASKS;
};

// THIS FUNCTION MUST BE EXPORTED:
export const getDashboardNews = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return DASHBOARD_NEWS;
};