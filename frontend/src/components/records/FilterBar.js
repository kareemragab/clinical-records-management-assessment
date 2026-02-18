import React from 'react';
import { useDepartments } from '../../hooks/useDepartments';
import { useStatuses } from '../../hooks/useStatuses';

export default function FilterBar({ status, department, onStatusChange, onDepartmentChange }) {
  const { departments } = useDepartments();
  const { statuses } = useStatuses();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="block w-full sm:w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      >
        <option value="">All Statuses</option>
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="block w-full sm:w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      >
        <option value="">All Departments</option>
        {departments.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}
