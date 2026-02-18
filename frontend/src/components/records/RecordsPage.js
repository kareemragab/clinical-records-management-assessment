import React, { useState, useMemo, useCallback } from 'react';
import { useRecords } from '../../hooks/useRecords';
import { useRecord } from '../../hooks/useRecord';
import { useDebounce } from '../../hooks/useDebounce';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RecordsTable from './RecordsTable';
import Pagination from './Pagination';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import EmptyState from '../common/EmptyState';
import RecordFormModal from '../forms/RecordFormModal';
import { DEFAULT_PAGE_SIZE } from '../../utils/constants';

export default function RecordsPage({ showToast, showCreateModal, onCloseCreateModal }) {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');
  const [department, setDepartment] = useState('');
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

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
  const { createRecord, loading: mutating } = useRecord();

  const handleSort = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setPage(1);
  }, []);

  // reset page when filters change
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

  return (
    <div className="space-y-4">
      {/* search + filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={searchText} onChange={handleFilterChange(setSearchText)} />
        <FilterBar
          status={status}
          department={department}
          onStatusChange={handleFilterChange(setStatus)}
          onDepartmentChange={handleFilterChange(setDepartment)}
        />
      </div>

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
          <RecordsTable
            records={records}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          />
        )}
      </div>

      {!loading && !error && records.length > 0 && (
        <Pagination pagination={pagination} onPageChange={setPage} />
      )}

      {/* create modal */}
      <RecordFormModal
        isOpen={showCreateModal}
        onClose={onCloseCreateModal}
        onSubmit={handleCreate}
        loading={mutating}
      />
    </div>
  );
}
