import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export function useStatuses() {
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    apiClient
      .getStatuses()
      .then(setStatuses)
      .catch(() => setStatuses(['Active', 'Discharged', 'Pending', 'Cancelled']));
  }, []);

  return { statuses };
}
