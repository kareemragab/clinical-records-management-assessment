// client-side validation - backend also validates but this gives instant feedback
export function validateRecordForm(values, isEdit = false) {
  const errors = {};

  if (!isEdit) {
    if (!values.patientId) {
      errors.patientId = 'Patient ID is required';
    } else if (!/^P\d+$/.test(values.patientId)) {
      errors.patientId = 'Format: P followed by numbers (e.g., P001)';
    }
  }

  if (!values.patientName || values.patientName.trim().length < 2) {
    errors.patientName = 'Name must be at least 2 characters';
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (new Date(values.dateOfBirth) >= new Date()) {
    errors.dateOfBirth = 'Date of birth must be in the past';
  }

  if (!values.diagnosis || values.diagnosis.trim().length < 2) {
    errors.diagnosis = 'Diagnosis must be at least 2 characters';
  }

  if (!values.admissionDate) {
    errors.admissionDate = 'Admission date is required';
  }

  if (
    values.dischargeDate &&
    values.admissionDate &&
    new Date(values.dischargeDate) < new Date(values.admissionDate)
  ) {
    errors.dischargeDate = 'Must be on or after admission date';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  if (!values.department || values.department.trim().length < 1) {
    errors.department = 'Department is required';
  }

  return errors;
}
