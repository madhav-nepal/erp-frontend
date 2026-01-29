"use client";
import React from 'react';
// FIX: Use ../ because components is outside 'app'
import DashboardView from '../components/views/DashboardView';

export default function Page() {
  return <DashboardView />;
}