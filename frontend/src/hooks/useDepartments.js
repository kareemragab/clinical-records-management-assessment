import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .getDepartments()
      .then(setDepartments)
      .catch(() => setDepartments([]))
      .finally(() => setLoading(false));
  }, []);

  return { departments, loading };
}
