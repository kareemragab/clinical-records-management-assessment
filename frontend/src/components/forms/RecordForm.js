import React, { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { useStatuses } from '../../hooks/useStatuses';
import { useDepartments } from '../../hooks/useDepartments';
import { validateRecordForm } from '../../utils/validators';

const emptyForm = {
  patientId: '',
  patientName: '',
  dateOfBirth: '',
  diagnosis: '',
  admissionDate: '',
  dischargeDate: '',
  status: '',
  department: '',
};

export default function RecordForm({ initialValues, isEdit = false, onSubmit, loading }) {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const { statuses } = useStatuses();
  const { departments } = useDepartments();

  useEffect(() => {
    if (initialValues) {
      setValues({
        patientId: initialValues.patientId || '',
        patientName: initialValues.patientName || '',
        dateOfBirth: initialValues.dateOfBirth || '',
        diagnosis: initialValues.diagnosis || '',
        admissionDate: initialValues.admissionDate || '',
        dischargeDate: initialValues.dischargeDate || '',
        status: initialValues.status || '',
        department: initialValues.department || '',
      });
    }
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (serverError) setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validateRecordForm(values, isEdit);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    console.log('submitting record:', values);
    const payload = {
      ...values,
      dischargeDate: values.dischargeDate || null,
    };

    try {
      await onSubmit(payload);
    } catch (err) {
      if (err.status === 409) {
        setErrors((prev) => ({ ...prev, patientId: 'This Patient ID is already in use' }));
      } else if (err.data?.missing) {
        const fieldErrors = {};
        err.data.missing.forEach((f) => {
          fieldErrors[f] = `${f} is required`;
        });
        setErrors(fieldErrors);
      } else {
        setServerError(err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {serverError && (
        <div className="mb-4">
          <ErrorMessage message={serverError} onDismiss={() => setServerError('')} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Patient ID"
          id="patientId"
          required
          placeholder="P001"
          value={values.patientId}
          onChange={handleChange('patientId')}
          error={errors.patientId}
          disabled={isEdit}
        />
        <Input
          label="Patient Name"
          id="patientName"
          required
          placeholder="John Doe"
          value={values.patientName}
          onChange={handleChange('patientName')}
          error={errors.patientName}
        />
        <Input
          label="Date of Birth"
          id="dateOfBirth"
          type="date"
          required
          value={values.dateOfBirth}
          onChange={handleChange('dateOfBirth')}
          error={errors.dateOfBirth}
        />
        <Input
          label="Diagnosis"
          id="diagnosis"
          required
          placeholder="e.g., Hypertension"
          value={values.diagnosis}
          onChange={handleChange('diagnosis')}
          error={errors.diagnosis}
        />
        <Input
          label="Admission Date"
          id="admissionDate"
          type="date"
          required
          value={values.admissionDate}
          onChange={handleChange('admissionDate')}
          error={errors.admissionDate}
        />
        <Input
          label="Discharge Date"
          id="dischargeDate"
          type="date"
          value={values.dischargeDate}
          onChange={handleChange('dischargeDate')}
          error={errors.dischargeDate}
        />
        <Select
          label="Status"
          id="status"
          required
          value={values.status}
          onChange={handleChange('status')}
          error={errors.status}
        >
          <option value="">Select status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </Select>
        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            id="department"
            list="department-list"
            placeholder="e.g., Cardiology"
            value={values.department}
            onChange={handleChange('department')}
            className={`block w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              errors.department
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
          />
          <datalist id="department-list">
            {departments.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
          {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <Button type="submit" loading={loading}>
          {loading ? 'Saving...' : isEdit ? 'Update Record' : 'Create Record'}
        </Button>
      </div>
    </form>
  );
}
