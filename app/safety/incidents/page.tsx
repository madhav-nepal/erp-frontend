import React from 'react';
import { Metadata } from 'next';
// Using your new alias to import the View
import IncidentsView from '@/components/views/safety/IncidentsView';

// 1. Define the Metadata (for the browser tab title)
export const metadata: Metadata = {
  title: 'Incidents',
};

// 2. Define the Default Export (Required for the page to render)
export default function Page() {
  return <IncidentsView />;
}