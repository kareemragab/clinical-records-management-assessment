import React from 'react';
import StatsCards from './StatsCards';
import DepartmentChart from './DepartmentChart';

// TODO: maybe add date range filter for stats later
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentChart />
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Clinical Records System</p>
                <p className="text-xs text-gray-500">Manage patient records, track admissions and discharges</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Real-Time Data</p>
                <p className="text-xs text-gray-500">All data is fetched live from the backend API</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">In-Memory Storage</p>
                <p className="text-xs text-gray-500">Data resets when the backend server restarts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
