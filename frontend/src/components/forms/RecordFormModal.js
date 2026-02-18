import React from 'react';
import Modal from '../common/Modal';
import RecordForm from './RecordForm';

export default function RecordFormModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  editRecord,
}) {
  const isEdit = !!editRecord;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Record' : 'Add New Record'}
    >
      <RecordForm
        initialValues={editRecord}
        isEdit={isEdit}
        onSubmit={onSubmit}
        loading={loading}
      />
    </Modal>
  );
}
