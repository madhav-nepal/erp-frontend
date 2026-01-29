"use client";
import React from 'react';
import Link from 'next/link';
import { THEME_COLOR, Icon } from '../components/Shared'; // Note the ../ path

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400">
      <div className="bg-slate-100 p-6 rounded-full mb-4">
        <Icon name="construction" size={64} className="opacity-50" />
      </div>
      <h2 className="text-xl font-bold text-slate-700 mb-2">Page Under Construction</h2>
      <p className="max-w-md text-center text-sm mb-6">
        The requested module is currently being developed. Please check back later or contact your administrator.
      </p>
      <Link 
        href="/"
        className="px-6 py-2 rounded-lg text-white font-bold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: THEME_COLOR }}
      >
        Return to Dashboard
      </Link>
    </div>
  );
}