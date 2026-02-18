import React from 'react';

export default function SortableHeader({ label, field, sortBy, sortOrder, onSort }) {
  const isActive = sortBy === field;

  const handleClick = () => {
    if (isActive) {
      onSort(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSort(field, 'asc');
    }
  };

  return (
    <th
      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 transition-colors select-none"
      onClick={handleClick}
    >
      <div className="flex items-center gap-1">
        {label}
        <span className="inline-flex flex-col">
          <svg
            className={`w-3 h-3 -mb-1 ${isActive && sortOrder === 'asc' ? 'text-indigo-600' : 'text-gray-300'}`}
            viewBox="0 0 12 12"
          >
            <path d="M6 2l4 5H2z" fill="currentColor" />
          </svg>
          <svg
            className={`w-3 h-3 ${isActive && sortOrder === 'desc' ? 'text-indigo-600' : 'text-gray-300'}`}
            viewBox="0 0 12 12"
          >
            <path d="M6 10L2 5h8z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </th>
  );
}
