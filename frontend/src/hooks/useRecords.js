import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/client';

export function useRecords(params) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.getRecords(params);
      setData(result.data || []);
      setPagination(result.pagination || null);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return { records: data, pagination, loading, error, refetch: fetchRecords };
}
