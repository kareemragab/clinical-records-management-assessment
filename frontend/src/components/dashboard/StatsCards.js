import React from 'react';
import { useStats } from '../../hooks/useStats';

const cards = [
  {
    key: 'total',
    label: 'Total Records',
    getValue: (s) => s.total,
    color: 'border-indigo-500',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    key: 'active',
    label: 'Active',
    getValue: (s) => s.byStatus?.active || 0,
    color: 'border-emerald-500',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    key: 'discharged',
    label: 'Discharged',
    getValue: (s) => s.byStatus?.discharged || 0,
    color: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    key: 'pending',
    label: 'Pending',
    getValue: (s) => s.byStatus?.pending || 0,
    color: 'border-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function StatsCards() {
  const { stats, loading } = useStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-20 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-12" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`bg-white rounded-lg border-l-4 ${card.color} border border-gray-200 p-5 hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.label}</p>
              <p className={`text-2xl font-bold mt-1 ${card.text}`}>
                {card.getValue(stats)}
              </p>
            </div>
            <div className={`${card.bg} ${card.text} p-2.5 rounded-lg`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
