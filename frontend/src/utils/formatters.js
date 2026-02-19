export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const STATUS_STYLES = {
  Active: 'bg-emerald-100 text-emerald-800',
  Discharged: 'bg-blue-100 text-blue-800',
  Pending: 'bg-amber-100 text-amber-800',
  Cancelled: 'bg-red-100 text-red-800',
};

export const STATUS_DOT_COLORS = {
  Active: 'bg-emerald-500',
  Discharged: 'bg-blue-500',
  Pending: 'bg-amber-500',
  Cancelled: 'bg-red-500',
};
