import { useState } from 'react';
import { apiClient } from '../api/client';

export function useRecord() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createRecord = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.createRecord(data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateRecord = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.updateRecord(id, data);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.deleteRecord(id);
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { createRecord, updateRecord, deleteRecord, loading, error, clearError };
}
