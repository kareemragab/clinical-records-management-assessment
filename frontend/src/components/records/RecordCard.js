import React from 'react';
import Badge from '../common/Badge';
import { formatDate } from '../../utils/formatters';

export default function RecordCard({ record, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{record.patientName}</p>
          <p className="text-xs text-indigo-600 font-medium">{record.patientId}</p>
        </div>
        <Badge status={record.status} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-xs text-gray-400">DOB</p>
          <p className="text-gray-700">{formatDate(record.dateOfBirth)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Department</p>
          <p className="text-gray-700">{record.department}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Diagnosis</p>
          <p className="text-gray-700">{record.diagnosis}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Admitted</p>
          <p className="text-gray-700">{formatDate(record.admissionDate)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-400">Discharged</p>
          <p className="text-gray-700">{formatDate(record.dischargeDate)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(record)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(record)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
