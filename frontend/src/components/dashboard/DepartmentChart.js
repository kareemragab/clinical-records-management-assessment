import React from 'react';
import { useStats } from '../../hooks/useStats';

export default function DepartmentChart() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-40 mb-6" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="mb-4">
            <div className="h-3 bg-gray-200 rounded w-24 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats?.byDepartment) return null;

  const entries = Object.entries(stats.byDepartment).sort((a, b) => b[1] - a[1]);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-5">Records by Department</h3>
      <div className="space-y-4">
        {entries.map(([dept, count]) => (
          <div key={dept}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-600">{dept}</span>
              <span className="text-sm font-semibold text-gray-900">{count}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
