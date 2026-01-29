"use client";
import React from 'react';
import { DocumentCard, Icon } from '../../Shared';
import { COMMITTEE_DOCS } from '../../../lib/mockData';

export default function CommitteeView() {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                        <Icon name="groups" size={28} className="text-blue-600" />
                        <h2 className="text-2xl font-bold text-slate-900">H&S Committee</h2>
                </div>
                <p className="text-slate-500 text-sm">Access and manage Health & Safety Committee documents and reports.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DocumentCard 
                    title="Incident Reports" 
                    icon="warning" iconColor="text-orange-500" bgColor="bg-orange-50/50" 
                    reportBtnLabel="Incident Report" category="All Incidents" 
                    docs={COMMITTEE_DOCS.incidents} 
                />
                <DocumentCard 
                    title="Near Miss Reports" 
                    icon="error" iconColor="text-yellow-500" bgColor="bg-yellow-50/50" 
                    reportBtnLabel="Near Miss Report" category="All Near Misses" 
                    docs={COMMITTEE_DOCS.nearMisses} 
                />
            </div>
        </div>
    );
}