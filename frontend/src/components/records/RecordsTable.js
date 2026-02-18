import React from 'react';
import SortableHeader from './SortableHeader';
import RecordRow from './RecordRow';

const columns = [
  { label: 'Patient ID', field: 'patientId' },
  { label: 'Name', field: 'patientName' },
  { label: 'DOB', field: 'dateOfBirth' },
  { label: 'Diagnosis', field: 'diagnosis' },
  { label: 'Admitted', field: 'admissionDate' },
  { label: 'Discharged', field: 'dischargeDate' },
  { label: 'Status', field: 'status' },
  { label: 'Department', field: 'department' },
];

export default function RecordsTable({ records, sortBy, sortOrder, onSort, onEdit, onDelete }) {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <SortableHeader
                key={col.field}
                label={col.label}
                field={col.field}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={onSort}
              />
            ))}
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {records.map((record) => (
            <RecordRow
              key={record.id}
              record={record}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
