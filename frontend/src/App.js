import React, { useState, useCallback } from 'react';
import AppShell from './components/layout/AppShell';
import RecordsPage from './components/records/RecordsPage';
import DashboardPage from './components/dashboard/DashboardPage';
import Toast from './components/common/Toast';

// page titles for the header
const PAGE_TITLES = {
  dashboard: 'Dashboard',
  records: 'Clinical Records',
};

function App() {
  const [activePage, setActivePage] = useState('records');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const handleNewRecord = () => {
    if (activePage !== 'records') setActivePage('records');
    setShowCreateModal(true);
  };

  return (
    <>
      <AppShell
        activePage={activePage}
        onNavigate={setActivePage}
        onNewRecord={handleNewRecord}
        pageTitle={PAGE_TITLES[activePage]}
      >
        {activePage === 'dashboard' && <DashboardPage />}
        {activePage === 'records' && (
          <RecordsPage
            showToast={showToast}
            showCreateModal={showCreateModal}
            onCloseCreateModal={() => setShowCreateModal(false)}
          />
        )}
      </AppShell>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}

export default App;
