import React from 'react';
import { STATUS_STYLES, STATUS_DOT_COLORS } from '../../utils/formatters';

export default function Badge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-800';
  const dot = STATUS_DOT_COLORS[status] || 'bg-gray-500';

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
