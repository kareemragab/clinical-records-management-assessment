import React, { useState, useCallback } from 'react';
import RecordsPage from './components/records/RecordsPage';
import Toast from './components/common/Toast';

// keeping it simple for now - just the records page
function App() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Clinical Records</h1>
        <RecordsPage showToast={showToast} />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
