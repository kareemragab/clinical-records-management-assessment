import React, { useState, useMemo, useCallback } from 'react';
import { useRecords } from '../../hooks/useRecords';
import { useRecord } from '../../hooks/useRecord';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RecordsTable from './RecordsTable';
import RecordCard from './RecordCard';
import Pagination from './Pagination';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';
import RecordFormModal from '../forms/RecordFormModal';
import ConfirmDialog from '../common/ConfirmDialog';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

export default function RecordsPage({ showToast, showCreateModal, onCloseCreateModal }) {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const [editRecord, setEditRecord] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const debouncedSearch = useDebounce(searchText);

  const params = useMemo(
    () => ({
      search: debouncedSearch,
      status,
      department,
      page,
      limit: DEFAULT_PAGE_SIZE,
      sortBy,
      sortOrder,
    }),
    [debouncedSearch, status, department, page, sortBy, sortOrder]
  );

  const { records, pagination, loading, error, refetch } = useRecords(params);
  const { createRecord, updateRecord, deleteRecord, loading: mutating } = useRecord();

  const handleSort = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((setter) => (val) => {
    setter(val);
    setPage(1);
  }, []);

  const handleCreate = async (data) => {
    await createRecord(data);
    showToast('Record created successfully!', 'success');
    onCloseCreateModal();
    refetch();
  };

  const handleEdit = (record) => {
    setEditRecord(record);
    setShowEditModal(true);
  };

  const handleUpdate = async (data) => {
    await updateRecord(editRecord.id, data);
    showToast('Record updated successfully!', 'success');
    setShowEditModal(false);
    setEditRecord(null);
    refetch();
  };

  const handleDelete = (record) => {
    setDeleteTarget(record);
  };

  const confirmDelete = async () => {
    await deleteRecord(deleteTarget.id);
    showToast('Record deleted successfully!', 'success');
    setDeleteTarget(null);
    refetch();
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={searchText} onChange={handleFilterChange(setSearchText)} />
        <FilterBar
          status={status}
          department={department}
          onStatusChange={handleFilterChange(setStatus)}
          onDepartmentChange={handleFilterChange(setDepartment)}
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner size="lg" className="text-indigo-600" />
          </div>
        ) : error ? (
          <div className="p-6">
            <ErrorMessage message={error} onRetry={refetch} />
          </div>
        ) : records.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <RecordsTable
              records={records}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {/* cards for mobile - table is hidden on small screens */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
              {records.map((record) => (
                <RecordCard
                  key={record.id}
                  record={record}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {!loading && !error && records.length > 0 && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}

      {/* Create Modal */}
      <RecordFormModal
        isOpen={showCreateModal}
        onClose={onCloseCreateModal}
        onSubmit={handleCreate}
        loading={mutating}
      />

      {/* Edit Modal */}
      <RecordFormModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditRecord(null);
        }}
        onSubmit={handleUpdate}
        loading={mutating}
        editRecord={editRecord}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Record"
        message={`Are you sure you want to delete the record for ${deleteTarget?.patientName}? This action cannot be undone.`}
        loading={mutating}
      />
    </div>
  );
}
