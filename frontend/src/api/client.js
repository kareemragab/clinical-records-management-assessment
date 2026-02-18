import { API_BASE_URL } from '../utils/constants';

// generic fetch wrapper - handles errors and json parsing
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch {
    const err = new Error('Unable to connect to the server. Please check your connection.');
    err.status = 0;
    err.data = {};
    throw err;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const err = new Error(errorData.error || `Something went wrong (HTTP ${response.status})`);
    err.status = response.status;
    err.data = errorData;
    throw err;
  }

  if (response.status === 204) return null;
  return response.json();
}

export const apiClient = {
  getRecords: (params = {}) => {
    // strip empty params before building query string
    const filtered = Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    const qs = new URLSearchParams(filtered).toString();
    return request(`/records${qs ? `?${qs}` : ''}`);
  },
  getRecord: (id) => request(`/records/${id}`),
  createRecord: (data) =>
    request('/records', { method: 'POST', body: JSON.stringify(data) }),
  updateRecord: (id, data) =>
    request(`/records/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteRecord: (id) =>
    request(`/records/${id}`, { method: 'DELETE' }),
  getStats: () => request('/records/stats'),
  getDepartments: () => request('/departments'),
  getStatuses: () => request('/statuses'),
};
